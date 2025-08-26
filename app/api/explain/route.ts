// app/api/explain/route.ts
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    // Get Clerk user data
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized - User not authenticated" },
        { status: 401 }
      );
    }

    // Parse request body
    const { topic } = await request.json();

    if (!topic || typeof topic !== "string" || topic.trim().length === 0) {
      return NextResponse.json(
        { error: "Topic is required and must be a non-empty string" },
        { status: 400 }
      );
    }

    console.log(
      `🧠 Generating explanation for user: ${userId}, topic: ${topic.trim()}`
    );

    // Generate AI explanation
    const result = await generateExplanation(topic.trim());

    if (!result) {
      return NextResponse.json(
        { error: "Failed to generate explanation" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      explanations: result,
      topic: topic.trim(),
      timestamp: Date.now(),
      message: "Explanations generated successfully",
    });
  } catch (error: unknown) {
    console.error("Explanation generation error:", error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      {
        error: "Internal server error during explanation generation",
        details: errorMessage,
      },
      { status: 500 }
    );
  }
}

async function generateExplanation(topic: string): Promise<Record<string, string>> {
  try {
    const prompts = {
      simplified: `Explain "${topic}" in simple terms that a first-year medical student can easily understand. Use analogies and everyday language. Focus on the basic concept without overwhelming details.`,

      normal: `Provide a comprehensive medical explanation of "${topic}". Include definition, key mechanisms, clinical significance, and important facts. Structure it clearly with headings and bullet points.`,

      memoryAid: `Create memory aids, mnemonics, and memorable tricks for "${topic}". Include acronyms, visual associations, rhymes, or patterns that help remember key facts about this condition.`,

      clinical: `Describe the clinical presentation of "${topic}". Focus on signs, symptoms, diagnostic criteria, physical examination findings, and how patients typically present.`,

      pathophysiology: `Explain the underlying pathophysiology and mechanisms of "${topic}". Include cellular processes, biochemical pathways, and how the disease develops at a molecular level.`,
    };

    const results: Record<string, string> = {};

    // Generate all explanations in parallel for better performance
    const explanationPromises = Object.entries(prompts).map(
      async ([type, prompt]) => {
        const completion = await openai.chat.completions.create({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content:
                "You are an expert medical educator who creates world-class educational content.",
            },
            {
              role: "user",
              content: prompt,
            },
          ],
          max_tokens: 1000,
          temperature: 0.7,
        });

        return {
          type,
          content:
            completion.choices[0]?.message?.content ||
            `Failed to generate ${type} explanation`,
        };
      }
    );

    const explanationResults = await Promise.all(explanationPromises);

    explanationResults.forEach(({ type, content }) => {
      results[type] = content;
    });

    return results;
  } catch (error: unknown) {
    console.error("OpenAI API error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    throw new Error(`Failed to generate explanation: ${errorMessage}`);
  }
}

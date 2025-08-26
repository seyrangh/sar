// app/api/summarize/route.ts
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
    const { text } = await request.json();

    if (!text || typeof text !== "string" || text.trim().length === 0) {
      return NextResponse.json(
        { error: "Text is required and must be a non-empty string" },
        { status: 400 }
      );
    }

    // Check minimum word count
    const wordCount = text.trim().split(/\s+/).length;
    if (wordCount < 10) {
      return NextResponse.json(
        {
          error:
            "Text must contain at least 10 words for meaningful summarization",
        },
        { status: 400 }
      );
    }

    console.log(
      `📝 Generating summary for user: ${userId}, text length: ${text.length} chars, words: ${wordCount}`
    );

    // Generate AI summary
    const summary = await generateSummary(text.trim());

    if (!summary) {
      return NextResponse.json(
        { error: "Failed to generate summary" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      summary,
      originalLength: text.length,
      originalWordCount: wordCount,
      summaryWordCount: summary.split(/\s+/).length,
      timestamp: Date.now(),
      message: "Summary generated successfully",
    });
  } catch (error: any) {
    console.error("Summary generation error:", error);
    return NextResponse.json(
      {
        error: "Internal server error during summary generation",
        details: error.message,
      },
      { status: 500 }
    );
  }
}

async function generateSummary(text: string): Promise<string> {
  try {
    const prompt = `You are an expert medical summarization AI. Your task is to create concise, accurate summaries of medical content while preserving all critical information.

Guidelines for summarization:
1. **Preserve Key Medical Information**: Never omit crucial medical facts, dosages, contraindications, or safety information
2. **Maintain Clinical Accuracy**: Ensure all medical terminology and concepts are accurately represented
3. **Structure Clearly**: Use clear, logical organization with proper headings when appropriate
4. **Highlight Important Points**: Emphasize critical diagnoses, treatments, and patient care considerations
5. **Keep Context**: Maintain the original context and medical significance
6. **Concise but Complete**: Reduce length while ensuring comprehensive coverage of essential points

Please summarize the following medical text:

"${text}"

Provide a well-structured, comprehensive summary that medical students and professionals can rely on for study and reference.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are an expert medical summarization specialist who creates accurate, concise summaries while preserving all critical medical information.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      max_tokens: 1500,
      temperature: 0.3, // Lower temperature for more consistent, factual summaries
    });

    return (
      completion.choices[0]?.message?.content || "Failed to generate summary"
    );
  } catch (error: any) {
    console.error("OpenAI API error:", error);
    throw new Error(`Failed to generate summary: ${error.message}`);
  }
}

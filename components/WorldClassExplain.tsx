// components/WorldClassExplain.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Custom CSS for world-class medical content formatting
const medicalContentStyles = `
  .world-class-medical-content {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
    line-height: 1.7;
    color: #111827;
  }
  
  .world-class-medical-content h1,
  .world-class-medical-content h2,
  .world-class-medical-content h3,
  .world-class-medical-content h4 {
    font-weight: 700;
    letter-spacing: -0.025em;
  }
  
  .world-class-medical-content p {
    margin-bottom: 1rem;
    text-align: justify;
    hyphens: auto;
  }
  
  .world-class-medical-content strong {
    font-weight: 600;
  }
  
  .world-class-medical-content ul,
  .world-class-medical-content ol {
    margin: 1.5rem 0;
  }
  
  .world-class-medical-content li {
    margin-bottom: 0.5rem;
  }
  
  /* Hover effects for interactive elements */
  .world-class-medical-content span[class*="bg-indigo-50"]:hover {
    background-color: #e0e7ff;
    transform: scale(1.02);
    transition: all 0.2s ease;
  }
  
  .world-class-medical-content span[class*="bg-purple-50"]:hover {
    background-color: #f3e8ff;
    transform: scale(1.02);
    transition: all 0.2s ease;
  }
`;

interface Explanation {
  id: string;
  topic: string;
  simplified: string;
  normal: string;
  memoryAid: string;
  clinical: string;
  pathophysiology: string;
  timestamp: number;
}

interface ExplanationCard {
  type: "simplified" | "normal" | "memoryAid" | "clinical" | "pathophysiology";
  title: string;
  icon: string;
  gradient: string;
  description: string;
}

const predefinedTopics = [
  "Myocardial Infarction",
  "Diabetes Mellitus",
  "Hypertension",
  "Pneumonia",
  "Asthma",
  "Stroke",
  "Kidney Disease",
  "Heart Failure",
];

const explanationCards: ExplanationCard[] = [
  {
    type: "simplified",
    title: "Simplified",
    icon: "🔍",
    gradient: "from-blue-500 to-blue-600",
    description: "Easy-to-understand explanation",
  },
  {
    type: "normal",
    title: "Comprehensive",
    icon: "📚",
    gradient: "from-emerald-500 to-emerald-600",
    description: "Detailed medical explanation",
  },
  {
    type: "memoryAid",
    title: "Memory Aid",
    icon: "🧠",
    gradient: "from-purple-500 to-purple-600",
    description: "Mnemonics and memory tricks",
  },
  {
    type: "clinical",
    title: "Clinical Presentation",
    icon: "🏥",
    gradient: "from-red-500 to-red-600",
    description: "Signs, symptoms & diagnosis",
  },
  {
    type: "pathophysiology",
    title: "Pathophysiology",
    icon: "⚗️",
    gradient: "from-orange-500 to-orange-600",
    description: "Underlying mechanisms",
  },
];

// Helper function to format medical content beautifully with world-class typography
const formatMedicalContent = (content: string): string => {
  return (
    content
      // Convert main headers with gradient backgrounds
      .replace(
        /^# (.*$)/gim,
        '<div class="bg-gradient-to-r from-indigo-50 to-purple-50 border-l-4 border-indigo-500 p-4 rounded-r-lg mb-6 mt-8 first:mt-0"><h1 class="text-2xl font-bold text-gray-900 m-0">$1</h1></div>'
      )

      // Convert section headers with subtle backgrounds
      .replace(
        /^## (.*$)/gim,
        '<div class="bg-gray-50 border-l-3 border-emerald-500 p-3 rounded-r-lg mb-4 mt-6"><h2 class="text-xl font-semibold text-gray-900 m-0">$1</h2></div>'
      )

      // Convert subsection headers
      .replace(
        /^### (.*$)/gim,
        '<h3 class="text-lg font-semibold text-gray-900 mb-3 mt-5 pb-2 border-b border-gray-200">$1</h3>'
      )

      // Convert bold text
      .replace(
        /\*\*(.*?)\*\*/g,
        '<strong class="font-semibold text-gray-900 bg-yellow-50 px-1 rounded">$1</strong>'
      )

      // Convert numbered lists with beautiful styling
      .replace(
        /^(\d+)\.\s+(.*$)/gim,
        '<li class="flex items-start space-x-3 mb-3 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400"><span class="flex-shrink-0 w-6 h-6 bg-blue-500 text-white text-sm font-bold rounded-full flex items-center justify-center">$1</span><span class="text-gray-900 leading-relaxed">$2</span></li>'
      )

      // Convert bullet lists with icons
      .replace(
        /^[-*]\s+(.*$)/gim,
        '<li class="flex items-start space-x-3 mb-2 p-2 hover:bg-gray-50 rounded-lg transition-colors"><span class="flex-shrink-0 w-2 h-2 bg-emerald-500 rounded-full mt-2"></span><span class="text-gray-900 leading-relaxed">$1</span></li>'
      )

      // Wrap consecutive list items
      .replace(
        /(<li[^>]*class="flex items-start space-x-3 mb-3[^"]*"[^>]*>.*?<\/li>\s*)+/g,
        '<ol class="space-y-0 mb-6">$&</ol>'
      )
      .replace(
        /(<li[^>]*class="flex items-start space-x-3 mb-2[^"]*"[^>]*>.*?<\/li>\s*)+/g,
        '<ul class="space-y-0 mb-4 border border-gray-100 rounded-lg p-2">$&</ul>'
      )

      // Convert paragraphs with perfect spacing
      .replace(
        /\n\n/g,
        '</p><p class="mb-4 text-gray-900 leading-relaxed text-base">'
      )
      .replace(/^/, '<p class="mb-4 text-gray-900 leading-relaxed text-base">')
      .replace(/$/, "</p>")

      // Clean up empty paragraphs
      .replace(/<p[^>]*><\/p>/g, "")

      // Style definitions and key terms
      .replace(
        /^([A-Z][^:]*):(.*)$/gm,
        '<div class="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-lg p-4 mb-4"><h4 class="font-bold text-gray-900 text-lg mb-2">$1</h4><p class="text-gray-900 leading-relaxed m-0">$2</p></div>'
      )

      // Style medical acronyms with tooltips
      .replace(
        /\b([A-Z]{2,})\b/g,
        '<span class="font-semibold text-indigo-700 bg-indigo-50 px-2 py-1 rounded-md border border-indigo-200">$1</span>'
      )

      // Style important medical terms
      .replace(
        /\b(ischemia|necrosis|infarction|thrombosis|atherosclerosis|myocardium|pathophysiology|diagnosis|treatment|symptoms|etiology)\b/gi,
        '<span class="font-medium text-purple-800 bg-purple-50 px-1 rounded underline decoration-purple-300">$&</span>'
      )

      // Add visual breaks for better readability
      .replace(
        /([.!?])\s+([A-Z])/g,
        '$1</p><p class="mb-4 text-gray-900 leading-relaxed text-base">$2'
      )
  );
};

export default function WorldClassExplain() {
  const [topic, setTopic] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [explanations, setExplanations] = useState<Explanation[]>([]);
  const [currentExplanation, setCurrentExplanation] =
    useState<Explanation | null>(null);
  const [selectedCard, setSelectedCard] =
    useState<ExplanationCard["type"]>("normal");
  const [loadingProgress, setLoadingProgress] = useState(0);

  const handleSubmit = async (submittedTopic: string) => {
    if (!submittedTopic.trim()) return;

    setIsLoading(true);
    setLoadingProgress(0);
    setTopic("");

    // Simulate progress while loading
    const progressInterval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 90) return prev;
        return prev + Math.random() * 15;
      });
    }, 200);

    try {
      const response = await fetch("/api/explain", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ topic: submittedTopic.trim() }),
      });

      const data = await response.json();

      if (response.ok && data.explanations) {
        setLoadingProgress(100);

        const newExplanation: Explanation = {
          id: Date.now().toString(),
          topic: submittedTopic.trim(),
          simplified: data.explanations.simplified,
          normal: data.explanations.normal,
          memoryAid: data.explanations.memoryAid,
          clinical: data.explanations.clinical,
          pathophysiology: data.explanations.pathophysiology,
          timestamp: Date.now(),
        };

        // Small delay to show 100% completion
        setTimeout(() => {
          setExplanations((prev) => [newExplanation, ...prev]);
          setCurrentExplanation(newExplanation);
          setIsLoading(false);
          setLoadingProgress(0);
        }, 500);
      }
    } catch (error) {
      console.error("Failed to generate explanation:", error);
      setIsLoading(false);
      setLoadingProgress(0);
    } finally {
      clearInterval(progressInterval);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit(topic);
  };

  const handlePredefinedTopic = (predefinedTopic: string) => {
    setTopic(predefinedTopic);
    // Auto-submit after a short delay to show the topic in input
    setTimeout(() => {
      handleSubmit(predefinedTopic);
    }, 300);
  };

  const removeExplanation = (id: string) => {
    setExplanations((prev) => prev.filter((exp) => exp.id !== id));
    if (currentExplanation?.id === id) {
      setCurrentExplanation(null);
    }
  };

  return (
    <div className="h-full overflow-y-auto bg-gray-50">
      {/* Inject custom styles */}
      <style dangerouslySetInnerHTML={{ __html: medicalContentStyles }} />

      <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 px-4">
            AI-Powered{" "}
            <span className="bg-gradient-to-r from-emerald-600 to-emerald-500 bg-clip-text text-transparent">
              Explanations
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            Get comprehensive, world-class explanations of any medical concept.
            From basic fundamentals to advanced pathophysiology.
          </p>
        </motion.div>

        {/* Input Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8 sm:mb-12"
        >
          <form
            onSubmit={handleFormSubmit}
            className="max-w-3xl mx-auto mb-6 sm:mb-8 px-4"
          >
            <div className="relative">
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Enter any medical topic"
                className="w-full px-6 py-5 text-lg text-gray-900 bg-white border-2 border-gray-200 rounded-2xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all duration-200 placeholder-gray-400 shadow-lg"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !topic.trim()}
                className={`absolute right-3 top-3 px-8 py-2 rounded-xl font-semibold transition-all duration-200 ${
                  isLoading || !topic.trim()
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white hover:from-emerald-600 hover:to-emerald-700 transform hover:scale-105 shadow-lg"
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Thinking...</span>
                  </div>
                ) : (
                  "Explain"
                )}
              </button>
            </div>
          </form>

          {/* Predefined Topics */}
          <div className="max-w-3xl mx-auto">
            <p className="text-sm text-gray-500 mb-4 text-center">
              Or explore these common topics:
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              {predefinedTopics.map((predefinedTopic) => (
                <motion.button
                  key={predefinedTopic}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handlePredefinedTopic(predefinedTopic)}
                  disabled={isLoading}
                  className="px-4 py-2 bg-white border-2 border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:border-emerald-300 hover:bg-emerald-50 transition-all duration-200 shadow-sm disabled:opacity-50"
                >
                  {predefinedTopic}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Loading State */}
        <AnimatePresence>
          {isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-12"
            >
              <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 max-w-4xl mx-auto">
                <div className="flex items-center justify-center space-x-4 mb-6">
                  <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-lg font-semibold text-gray-700">
                    SeyranAI is crafting your explanation...
                  </span>
                </div>

                {/* Beautiful Progress Bar */}
                <div className="space-y-3">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Progress</span>
                    <span>{Math.round(loadingProgress)}%</span>
                  </div>
                  <div className="h-3 bg-gray-200 rounded-full overflow-hidden shadow-inner">
                    <motion.div
                      className="h-full bg-gradient-to-r from-emerald-500 via-emerald-600 to-emerald-500 rounded-full shadow-sm"
                      initial={{ width: "0%" }}
                      animate={{ width: `${loadingProgress}%` }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    />
                  </div>

                  {/* Loading Steps */}
                  <div className="flex justify-between text-xs text-gray-500 mt-4">
                    <span
                      className={
                        loadingProgress > 20
                          ? "text-emerald-600 font-medium"
                          : ""
                      }
                    >
                      {loadingProgress > 20 ? "✓" : "○"} Analyzing topic
                    </span>
                    <span
                      className={
                        loadingProgress > 50
                          ? "text-emerald-600 font-medium"
                          : ""
                      }
                    >
                      {loadingProgress > 50 ? "✓" : "○"} Generating content
                    </span>
                    <span
                      className={
                        loadingProgress > 80
                          ? "text-emerald-600 font-medium"
                          : ""
                      }
                    >
                      {loadingProgress > 80 ? "✓" : "○"} Formatting response
                    </span>
                    <span
                      className={
                        loadingProgress >= 100
                          ? "text-emerald-600 font-medium"
                          : ""
                      }
                    >
                      {loadingProgress >= 100 ? "✓" : "○"} Complete
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Current Explanation */}
        <AnimatePresence mode="wait">
          {currentExplanation && !isLoading && (
            <motion.div
              key={currentExplanation.id}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -30, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="mb-12"
            >
              {/* Topic Header */}
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  {currentExplanation.topic}
                </h2>
                <p className="text-gray-600">
                  Choose an explanation style that works best for you
                </p>
              </div>

              {/* Card Selection */}
              <div className="flex flex-wrap gap-3 sm:gap-4 justify-center mb-6 sm:mb-8 px-4">
                {explanationCards.map((card) => (
                  <motion.button
                    key={card.type}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedCard(card.type)}
                    className={`relative p-3 sm:p-4 rounded-2xl border-2 transition-all duration-200 min-w-[140px] sm:min-w-[160px] ${
                      selectedCard === card.type
                        ? `bg-gradient-to-r ${card.gradient} text-white border-transparent shadow-lg`
                        : "bg-white text-gray-700 border-gray-200 hover:border-gray-300 shadow-sm"
                    }`}
                  >
                    <div className="text-center">
                      <div className="text-2xl mb-2">{card.icon}</div>
                      <div className="font-semibold text-sm mb-1">
                        {card.title}
                      </div>
                      <div
                        className={`text-xs ${
                          selectedCard === card.type
                            ? "text-white/80"
                            : "text-gray-500"
                        }`}
                      >
                        {card.description}
                      </div>
                    </div>
                    {selectedCard === card.type && (
                      <motion.div
                        layoutId="selectedCard"
                        className="absolute inset-0 rounded-2xl border-2 border-white/30"
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </motion.button>
                ))}
              </div>

              {/* Selected Explanation Card */}
              <motion.div
                key={selectedCard}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="max-w-4xl mx-auto"
              >
                <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
                  <div
                    className={`bg-gradient-to-r ${
                      explanationCards.find((c) => c.type === selectedCard)
                        ?.gradient
                    } px-8 py-6`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="text-3xl">
                          {
                            explanationCards.find(
                              (c) => c.type === selectedCard
                            )?.icon
                          }
                        </span>
                        <div>
                          <h3 className="text-2xl font-bold text-white">
                            {
                              explanationCards.find(
                                (c) => c.type === selectedCard
                              )?.title
                            }
                          </h3>
                          <p className="text-white/80">
                            {
                              explanationCards.find(
                                (c) => c.type === selectedCard
                              )?.description
                            }
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => removeExplanation(currentExplanation.id)}
                        className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                      >
                        <svg
                          className="w-5 h-5 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="p-8">
                    <div className="max-w-none">
                      <div
                        className="world-class-medical-content"
                        dangerouslySetInnerHTML={{
                          __html: formatMedicalContent(
                            currentExplanation[selectedCard]
                          ),
                        }}
                      />
                    </div>
                    <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between">
                      <p className="text-sm text-gray-500">
                        Generated on{" "}
                        {new Date(
                          currentExplanation.timestamp
                        ).toLocaleString()}
                      </p>
                      <div className="flex items-center space-x-2 text-gray-600">
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                        <span className="text-sm font-medium">
                          Powered by SeyranAI
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Previous Explanations */}
        {explanations.length > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Your Recent Explorations
            </h3>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
              {explanations.slice(1).map((explanation, index) => (
                <motion.div
                  key={explanation.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.03 }}
                  className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300"
                  onClick={() => setCurrentExplanation(explanation)}
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <h4 className="text-lg font-semibold text-gray-900 line-clamp-2 flex-1">
                        {explanation.topic}
                      </h4>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeExplanation(explanation.id);
                        }}
                        className="w-8 h-8 text-gray-400 hover:text-red-500 transition-colors ml-2 flex-shrink-0"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {explanation.normal
                        .replace(/<[^>]*>/g, "")
                        .substring(0, 150)}
                      ...
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">
                        {new Date(explanation.timestamp).toLocaleDateString()}
                      </span>
                      <span className="text-xs text-emerald-600 font-medium">
                        Click to view
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Empty State */}
        {explanations.length === 0 && !isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-center py-20"
          >
            <div className="w-32 h-32 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-full flex items-center justify-center mx-auto mb-8">
              <svg
                className="w-16 h-16 text-emerald-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
            </div>
            <h3 className="text-3xl font-semibold text-gray-900 mb-4">
              Ready to Explore Medical Knowledge?
            </h3>
            <p className="text-gray-600 max-w-lg mx-auto text-lg">
              Enter any medical topic above to get comprehensive, AI-powered
              explanations that will enhance your understanding and boost your
              learning.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}

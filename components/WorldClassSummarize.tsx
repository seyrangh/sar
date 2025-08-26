// components/WorldClassSummarize.tsx
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

// Helper function to format medical content beautifully with world-class typography
const formatMedicalContent = (content: string): string => {
  return (
    content
      // Convert main headers with gradient backgrounds
      .replace(
        /^# (.*$)/gim,
        '<div class="bg-gradient-to-r from-purple-50 to-indigo-50 border-l-4 border-purple-500 p-4 rounded-r-lg mb-6 mt-8 first:mt-0"><h1 class="text-2xl font-bold text-gray-900 m-0">$1</h1></div>'
      )

      // Convert section headers with subtle backgrounds
      .replace(
        /^## (.*$)/gim,
        '<div class="bg-gray-50 border-l-3 border-purple-500 p-3 rounded-r-lg mb-4 mt-6"><h2 class="text-xl font-semibold text-gray-900 m-0">$1</h2></div>'
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
        '<li class="flex items-start space-x-3 mb-3 p-3 bg-purple-50 rounded-lg border-l-4 border-purple-400"><span class="flex-shrink-0 w-6 h-6 bg-purple-500 text-white text-sm font-bold rounded-full flex items-center justify-center">$1</span><span class="text-gray-900 leading-relaxed">$2</span></li>'
      )

      // Convert bullet lists with icons
      .replace(
        /^[-*]\s+(.*$)/gim,
        '<li class="flex items-start space-x-3 mb-2 p-2 hover:bg-gray-50 rounded-lg transition-colors"><span class="flex-shrink-0 w-2 h-2 bg-purple-500 rounded-full mt-2"></span><span class="text-gray-900 leading-relaxed">$1</span></li>'
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
        '<span class="font-semibold text-purple-700 bg-purple-50 px-2 py-1 rounded-md border border-purple-200">$1</span>'
      )

      // Style important medical terms
      .replace(
        /\b(ischemia|necrosis|infarction|thrombosis|atherosclerosis|myocardium|pathophysiology|diagnosis|treatment|symptoms|etiology|summary|conclusion|findings|results|analysis)\b/gi,
        '<span class="font-medium text-purple-800 bg-purple-50 px-1 rounded underline decoration-purple-300">$&</span>'
      )

      // Add visual breaks for better readability
      .replace(
        /([.!?])\s+([A-Z])/g,
        '$1</p><p class="mb-4 text-gray-900 leading-relaxed text-base">$2'
      )
  );
};

interface Summary {
  id: string;
  originalText: string;
  summary: string;
  timestamp: number;
  wordCount: number;
  reductionPercentage: number;
}

export default function WorldClassSummarize() {
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [summaries, setSummaries] = useState<Summary[]>([]);
  const [currentSummary, setCurrentSummary] = useState<Summary | null>(null);
  const [loadingProgress, setLoadingProgress] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!inputText.trim()) return;

    setIsLoading(true);
    setLoadingProgress(0);

    // Simulate progress while loading
    const progressInterval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 90) return prev;
        return prev + Math.random() * 15;
      });
    }, 300);

    try {
      const response = await fetch("/api/summarize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: inputText.trim() }),
      });

      const data = await response.json();

      if (response.ok && data.summary) {
        // Complete the progress
        setLoadingProgress(100);
        clearInterval(progressInterval);

        const originalWordCount = inputText.trim().split(/\s+/).length;
        const summaryWordCount = data.summary.split(/\s+/).length;
        const reductionPercentage = Math.round(
          ((originalWordCount - summaryWordCount) / originalWordCount) * 100
        );

        const newSummary: Summary = {
          id: Date.now().toString(),
          originalText: inputText.trim(),
          summary: data.summary,
          timestamp: Date.now(),
          wordCount: originalWordCount,
          reductionPercentage,
        };

        // Wait a moment to show 100% completion
        setTimeout(() => {
          setSummaries((prev) => [newSummary, ...prev]);
          setCurrentSummary(newSummary);
          setInputText("");
          setIsLoading(false);
          setLoadingProgress(0);
        }, 500);
      } else {
        clearInterval(progressInterval);
        setIsLoading(false);
        setLoadingProgress(0);
      }
    } catch (error) {
      console.error("Failed to generate summary:", error);
      clearInterval(progressInterval);
      setIsLoading(false);
      setLoadingProgress(0);
    }
  };

  const removeSummary = (id: string) => {
    setSummaries((prev) => prev.filter((summary) => summary.id !== id));
    if (currentSummary?.id === id) {
      setCurrentSummary(null);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const wordCount = inputText
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0).length;

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
            Smart{" "}
            <span className="bg-gradient-to-r from-purple-600 to-purple-500 bg-clip-text text-transparent">
              Summarization
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            Transform lengthy medical texts, research papers, and study
            materials into concise, digestible summaries. Save time and focus on
            what matters most.
          </p>
        </motion.div>

        {/* Input Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8 sm:mb-12"
        >
          <form onSubmit={handleSubmit} className="max-w-4xl mx-auto px-4">
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="p-4 sm:p-6 border-b border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Paste your text here
                  </h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>
                      {wordCount} {wordCount === 1 ? "word" : "words"}
                    </span>
                    {wordCount > 0 && (
                      <span className="text-purple-600 font-medium">
                        ~{Math.ceil(wordCount / 200)} min read
                      </span>
                    )}
                  </div>
                </div>
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Paste medical texts, research abstracts, lecture notes, or any content you want summarized. The more detailed the text, the better the summary will be..."
                  className="w-full h-48 p-4 text-gray-900 border-2 border-gray-200 rounded-2xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-200 placeholder-gray-400 resize-none"
                  disabled={isLoading}
                />
              </div>

              <div className="p-6 bg-gray-50">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span>Optimized for medical content</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span>Key points preserved</span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading || !inputText.trim() || wordCount < 10}
                    className={`px-8 py-3 rounded-2xl font-semibold transition-all duration-200 ${
                      isLoading || !inputText.trim() || wordCount < 10
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-gradient-to-r from-purple-500 to-purple-600 text-white hover:from-purple-600 hover:to-purple-700 transform hover:scale-105 shadow-lg"
                    }`}
                  >
                    {isLoading ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Summarizing...</span>
                      </div>
                    ) : (
                      "Generate Summary"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </motion.div>

        {/* Loading State with Beautiful Progress Bar */}
        <AnimatePresence>
          {isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-12"
            >
              <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 max-w-4xl mx-auto">
                <div className="text-center mb-8">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4"
                  >
                    <svg
                      className="w-8 h-8 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </motion.div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    SeyranAI is analyzing your text
                  </h3>
                  <p className="text-gray-600">
                    Creating an intelligent summary that preserves all key
                    information
                  </p>
                </div>

                {/* Beautiful Progress Bar */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>Processing...</span>
                    <span className="font-semibold">
                      {Math.round(loadingProgress)}%
                    </span>
                  </div>

                  <div className="relative h-3 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-500 via-indigo-500 to-purple-600 rounded-full"
                      initial={{ width: "0%" }}
                      animate={{ width: `${loadingProgress}%` }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                    />
                    <motion.div
                      className="absolute top-0 left-0 h-full w-20 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
                      animate={{ x: [-80, 320] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  </div>

                  {/* Progress Steps */}
                  <div className="flex justify-between text-xs text-gray-500 mt-2">
                    <span
                      className={
                        loadingProgress > 20
                          ? "text-purple-600 font-medium"
                          : ""
                      }
                    >
                      Analyzing Structure
                    </span>
                    <span
                      className={
                        loadingProgress > 50
                          ? "text-purple-600 font-medium"
                          : ""
                      }
                    >
                      Extracting Key Points
                    </span>
                    <span
                      className={
                        loadingProgress > 80
                          ? "text-purple-600 font-medium"
                          : ""
                      }
                    >
                      Generating Summary
                    </span>
                    <span
                      className={
                        loadingProgress === 100
                          ? "text-purple-600 font-medium"
                          : ""
                      }
                    >
                      Complete
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Current Summary */}
        <AnimatePresence mode="wait">
          {currentSummary && !isLoading && (
            <motion.div
              key={currentSummary.id}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -30, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="mb-12"
            >
              <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden max-w-4xl mx-auto">
                <div className="bg-gradient-to-r from-purple-500 to-purple-600 px-8 py-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-2">
                        Summary Generated
                      </h2>
                      <div className="flex items-center space-x-4 text-purple-100">
                        <span className="text-sm">
                          {currentSummary.wordCount} →{" "}
                          {currentSummary.summary.split(/\s+/).length} words
                        </span>
                        <span className="text-sm font-semibold">
                          {currentSummary.reductionPercentage}% reduction
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => removeSummary(currentSummary.id)}
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
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">
                        Summary
                      </h3>
                      <button
                        onClick={() => copyToClipboard(currentSummary.summary)}
                        className="flex items-center space-x-2 px-4 py-2 bg-purple-50 text-purple-600 rounded-xl hover:bg-purple-100 transition-colors"
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
                            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                          />
                        </svg>
                        <span className="text-sm font-medium">Copy</span>
                      </button>
                    </div>
                    <div className="max-w-none">
                      <div
                        className="world-class-medical-content bg-gradient-to-br from-white to-gray-50 p-6 rounded-2xl border border-gray-100"
                        dangerouslySetInnerHTML={{
                          __html: formatMedicalContent(currentSummary.summary),
                        }}
                      />
                    </div>
                  </div>

                  <details className="group">
                    <summary className="flex items-center justify-between cursor-pointer p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors">
                      <span className="font-semibold text-gray-900">
                        View Original Text
                      </span>
                      <svg
                        className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </summary>
                    <div className="mt-4 p-6 bg-gray-50 rounded-2xl">
                      <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-wrap">
                        {currentSummary.originalText}
                      </p>
                    </div>
                  </details>

                  <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between">
                    <p className="text-sm text-gray-500">
                      Generated on{" "}
                      {new Date(currentSummary.timestamp).toLocaleString()}
                    </p>
                    <div className="flex items-center space-x-2 text-purple-600">
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                      <span className="text-sm font-medium">AI-Powered</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Previous Summaries */}
        {summaries.length > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Your Recent Summaries
            </h3>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
              {summaries.slice(1).map((summary, index) => (
                <motion.div
                  key={summary.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.03 }}
                  className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300"
                  onClick={() => setCurrentSummary(summary)}
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                        <span className="text-sm font-semibold text-purple-600">
                          {summary.reductionPercentage}% reduced
                        </span>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeSummary(summary.id);
                        }}
                        className="w-8 h-8 text-gray-400 hover:text-red-500 transition-colors"
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

                    <p className="text-gray-700 text-sm mb-4 line-clamp-4">
                      {summary.summary.substring(0, 200)}...
                    </p>

                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>
                        {summary.wordCount} words →{" "}
                        {summary.summary.split(/\s+/).length} words
                      </span>
                      <span>
                        {new Date(summary.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Empty State */}
        {summaries.length === 0 && !isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-center py-20"
          >
            <div className="w-32 h-32 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full flex items-center justify-center mx-auto mb-8">
              <svg
                className="w-16 h-16 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h3 className="text-3xl font-semibold text-gray-900 mb-4">
              Ready to Summarize Your Content?
            </h3>
            <p className="text-gray-600 max-w-lg mx-auto text-lg">
              Paste any lengthy medical text, research paper, or study material
              above to get an intelligent, concise summary that captures all the
              key points.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}

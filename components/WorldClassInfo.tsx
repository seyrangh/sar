// components/WorldClassInfo.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface WellnessTip {
  id: string;
  tip: string;
  icon: string;
  color: string;
}

interface ObservershipRequirement {
  id: string;
  title: string;
  description: string;
  icon: string;
  urgent?: boolean;
}

const wellnessTips: WellnessTip[] = [
  {
    id: "adaptable",
    tip: "Be adaptable and forgiving with yourself",
    icon: "🌱",
    color: "from-green-500 to-emerald-600",
  },
  {
    id: "burnout",
    tip: "Burnout is a real thing in med school. Understand where it comes from fix it quick",
    icon: "⚡",
    color: "from-yellow-500 to-orange-600",
  },
  {
    id: "breaks",
    tip: "It feels impossible to take breaks but always take time for yourself",
    icon: "☀️",
    color: "from-blue-500 to-cyan-600",
  },
  {
    id: "self-care",
    tip: "It's easy to compromise sleep physical activity or just overall self. Take care of self if unwell u wont perform at best",
    icon: "💪",
    color: "from-purple-500 to-pink-600",
  },
  {
    id: "opportunities",
    tip: "Med school opens lots of new doors. Be curious chase new things push past ur comfort zone but you also dont have to do it all",
    icon: "🚪",
    color: "from-indigo-500 to-purple-600",
  },
];

const observershipRequirements: ObservershipRequirement[] = [
  {
    id: "cv",
    title: "Up-to-date Curriculum Vitae",
    description:
      "Must include educational/employment status, citizenship status and e-mail address",
    icon: "📄",
  },
  {
    id: "registration",
    title: "Letter of Registration",
    description:
      "Undergraduate medical, nursing, healthcare professions, and non-clinical professional students must provide from their academic institution",
    icon: "🏫",
  },
  {
    id: "interview",
    title: "Skype Interview",
    description:
      "To assess English language proficiency - you will be contacted if you meet requirements",
    icon: "💬",
  },
  {
    id: "application",
    title: "Application Form",
    description: "Complete application form after approval",
    icon: "📝",
  },
  {
    id: "immunization",
    title: "Complete Immunization Record",
    description: "Full vaccination history required",
    icon: "💉",
  },
  {
    id: "license",
    title: "Professional Documentation",
    description:
      "Licensed/registered nurses, healthcare professions must provide copy of license, proof of affiliation, and funding letter if sponsored",
    icon: "🏆",
  },
  {
    id: "processing",
    title: "Processing Time",
    description:
      "Minimum 8 to 10 weeks to process application. Contact: educational.observers@sunnybrook.ca",
    icon: "⏰",
    urgent: true,
  },
];

export default function WorldClassInfo() {
  const [selectedSection, setSelectedSection] = useState<
    "wellness" | "observership"
  >("wellness");
  const [selectedTip, setSelectedTip] = useState<WellnessTip | null>(null);

  return (
    <div className="h-full overflow-y-auto bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Custom styles for glass effects */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
          .glass-card {
            background: rgba(255, 255, 255, 0.7);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.3);
            box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.15);
          }
          .wellness-card:hover {
            transform: translateY(-8px);
            transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
          }
        `,
        }}
      />

      <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Hero Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            className="mb-8"
          >
            <div className="w-20 h-20 mx-auto mb-6 relative">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 shadow-2xl"></div>
              <div className="absolute inset-1 rounded-xl bg-white flex items-center justify-center">
                <span className="text-3xl">📋</span>
              </div>
            </div>
          </motion.div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Notes for{" "}
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Sar
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Essential wellness tips and observership information for your
            medical school journey.
          </p>
        </motion.div>

        {/* Section Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex justify-center mb-12"
        >
          <div className="glass-card rounded-2xl p-2 shadow-xl">
            <div className="flex space-x-2">
              <button
                onClick={() => setSelectedSection("wellness")}
                className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${
                  selectedSection === "wellness"
                    ? "bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg transform scale-105"
                    : "text-gray-700 hover:bg-white/50"
                }`}
              >
                <span className="text-lg">💪 Wellness Tips</span>
                <div className="text-sm opacity-80 mt-1">Self-Care Guide</div>
              </button>
              <button
                onClick={() => setSelectedSection("observership")}
                className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${
                  selectedSection === "observership"
                    ? "bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg transform scale-105"
                    : "text-gray-700 hover:bg-white/50"
                }`}
              >
                <span className="text-lg">🏥 Observership</span>
                <div className="text-sm opacity-80 mt-1">
                  Sunnybrook Requirements
                </div>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Wellness Tips Section */}
        <AnimatePresence mode="wait">
          {selectedSection === "wellness" && (
            <motion.div
              key="wellness"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.5 }}
            >
              <motion.h2
                className="text-3xl font-bold text-gray-900 mb-8 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                Medical School Wellness Guide
              </motion.h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                {wellnessTips.map((tip, index) => (
                  <motion.div
                    key={tip.id}
                    initial={{ opacity: 0, y: 30, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{
                      delay: index * 0.1,
                      duration: 0.5,
                      ease: [0.23, 1, 0.32, 1],
                    }}
                    whileHover={{ scale: 1.02 }}
                    className="wellness-card glass-card rounded-2xl p-6 shadow-xl cursor-pointer group"
                    onClick={() => setSelectedTip(tip)}
                  >
                    {/* Tip Header */}
                    <div className="flex items-start space-x-4 mb-4">
                      <div
                        className={`w-14 h-14 bg-gradient-to-r ${tip.color} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}
                      >
                        <span className="text-2xl">{tip.icon}</span>
                      </div>

                      <div className="flex-1">
                        <p className="text-gray-800 font-medium leading-relaxed group-hover:text-purple-700 transition-colors">
                          {tip.tip}
                        </p>
                      </div>
                    </div>

                    {/* Hover indicator */}
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute top-4 right-4">
                      <svg
                        className="w-5 h-5 text-purple-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Observership Section */}
          {selectedSection === "observership" && (
            <motion.div
              key="observership"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                className="text-center mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  International Student Observership
                </h2>
                <div className="glass-card rounded-xl p-4 inline-block shadow-lg">
                  <p className="text-lg font-semibold text-purple-700">
                    🏥 Sunnybrook Hospital
                  </p>
                </div>
              </motion.div>

              <div className="space-y-4 mb-8">
                {observershipRequirements.map((req, index) => (
                  <motion.div
                    key={req.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`glass-card rounded-2xl p-6 shadow-lg ${
                      req.urgent ? "border-2 border-orange-300" : ""
                    }`}
                  >
                    <div className="flex items-start space-x-4">
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-md ${
                          req.urgent
                            ? "bg-gradient-to-r from-orange-500 to-red-500"
                            : "bg-gradient-to-r from-blue-500 to-purple-600"
                        }`}
                      >
                        <span className="text-xl">{req.icon}</span>
                      </div>

                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center">
                          {req.title}
                          {req.urgent && (
                            <span className="ml-2 bg-orange-100 text-orange-800 text-xs font-semibold px-2 py-1 rounded-full">
                              Important
                            </span>
                          )}
                        </h3>
                        <p className="text-gray-700 leading-relaxed">
                          {req.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Important Notice */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="glass-card rounded-2xl p-6 shadow-xl border-2 border-red-200"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg">
                    <span className="text-xl">⚠️</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-red-800 mb-2">
                      Important Notice
                    </h3>
                    <p className="text-red-700 leading-relaxed">
                      Please note that completing the application form does not
                      guarantee your acceptance for the educational
                      observership.
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tip Detail Modal */}
        <AnimatePresence>
          {selectedTip && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedTip(null)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="glass-card rounded-3xl p-8 max-w-lg w-full shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-6">
                  <div
                    className={`w-16 h-16 bg-gradient-to-r ${selectedTip.color} rounded-2xl flex items-center justify-center shadow-lg`}
                  >
                    <span className="text-3xl">{selectedTip.icon}</span>
                  </div>
                  <button
                    onClick={() => setSelectedTip(null)}
                    className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
                  >
                    <svg
                      className="w-6 h-6 text-gray-600"
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

                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Wellness Reminder
                </h3>

                <p className="text-gray-700 leading-relaxed mb-6 text-lg">
                  {selectedTip.tip}
                </p>

                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                      <span className="text-white text-sm font-bold">💜</span>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">
                        Remember
                      </div>
                      <div className="text-sm text-gray-600">
                        Your wellbeing is the foundation of your success
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

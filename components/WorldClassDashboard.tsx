// components/WorldClassDashboard.tsx
"use client";

import { motion } from "framer-motion";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";

const features = [
  {
    title: "AI Explain",
    description:
      "Get instant, comprehensive explanations of any medical concept",
    icon: (
      <svg
        className="w-8 h-8"
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
    ),
    gradient: "from-emerald-500 to-emerald-600",
    href: "/explain",
    stats: "Instant Results",
  },
  {
    title: "Smart Summarize",
    description: "Transform lengthy texts into concise, digestible summaries",
    icon: (
      <svg
        className="w-8 h-8"
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
    ),
    gradient: "from-purple-500 to-purple-600",
    href: "/summarize",
    stats: "Save 80% Reading Time",
  },
];

const quickStats = [
  {
    title: "AI Accuracy",
    value: "99.9%",
    icon: "🎯",
    description: "Precision in medical explanations",
  },
  {
    title: "Response Time",
    value: "<10s",
    icon: "⚡",
    description: "Lightning-fast AI responses",
  },
  {
    title: "Study Efficiency",
    value: "+300%",
    icon: "📈",
    description: "Improved learning speed",
  },
];

export default function WorldClassDashboard() {
  const { user } = useUser();
  const userName =
    user?.firstName || user?.fullName?.split(" ")[0] || "Student";

  return (
    <div className="h-full overflow-y-auto bg-gray-50">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="text-center mb-8">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 leading-tight"
            >
              Hello{" "}
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                {userName}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-lg sm:text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4"
            >
              Welcome to your first year university med portal
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="mt-6 inline-flex items-center gap-2 bg-gradient-to-r from-indigo-50 to-purple-50 px-6 py-3 rounded-full border border-indigo-100"
            >
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-gray-700">
                SeyranAI is ready to help you excel
              </span>
            </motion.div>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12"
        >
          {quickStats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.0 + index * 0.1, duration: 0.4 }}
              className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl">{stat.icon}</span>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-500">{stat.title}</div>
                </div>
              </div>
              <p className="text-sm text-gray-600">{stat.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="mb-8 sm:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-6 sm:mb-8 px-4">
            Your AI-Powered Learning Tools
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.4 + index * 0.2, duration: 0.4 }}
                whileHover={{ scale: 1.02 }}
                className="group"
              >
                <Link href={feature.href}>
                  <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 h-full">
                    <div className="flex items-start justify-between mb-6">
                      <div
                        className={`p-4 rounded-2xl bg-gradient-to-r ${feature.gradient} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}
                      >
                        {feature.icon}
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                          {feature.stats}
                        </div>
                      </div>
                    </div>

                    <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-indigo-600 transition-colors">
                      {feature.title}
                    </h3>

                    <p className="text-gray-600 leading-relaxed mb-6">
                      {feature.description}
                    </p>

                    <div className="flex items-center text-indigo-600 font-semibold group-hover:text-indigo-700 transition-colors">
                      <span>Get Started</span>
                      <svg
                        className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Welcome Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.6 }}
          className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl p-8 text-white text-center"
        >
          <h3 className="text-2xl font-bold mb-4">
            Sar, I am proud of you. I hope this first semester goes smoothly.
          </h3>
          <p className="text-lg text-white/90 mb-6 max-w-2xl mx-auto">
            Even though I'm watching from afar, I'm rooting for you every step
            of the way. You're going to do absolutely amazing things, and I
            believe in you completely.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/explain"
              className="bg-white text-indigo-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors shadow-lg"
            >
              Start Explaining
            </Link>
            <Link
              href="/summarize"
              className="bg-white/20 text-white px-8 py-3 rounded-xl font-semibold hover:bg-white/30 transition-colors border border-white/30"
            >
              Try Summarizing
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// components/BeautifulLanding.tsx
"use client";

import { SignInButton } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function BeautifulLanding() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="min-h-screen overflow-hidden relative bg-gradient-to-br from-slate-50 via-white to-indigo-50">
      {/* Floating Geometric Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            initial={{
              x:
                Math.random() *
                (typeof window !== "undefined" ? window.innerWidth : 1920),
              y:
                Math.random() *
                (typeof window !== "undefined" ? window.innerHeight : 1080),
              rotate: Math.random() * 360,
            }}
            animate={{
              y: [null, Math.random() * -100],
              rotate: [null, Math.random() * 360 + 180],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: Math.random() * 20 + 15,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {i % 3 === 0 ? (
              <div className="w-3 h-3 bg-gradient-to-br from-violet-400 to-indigo-400 rounded-full opacity-20" />
            ) : i % 3 === 1 ? (
              <div className="w-4 h-4 bg-gradient-to-br from-emerald-400 to-blue-400 rounded opacity-15 rotate-45" />
            ) : (
              <div className="w-2 h-6 bg-gradient-to-b from-purple-400 to-pink-400 rounded-full opacity-25" />
            )}
          </motion.div>
        ))}
      </div>

      {/* Dynamic Glass Morphism Background */}
      <motion.div
        className="absolute inset-0 opacity-40"
        style={{
          background: `radial-gradient(800px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(99, 102, 241, 0.1), rgba(168, 85, 247, 0.05), transparent 60%)`,
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-5xl mx-auto">
          {/* Apple-Style Logo with Glass Effect */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 1.5, ease: [0.23, 1, 0.32, 1] }}
            className="mb-12"
          >
            <div className="w-32 h-32 mx-auto mb-8 relative">
              {/* Outer glow ring */}
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 rounded-full bg-gradient-to-br from-violet-400 via-purple-400 to-indigo-400 blur-lg"
              />

              {/* Main glass circle */}
              <div className="absolute inset-2 rounded-full bg-white/80 backdrop-blur-xl border border-white/40 shadow-2xl">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-violet-50 via-white to-indigo-50" />
                <div className="absolute inset-4 rounded-full bg-gradient-to-br from-violet-500 via-purple-500 to-indigo-500 flex items-center justify-center shadow-inner">
                  <motion.span
                    animate={{
                      scale: [1, 1.05, 1],
                      filter: [
                        "brightness(1)",
                        "brightness(1.2)",
                        "brightness(1)",
                      ],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="text-3xl"
                  >
                    🧠
                  </motion.span>
                </div>
              </div>

              {/* Rotating highlights */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0"
              >
                <div className="absolute top-0 left-1/2 w-2 h-2 bg-white rounded-full transform -translate-x-1/2 blur-sm opacity-60" />
                <div className="absolute bottom-0 right-1/4 w-1 h-1 bg-violet-300 rounded-full blur-sm opacity-80" />
              </motion.div>
            </div>
          </motion.div>

          {/* Hero Text with Apple Typography */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1, ease: [0.23, 1, 0.32, 1] }}
            className="mb-16"
          >
            <motion.h1
              className="text-6xl md:text-8xl lg:text-9xl font-thin text-gray-900 mb-8 tracking-tight leading-none"
              animate={{
                backgroundImage: [
                  "linear-gradient(135deg, #1f2937 0%, #4f46e5 50%, #7c3aed 100%)",
                  "linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #1f2937 100%)",
                  "linear-gradient(135deg, #7c3aed 0%, #1f2937 50%, #4f46e5 100%)",
                ],
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              style={{
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
                backgroundSize: "200% 200%",
              }}
            >
              Welcome
            </motion.h1>

            {/* Animated divider */}
            <motion.div className="flex justify-center mb-8">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 1.5, duration: 1.5, ease: "easeOut" }}
                className="h-px bg-gradient-to-r from-transparent via-violet-400 to-transparent max-w-md"
              />
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
              className="text-2xl md:text-3xl text-gray-600 font-light tracking-wide leading-relaxed"
            >
              Something extraordinary awaits...
            </motion.p>
          </motion.div>

          {/* Epic CTA Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 3.2, duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          >
            <SignInButton mode="modal">
              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 20px 60px rgba(99, 102, 241, 0.4)",
                }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-16 py-6 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 text-white text-xl font-medium rounded-full overflow-hidden shadow-2xl"
              >
                {/* Glass overlay */}
                <div className="absolute inset-0 bg-white/10 backdrop-blur-sm" />

                {/* Shimmer effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                  animate={{ x: [-100, 400] }}
                  transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                />

                {/* Hover glow */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-violet-400 via-purple-400 to-indigo-400 opacity-0 group-hover:opacity-30"
                  transition={{ duration: 0.3 }}
                />

                <span className="relative z-10 tracking-wide font-semibold">
                  Enter Now!
                </span>

                {/* Outer glow */}
                <motion.div
                  className="absolute -inset-1 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-full opacity-20 blur-xl"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              </motion.button>
            </SignInButton>
          </motion.div>

          {/* Subtle Branding */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.8 }}
            className="mt-16"
          >
            <p className="text-gray-400 text-sm tracking-wider font-light">
              • Powered by SeyranAI
            </p>
          </motion.div>
        </div>
      </div>

      {/* Bottom ambient glow */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[800px] h-64 bg-gradient-to-t from-violet-100/40 via-purple-50/20 to-transparent blur-3xl" />

      {/* Corner accents */}
      <div className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-br from-indigo-200/30 to-purple-200/30 rounded-full blur-2xl" />
      <div className="absolute bottom-20 left-10 w-40 h-40 bg-gradient-to-tr from-violet-200/20 to-blue-200/20 rounded-full blur-3xl" />
    </div>
  );
}

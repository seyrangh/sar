// components/WorldClassSidebar.tsx
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useUser, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import BeautifulCountdown from "./BeautifulCountdown";

interface NavItem {
  name: string;
  href: string;
  icon: React.ReactNode;
  description: string;
  gradient: string;
}

const navigation: NavItem[] = [
  {
    name: "Dashboard",
    href: "/",
    description: "Your learning overview",
    gradient: "from-blue-500 to-blue-600",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z"
        />
      </svg>
    ),
  },
  {
    name: "Explain",
    href: "/explain",
    description: "AI-powered explanations",
    gradient: "from-emerald-500 to-emerald-600",
    icon: (
      <svg
        className="w-5 h-5"
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
  },
  {
    name: "Summarize",
    href: "/summarize",
    description: "Smart text summarization",
    gradient: "from-purple-500 to-purple-600",
    icon: (
      <svg
        className="w-5 h-5"
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
  },
  {
    name: "Info",
    href: "/info",
    description: "Academic modules & journey",
    gradient: "from-orange-500 to-orange-600",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.168 18.477 18.582 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
        />
      </svg>
    ),
  },
];

interface WorldClassSidebarProps {
  children: React.ReactNode;
}

export default function WorldClassSidebar({
  children,
}: WorldClassSidebarProps) {
  const { user, isSignedIn } = useUser();
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(true); // Default to collapsed
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      // Auto-collapse on mobile
      if (window.innerWidth < 768) {
        setIsCollapsed(true);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (!isSignedIn) {
    return <>{children}</>;
  }

  return (
    <div className="flex h-screen bg-gray-50 relative">
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMobile && !isCollapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setIsCollapsed(true)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.div
        initial={false}
        animate={{
          width: isCollapsed ? (isMobile ? 0 : 80) : 280,
          x: isMobile && isCollapsed ? -280 : 0,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`${
          isMobile ? "fixed" : "relative"
        } bg-white border-r border-gray-200 shadow-xl flex flex-col z-50 h-full`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <AnimatePresence mode="wait">
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="flex items-center space-x-3"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-lg">S</span>
                </div>
                <div>
                  <h1 className="text-lg font-bold text-gray-900">SarMentor</h1>
                  <p className="text-xs text-gray-500">Powered by SeyranAI</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Only show desktop close button on desktop */}
          {!isMobile && (
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <svg
                className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${
                  isCollapsed ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
                />
              </svg>
            </button>
          )}
        </div>

        {/* User Info */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <UserButton
              appearance={{
                elements: {
                  avatarBox: isCollapsed ? "w-10 h-10" : "w-12 h-12",
                },
              }}
            />
            <AnimatePresence mode="wait">
              {!isCollapsed && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="flex-1 min-w-0"
                >
                  <p className="text-sm font-semibold text-gray-900 truncate">
                    Welcome, {user?.firstName || "User"}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Beautiful Countdown */}
        <AnimatePresence mode="wait">
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <BeautifulCountdown />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navigation.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link key={item.name} href={item.href}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`relative group flex items-center ${
                    isCollapsed ? "justify-center p-3" : "p-3"
                  } rounded-xl transition-all duration-200 ${
                    isActive
                      ? "bg-gradient-to-r " +
                        item.gradient +
                        " text-white shadow-lg"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <div
                    className={`${isCollapsed ? "p-2" : "p-2"} rounded-lg ${
                      isActive
                        ? "bg-white/20"
                        : "bg-gray-100 group-hover:bg-white"
                    } transition-colors`}
                  >
                    {item.icon}
                  </div>

                  <AnimatePresence mode="wait">
                    {!isCollapsed && (
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.2 }}
                        className="ml-3 flex-1"
                      >
                        <p className="text-sm font-semibold">{item.name}</p>
                        <p
                          className={`text-xs ${
                            isActive ? "text-white/80" : "text-gray-500"
                          }`}
                        >
                          {item.description}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {isActive && !isCollapsed && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute right-1 w-1 h-8 bg-white rounded-full"
                      transition={{ duration: 0.3 }}
                    />
                  )}

                  {isActive && isCollapsed && (
                    <motion.div
                      layoutId="activeIndicatorCollapsed"
                      className="absolute -right-1 w-1 h-8 bg-gradient-to-b from-indigo-500 to-purple-600 rounded-full"
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </motion.div>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100">
          <AnimatePresence mode="wait">
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.2 }}
                className="text-center"
              >
                <p className="text-xs text-gray-500 mb-2">
                  Your greatest companion
                </p>
                <div className="flex items-center justify-center space-x-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-gray-400">Online</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* World-Class Mobile Menu Button */}
      {isMobile && (
        <motion.button
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.05 }}
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="fixed top-4 left-4 z-50 bg-white/80 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-white/40 hover:shadow-2xl hover:bg-white/90 transition-all duration-300"
        >
          <motion.div
            animate={{ rotate: isCollapsed ? 0 : 180 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
          >
            {isCollapsed ? (
              <svg
                className="w-6 h-6 text-gray-800"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6 text-gray-800"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            )}
          </motion.div>

          {/* Subtle glow effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-2xl opacity-0 group-hover:opacity-100"
            animate={{
              opacity: isCollapsed ? [0, 0.2, 0] : [0, 0.3, 0],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.button>
      )}

      {/* Main Content */}
      <div
        className={`flex-1 overflow-hidden transition-all duration-300 ${
          isMobile ? "w-full" : ""
        }`}
      >
        {children}
      </div>
    </div>
  );
}

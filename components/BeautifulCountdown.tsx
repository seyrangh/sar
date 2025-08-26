// components/BeautifulCountdown.tsx
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function BeautifulCountdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isTargetDate, setIsTargetDate] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const targetDate = new Date("2025-12-22T23:59:59");
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      // Check if it's December 22, 2025
      const isDecember22 =
        now.getFullYear() === 2025 &&
        now.getMonth() === 11 && // December is month 11 (0-indexed)
        now.getDate() === 22;

      setIsTargetDate(isDecember22);

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  if (isTargetDate) {
    return (
      <div className="p-4 border-b border-gray-100">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center"
        >
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="text-3xl"
          >
            🎉
          </motion.div>
          <motion.div
            animate={{
              color: ["#ec4899", "#f59e0b", "#10b981", "#3b82f6", "#ec4899"],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
            className="text-sm font-bold mt-2"
          >
            Welcome back sexy
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="p-4 border-b border-gray-100">
      <div className="grid grid-cols-4 gap-2">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg p-2 text-white shadow-md text-center"
        >
          <motion.div
            key={timeLeft.days}
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-lg font-bold"
          >
            {timeLeft.days}
          </motion.div>
          <div className="text-xs text-indigo-100">D</div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg p-2 text-white shadow-md text-center"
        >
          <motion.div
            key={timeLeft.hours}
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-lg font-bold"
          >
            {timeLeft.hours}
          </motion.div>
          <div className="text-xs text-emerald-100">H</div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-gradient-to-br from-orange-500 to-red-600 rounded-lg p-2 text-white shadow-md text-center"
        >
          <motion.div
            key={timeLeft.minutes}
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-lg font-bold"
          >
            {timeLeft.minutes}
          </motion.div>
          <div className="text-xs text-orange-100">M</div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-gradient-to-br from-pink-500 to-rose-600 rounded-lg p-2 text-white shadow-md text-center"
        >
          <motion.div
            key={timeLeft.seconds}
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-lg font-bold"
          >
            {timeLeft.seconds}
          </motion.div>
          <div className="text-xs text-pink-100">S</div>
        </motion.div>
      </div>
    </div>
  );
}

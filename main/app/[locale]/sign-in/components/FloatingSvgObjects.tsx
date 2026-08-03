"use client";

import React from "react";
import { motion } from "motion/react";

import { BackgroundSettings } from "../types";

interface FloatingSvgObjectsProps {
  settings: BackgroundSettings;
}

export const FloatingSvgObjects: React.FC<FloatingSvgObjectsProps> = ({ settings }) => {
  const isDark = settings.theme === "dark" || settings.theme === "high-contrast";

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-[1] select-none">
      {settings.gridOverlay && (
        <div
          className={`absolute inset-0 opacity-[0.04] ${
            isDark
              ? "bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)]"
              : "bg-[linear-gradient(to_right,#000000_1px,transparent_1px),linear-gradient(to_bottom,#000000_1px,transparent_1px)]"
          } bg-[size:48px_48px]`}
        />
      )}

      <motion.div
        className="absolute top-[8%] right-[12%] h-64 w-64 rounded-full border border-dashed border-zinc-500/20 md:h-96 md:w-96"
        animate={{
          rotate: [0, 360],
          scale: [1, 1.05, 1],
          y: [0, -15, 0],
        }}
        transition={{
          rotate: { duration: 40 / settings.speed, repeat: Infinity, ease: "linear" },
          scale: { duration: 8 / settings.speed, repeat: Infinity, ease: "easeInOut" },
          y: { duration: 6 / settings.speed, repeat: Infinity, ease: "easeInOut" },
        }}
      >
        <div
          className={`h-full w-full scale-75 rounded-full border ${
            isDark ? "border-white/10" : "border-black/10"
          }`}
        />
      </motion.div>

      <motion.div
        className="absolute bottom-[10%] left-[8%] h-80 w-80 rounded-full border border-zinc-500/15 md:h-[28rem] md:w-[28rem]"
        animate={{
          rotate: [360, 0],
          scale: [1, 1.08, 1],
          x: [0, 20, 0],
        }}
        transition={{
          rotate: { duration: 50 / settings.speed, repeat: Infinity, ease: "linear" },
          scale: { duration: 10 / settings.speed, repeat: Infinity, ease: "easeInOut" },
          x: { duration: 8 / settings.speed, repeat: Infinity, ease: "easeInOut" },
        }}
      >
        <div className="absolute inset-4 rounded-full border border-dashed border-zinc-400/20" />
      </motion.div>

      <motion.div
        className={`absolute top-[25%] left-[15%] h-20 w-20 rounded-2xl border backdrop-blur-[2px] md:h-28 md:w-28 ${
          isDark ? "border-white/15 bg-white/5" : "border-zinc-800/15 bg-black/5"
        }`}
        animate={{
          rotateX: [0, 180, 360],
          rotateY: [0, 180, 360],
          y: [0, -25, 0],
        }}
        transition={{
          duration: 18 / settings.speed,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className={`absolute right-[18%] bottom-[28%] h-16 w-16 rounded-xl border backdrop-blur-[2px] md:h-24 md:w-24 ${
          isDark ? "border-zinc-400/20 bg-zinc-400/5" : "border-zinc-900/15 bg-zinc-900/5"
        }`}
        animate={{
          rotate: [0, 90, 180, 270, 360],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 14 / settings.speed,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div
        className={`pointer-events-none absolute top-0 left-1/2 h-[25rem] w-[40rem] -translate-x-1/2 rounded-full blur-[100px] transition-colors duration-700 ${
          isDark
            ? "bg-gradient-to-b from-white/10 via-zinc-400/5 to-transparent"
            : "bg-gradient-to-b from-black/5 via-zinc-500/5 to-transparent"
        }`}
      />

      <motion.div
        className="absolute top-12 left-12 text-xs font-mono tracking-widest opacity-40"
        animate={{ opacity: [0.2, 0.6, 0.2] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        <span className={isDark ? "text-zinc-400" : "text-zinc-600"}>
          + 01.BG // MONOCHROME.GRID
        </span>
      </motion.div>

      <motion.div
        className="absolute right-12 bottom-12 text-xs font-mono tracking-widest opacity-40"
        animate={{ opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 5, repeat: Infinity, delay: 1 }}
      >
        <span className={isDark ? "text-zinc-400" : "text-zinc-600"}>
          SYS.ANIMATED // 60FPS
        </span>
      </motion.div>
    </div>
  );
};

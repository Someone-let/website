"use client";

import React from "react";
import { motion } from "motion/react";
import { RefreshCw, Sliders, X } from "lucide-react";

import { ConstellationConfig } from "../types";

interface FooterControlsProps {
  config: ConstellationConfig;
  onChange: (newConfig: Partial<ConstellationConfig>) => void;
  onReset: () => void;
  onClose: () => void;
  isOpen: boolean;
}

export const FooterControls: React.FC<FooterControlsProps> = ({
  config,
  onChange,
  onReset,
  onClose,
  isOpen,
}) => {
  if (!isOpen) return null;

  const presets: Array<{ name: string; icon: string; cfg: Partial<ConstellationConfig> }> = [
    {
      name: "Subtle Mesh",
      icon: "*",
      cfg: {
        particleCount: 110,
        maxDistance: 120,
        mouseRadius: 160,
        particleSpeed: 0.8,
        interactiveMode: "connect",
        glowEffect: true,
      },
    },
    {
      name: "Dense Nebula",
      icon: "#",
      cfg: {
        particleCount: 170,
        maxDistance: 140,
        mouseRadius: 200,
        particleSpeed: 1.2,
        interactiveMode: "connect",
        glowEffect: true,
      },
    },
    {
      name: "Gravitational",
      icon: "@",
      cfg: {
        particleCount: 140,
        maxDistance: 130,
        mouseRadius: 220,
        particleSpeed: 1.5,
        interactiveMode: "attract",
        glowEffect: true,
      },
    },
    {
      name: "Repulsor",
      icon: "!",
      cfg: {
        particleCount: 120,
        maxDistance: 110,
        mouseRadius: 180,
        particleSpeed: 1,
        interactiveMode: "repel",
        glowEffect: false,
      },
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96, y: 10 }}
      transition={{ duration: 0.2 }}
      className="fixed right-6 bottom-6 z-50 w-full max-w-sm rounded-2xl border border-zinc-800 bg-zinc-950/95 p-5 font-sans text-zinc-100 shadow-2xl backdrop-blur-xl"
    >
      <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
        <div className="flex items-center space-x-2">
          <Sliders className="h-4 w-4 text-zinc-300" />
          <h3 className="font-mono text-sm font-semibold tracking-tight text-white">
            Particle Configurator
          </h3>
        </div>
        <div className="flex items-center space-x-1">
          <button
            onClick={onReset}
            className="rounded-lg p-1.5 text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white"
            title="Reset to default settings"
          >
            <RefreshCw className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white"
            title="Close controls"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="max-h-[70vh] space-y-4 overflow-y-auto pt-4 pr-1 font-mono text-xs">
        <div>
          <label className="mb-2 block text-[11px] tracking-wider text-zinc-400 uppercase">
            Quick Presets
          </label>
          <div className="grid grid-cols-2 gap-2">
            {presets.map((p) => (
              <button
                key={p.name}
                onClick={() => onChange(p.cfg)}
                className="flex items-center space-x-1.5 rounded-lg border border-zinc-800 bg-zinc-900 px-2.5 py-1.5 text-left text-[11px] text-zinc-300 transition-all hover:border-zinc-700 hover:text-white"
              >
                <span>{p.icon}</span>
                <span className="truncate">{p.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-1">
          <div className="flex justify-between text-zinc-300">
            <span>Particle Count</span>
            <span className="font-bold text-white">{config.particleCount}</span>
          </div>
          <input
            type="range"
            min="30"
            max="220"
            step="5"
            value={config.particleCount}
            onChange={(e) => onChange({ particleCount: Number(e.target.value) })}
            className="h-1.5 w-full cursor-pointer rounded-lg bg-zinc-800 accent-zinc-200"
          />
        </div>

        <div className="space-y-1">
          <div className="flex justify-between text-zinc-300">
            <span>Connection Range</span>
            <span className="font-bold text-white">{config.maxDistance}px</span>
          </div>
          <input
            type="range"
            min="60"
            max="200"
            step="5"
            value={config.maxDistance}
            onChange={(e) => onChange({ maxDistance: Number(e.target.value) })}
            className="h-1.5 w-full cursor-pointer rounded-lg bg-zinc-800 accent-zinc-200"
          />
        </div>

        <div className="space-y-1">
          <div className="flex justify-between text-zinc-300">
            <span>Cursor Radius</span>
            <span className="font-bold text-white">{config.mouseRadius}px</span>
          </div>
          <input
            type="range"
            min="80"
            max="300"
            step="10"
            value={config.mouseRadius}
            onChange={(e) => onChange({ mouseRadius: Number(e.target.value) })}
            className="h-1.5 w-full cursor-pointer rounded-lg bg-zinc-800 accent-zinc-200"
          />
        </div>

        <div className="space-y-1">
          <div className="flex justify-between text-zinc-300">
            <span>Particle Speed</span>
            <span className="font-bold text-white">{config.particleSpeed.toFixed(1)}x</span>
          </div>
          <input
            type="range"
            min="0.2"
            max="3.0"
            step="0.1"
            value={config.particleSpeed}
            onChange={(e) => onChange({ particleSpeed: Number(e.target.value) })}
            className="h-1.5 w-full cursor-pointer rounded-lg bg-zinc-800 accent-zinc-200"
          />
        </div>

        <div className="flex items-center justify-between border-t border-zinc-800 pt-2">
          <span className="text-zinc-300">Glow Effect</span>
          <button
            onClick={() => onChange({ glowEffect: !config.glowEffect })}
            className={`flex h-5 w-10 items-center rounded-full p-0.5 transition-colors ${
              config.glowEffect ? "justify-end bg-zinc-100" : "justify-start bg-zinc-800"
            }`}
          >
            <span
              className={`h-4 w-4 rounded-full transition-all ${
                config.glowEffect ? "bg-zinc-950" : "bg-zinc-400"
              }`}
            />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

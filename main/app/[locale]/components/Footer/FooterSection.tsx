"use client";

import React, { useState } from "react";
import { AnimatePresence } from "motion/react";

import { ConstellationFooter } from "./components/ConstellationFooter";
import { FooterControls } from "./components/FooterControls";
import { ConstellationConfig } from "./types";

const DEFAULT_CONFIG: ConstellationConfig = {
  particleCount: 110,
  particleMinSize: 1.0,
  particleMaxSize: 2.8,
  maxDistance: 120,
  mouseRadius: 160,
  particleSpeed: 0.8,
  particleColor: "#ffffff",
  lineColor: "#ffffff",
  glowEffect: true,
  interactiveMode: "connect",
  themeVariant: "obsidian",
};

export default function FooterSection() {
  const [config, setConfig] = useState<ConstellationConfig>(DEFAULT_CONFIG);
  const [isControlsOpen, setIsControlsOpen] = useState(false);

  const handleUpdateConfig = (newConfig: Partial<ConstellationConfig>) => {
    setConfig((prev) => ({ ...prev, ...newConfig }));
  };

  const handleResetConfig = () => {
    setConfig(DEFAULT_CONFIG);
  };

  return (
    <>
      <ConstellationFooter
        config={config}
        onToggleCustomizer={() => setIsControlsOpen((prev) => !prev)}
      />

      <AnimatePresence>
        {isControlsOpen && (
          <FooterControls
            config={config}
            onChange={handleUpdateConfig}
            onReset={handleResetConfig}
            onClose={() => setIsControlsOpen(false)}
            isOpen={isControlsOpen}
          />
        )}
      </AnimatePresence>
    </>
  );
}

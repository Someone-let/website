"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowUp,
  Check,
  ChevronRight,
  ExternalLink,
  Globe,
  MessageCircle,
  Radio,
  Send,
  Sparkles,
} from "lucide-react";

import { ConstellationCanvas } from "./ConstellationCanvas";
import { ConstellationConfig, FooterLinkGroup, SystemStatus } from "../types";

interface ConstellationFooterProps {
  config: ConstellationConfig;
  onToggleCustomizer?: () => void;
}

const DEFAULT_LINK_GROUPS: FooterLinkGroup[] = [
  {
    title: "Forum",
    links: [
      { label: "Latest Posts", href: "#latest-posts" },
      { label: "Categories", href: "#categories" },
      { label: "Trending Topics", href: "#trending" },
      { label: "Ask a Question", href: "#ask" },
      { label: "Members", href: "#members" },
    ],
  },
  {
    title: "Community",
    links: [
      { label: "Guidelines", href: "#guidelines" },
      { label: "Introductions", href: "#introductions" },
      { label: "Events", href: "#events" },
      { label: "Feedback", href: "#feedback" },
      { label: "Help Center", href: "#help" },
    ],
  },
  {
    title: "Account",
    links: [
      { label: "Sign In", href: "#sign-in" },
      { label: "Create Account", href: "#register" },
      { label: "Profile", href: "#profile" },
      { label: "Saved Posts", href: "#saved" },
      { label: "Notifications", href: "#notifications" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "#privacy" },
      { label: "Terms of Service", href: "#terms" },
      { label: "Cookie Settings", href: "#cookies" },
      { label: "Security Audit", href: "#audit" },
      { label: "License (MIT)", href: "#license" },
    ],
  },
];

const SYSTEM_STATUS: SystemStatus = {
  indicator: "operational",
  label: "Community Online",
  uptime: "99.99%",
};

export const ConstellationFooter: React.FC<ConstellationFooterProps> = ({
  config,
  onToggleCustomizer,
}) => {
  const [email, setEmail] = useState("");
  const [subscribeState, setSubscribeState] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [subscribeMessage, setSubscribeMessage] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setSubscribeState("error");
      setSubscribeMessage("Please enter a valid email address.");
      return;
    }

    setSubscribeState("loading");
    setTimeout(() => {
      setSubscribeState("success");
      setSubscribeMessage("You are subscribed to forum updates.");
      setEmail("");
      setTimeout(() => {
        setSubscribeState("idle");
        setSubscribeMessage("");
      }, 4000);
    }, 800);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const themeBgMap = {
    obsidian: "bg-black text-zinc-200 border-zinc-800/80",
    charcoal: "bg-zinc-950 text-zinc-200 border-zinc-800",
    minimal: "bg-[#0e0e11] text-zinc-100 border-zinc-800/60",
    "high-contrast": "bg-black text-white border-white/20",
  };

  return (
    <footer
      id="main-footer"
      className={`relative w-full overflow-hidden border-t font-sans transition-colors duration-500 ${themeBgMap[config.themeVariant]}`}
      role="contentinfo"
      aria-label="Forum site footer"
    >
      <ConstellationCanvas config={config} />

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 backdrop-blur-[0.5px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 pt-16 pb-12 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 border-b border-zinc-800/80 pb-12 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center space-x-4">
            <div className="group relative flex h-11 w-11 items-center justify-center rounded-xl border border-zinc-700/60 bg-gradient-to-br from-zinc-800 to-zinc-950 shadow-inner">
              <Sparkles className="h-5 w-5 text-zinc-100 transition-transform duration-300 group-hover:scale-110" />
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-zinc-400 opacity-75" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-zinc-200" />
              </span>
            </div>

            <div>
              <div className="flex items-center space-x-2">
                <span className="font-mono text-xl font-bold tracking-tight text-white">
                  FORUM
                </span>
                <span className="rounded border border-zinc-700 bg-zinc-800 px-2 py-0.5 font-mono text-[10px] font-semibold text-zinc-300">
                  COMMUNITY
                </span>
              </div>
              <p className="mt-0.5 text-xs text-zinc-400">
                Ask questions, share knowledge, and connect.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center space-x-2 rounded-full border border-zinc-800 bg-zinc-900/90 px-3.5 py-1.5 font-mono text-xs text-zinc-300 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span>{SYSTEM_STATUS.label}</span>
            </div>

            {onToggleCustomizer && (
              <button
                onClick={onToggleCustomizer}
                className="flex items-center space-x-2 rounded-full bg-zinc-100 px-3.5 py-1.5 text-xs font-semibold text-zinc-950 shadow-sm transition-all active:scale-95 hover:bg-white"
                aria-label="Toggle constellation particle settings"
              >
                <Radio className="h-3.5 w-3.5 animate-pulse text-zinc-900" />
                <span>Background</span>
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-12 py-12 lg:grid-cols-12">
          <div className="space-y-5 lg:col-span-4">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold tracking-tight text-white">
                Get Forum Updates
              </h3>
              <p className="text-sm leading-relaxed text-zinc-400">
                Subscribe for weekly highlights from discussions and announcements.
              </p>
            </div>

            <form onSubmit={handleSubscribe} className="space-y-3">
              <div className="relative flex items-center">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-lg border border-zinc-800 bg-zinc-900/90 px-4 py-2.5 pr-24 font-mono text-sm text-zinc-100 placeholder-zinc-500 transition-all focus:border-zinc-400 focus:ring-1 focus:ring-zinc-400 focus:outline-none"
                  aria-label="Email address for newsletter"
                />
                <button
                  type="submit"
                  disabled={subscribeState === "loading"}
                  className="absolute top-1.5 right-1.5 bottom-1.5 flex items-center justify-center space-x-1 rounded-md bg-zinc-100 px-3.5 text-xs font-medium text-zinc-950 shadow transition-all hover:bg-white disabled:opacity-50"
                >
                  {subscribeState === "loading" ? (
                    <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-zinc-950 border-t-transparent" />
                  ) : (
                    <>
                      <span>Join</span>
                      <Send className="h-3 w-3" />
                    </>
                  )}
                </button>
              </div>

              <AnimatePresence>
                {subscribeMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    className={`flex items-center space-x-1.5 font-mono text-xs ${
                      subscribeState === "error" ? "text-zinc-400" : "text-zinc-200"
                    }`}
                  >
                    {subscribeState === "success" && (
                      <Check className="h-3.5 w-3.5 text-white" />
                    )}
                    <span>{subscribeMessage}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-8">
            {DEFAULT_LINK_GROUPS.map((group) => (
              <div key={group.title} className="space-y-4">
                <h4 className="font-mono text-xs font-semibold tracking-wider text-zinc-300 uppercase">
                  {group.title}
                </h4>
                <ul className="space-y-2.5 text-sm">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="group flex items-center space-x-1.5 text-zinc-400 transition-colors duration-200 hover:text-white"
                      >
                        <ChevronRight className="-ml-2 h-3 w-3 text-zinc-200 opacity-0 transition-all group-hover:ml-0 group-hover:opacity-100" />
                        <span>{link.label}</span>
                        {link.badge && (
                          <span className="ml-1.5 rounded border border-zinc-700 bg-zinc-800 px-1.5 py-0.2 font-mono text-[10px] text-zinc-300">
                            {link.badge}
                          </span>
                        )}
                        {link.external && (
                          <ExternalLink className="h-3 w-3 opacity-60 transition-opacity group-hover:opacity-100" />
                        )}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 flex flex-col items-center justify-between gap-6 border-t border-zinc-800/80 pt-8 md:flex-row">
          <div className="flex flex-wrap items-center gap-4 font-mono text-xs text-zinc-400">
            <span>
              © {new Date().getFullYear()} Forum Community. All rights reserved.
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-zinc-800 bg-zinc-900/80 p-2 text-zinc-400 transition-all hover:border-zinc-600 hover:text-white"
                aria-label="GitHub Repository"
              >
                <Globe className="h-4 w-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-zinc-800 bg-zinc-900/80 p-2 text-zinc-400 transition-all hover:border-zinc-600 hover:text-white"
                aria-label="Twitter Profile"
              >
                <MessageCircle className="h-4 w-4" />
              </a>
              <a
                href="https://discord.com"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-zinc-800 bg-zinc-900/80 p-2 text-zinc-400 transition-all hover:border-zinc-600 hover:text-white"
                aria-label="Discord Server"
              >
                <MessageCircle className="h-4 w-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-zinc-800 bg-zinc-900/80 p-2 text-zinc-400 transition-all hover:border-zinc-600 hover:text-white"
                aria-label="LinkedIn Page"
              >
                <ExternalLink className="h-4 w-4" />
              </a>
              <a
                href="#network"
                className="rounded-lg border border-zinc-800 bg-zinc-900/80 p-2 text-zinc-400 transition-all hover:border-zinc-600 hover:text-white"
                aria-label="Global Network Locations"
              >
                <Globe className="h-4 w-4" />
              </a>
            </div>

            <button
              onClick={scrollToTop}
              className="group flex items-center space-x-2 rounded-lg border border-zinc-800 bg-zinc-900/90 px-3 py-2 font-mono text-xs text-zinc-300 shadow-sm transition-all hover:border-zinc-700 hover:bg-zinc-800 hover:text-white"
              aria-label="Back to top of page"
            >
              <span>TOP</span>
              <ArrowUp className="h-3.5 w-3.5 text-zinc-400 transition-transform group-hover:-translate-y-0.5 group-hover:text-white" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

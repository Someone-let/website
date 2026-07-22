"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  return (
    <nav className="border-b border-zinc-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="text-lg font-semibold tracking-tight text-zinc-900">
          Forum
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="relative">
            <button
              onClick={() => setLangOpen((v) => !v)}
              className="rounded-md border border-zinc-300 px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
            >
              EN
            </button>

            {langOpen && (
              <div className="absolute right-0 mt-2 w-24 rounded-md border border-zinc-200 bg-white shadow-lg">
                <button className="block w-full px-3 py-2 text-left text-sm hover:bg-zinc-50">EN</button>
                <button className="block w-full px-3 py-2 text-left text-sm hover:bg-zinc-50">FR</button>
                <button className="block w-full px-3 py-2 text-left text-sm hover:bg-zinc-50">DE</button>
              </div>
            )}
          </div>

          <button className="rounded-md bg-zinc-900 px-3 py-2 text-sm font-medium text-white hover:bg-zinc-700">
            Login
          </button>

          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="rounded-md border border-zinc-300 p-2 text-zinc-700 hover:bg-zinc-50"
            aria-label="Open menu"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
            onClick={() => setMenuOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 z-50 flex w-72 flex-col border-l border-zinc-200 bg-white px-4 py-6 shadow-2xl sm:px-6">
            <div className="flex items-center justify-between">
              <span className="text-base font-semibold text-zinc-900">Menu</span>
              <button
                onClick={() => setMenuOpen(false)}
                className="rounded-md border border-zinc-300 p-2 text-zinc-700 hover:bg-zinc-50"
                aria-label="Close menu"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 6l12 12M6 18L18 6" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <div className="mt-6 flex flex-col gap-3 text-sm font-medium text-zinc-800">
              <Link href="/" className="rounded-md px-4 py-3 hover:bg-zinc-100">Home</Link>
              <Link href="/about" className="rounded-md px-4 py-3 hover:bg-zinc-100">About</Link>
              <Link href="/contact" className="rounded-md px-4 py-3 hover:bg-zinc-100">Contact</Link>
            </div>
          </div>
        </>
      )}
    </nav>
  );
}

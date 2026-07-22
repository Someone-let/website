'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/forum', label: 'Forum' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <div className="relative">
      {/* Main Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-gray-900 hover:text-gray-700 transition-colors">
            forum
          </Link>

          {/* Hamburger Menu Button */}
          <button
            onClick={toggleMenu}
            className="flex flex-col gap-1.5 focus:outline-none z-50 relative"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            <span
              className={`block h-0.5 w-6 bg-gray-900 transition-all duration-300 ${
                isOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-gray-900 transition-all duration-300 ${
                isOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-gray-900 transition-all duration-300 ${
                isOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Left Panel - Transparent */}
      <div
        className={`fixed left-0 top-0 bottom-0 w-64 bg-black/30 backdrop-blur-sm z-30 transition-all duration-500 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      />

      {/* Right Panel - White with Links */}
      <div
        className={`fixed right-0 top-0 bottom-0 w-64 bg-white shadow-2xl z-30 transition-all duration-500 transform overflow-y-auto ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Links Container */}
        <div className="flex flex-col h-full">
          {/* Top Spacing */}
          <div className="h-20" />

          {/* Navigation Links */}
          <nav className="flex flex-col px-6 gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="py-3 px-4 text-lg font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Bottom Action Buttons */}
          <div className="mt-auto px-6 pb-8 flex flex-col gap-3">
            <button className="w-full py-2 px-4 border-2 border-gray-900 text-gray-900 font-semibold rounded-lg hover:bg-gray-900 hover:text-white transition-all duration-200">
              Sign In
            </button>
            <button className="w-full py-2 px-4 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-all duration-200">
              Sign Up
            </button>
          </div>
        </div>
      </div>

      {/* Overlay Click to Close */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-transparent z-20"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Spacer for Fixed Navbar */}
      <div className="h-20" />
    </div>
  );
}

'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('English');

  const languages = [
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'ru', label: 'Russian', flag: '🇷🇺' },
    { code: 'ka', label: 'Georgian', flag: '🇬🇪' },
  ];

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

          <div className="ml-auto flex items-center gap-3">
            {/* Language Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                className="flex items-center justify-between gap-2 px-3 py-2 border-2 border-gray-300 text-gray-700 font-medium rounded-lg hover:border-gray-400 transition-all duration-200"
              >
                <span className="text-lg">{languages.find(l => l.label === selectedLanguage)?.flag}</span>
                <span className="hidden sm:inline text-sm">{selectedLanguage}</span>
                <span
                  className={`transition-transform duration-300 text-xs ${
                    isLanguageOpen ? 'rotate-180' : ''
                  }`}
                >
                  ▼
                </span>
              </button>

              {/* Language Options */}
              {isLanguageOpen && (
                <div className="absolute right-0 mt-2 bg-white border-2 border-gray-300 rounded-lg shadow-lg z-50 min-w-max">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setSelectedLanguage(lang.label);
                        setIsLanguageOpen(false);
                      }}
                      className={`w-full px-4 py-2 text-left font-medium flex items-center gap-2 transition-all duration-200 whitespace-nowrap ${
                        selectedLanguage === lang.label
                          ? 'bg-gray-900 text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      } ${
                        lang.code === 'en' ? 'border-b border-gray-200' : ''
                      } ${lang.code === 'ru' ? 'border-b border-gray-200' : ''}`}
                    >
                      <span className="text-lg">{lang.flag}</span>
                      {lang.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

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
        </div>
      </nav>

      {/* Left Panel - Transparent */}
      <div
        className={`fixed left-0 top-0 bottom-0 w-[80%] bg-black/30 backdrop-blur-sm z-30 transition-all duration-500 transform ${
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
          <nav className="flex flex-col px-4 gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="group flex items-center justify-between rounded-2xl border border-transparent px-4 py-3 text-lg font-semibold text-gray-700 transition-all duration-200 hover:border-gray-200 hover:bg-gray-50 hover:text-gray-900"
              >
                <span>{link.label}</span>
                <span className="text-sm text-gray-400 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-gray-700">
                  ↗
                </span>
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

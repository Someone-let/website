'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { useTranslations } from 'next-intl';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const t = useTranslations('navbar');

  const langDropdownRef = useRef<HTMLDivElement>(null);

  const currentLocale = pathname?.split('/')[1] || 'en';

  const languages = [
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'ru', label: 'Russian', flag: '🇷🇺' },
    { code: 'ka', label: 'Georgian', flag: '🇬🇪' },
  ];

  const selectedLanguageCode = languages.some((lang) => lang.code === currentLocale)
    ? currentLocale
    : 'en';

  const selectedLanguageObj = languages.find((lang) => lang.code === selectedLanguageCode) ?? languages[0];

  // Close language menu on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target as Node)) {
        setIsLanguageOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Prevent background scroll when mobile drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const navLinks = [
    { href: `/${selectedLanguageCode}`, label: t('home') },
    { href: `/${selectedLanguageCode}/about`, label: t('about') },
    { href: `/${selectedLanguageCode}/forum`, label: t('forum') },
    { href: `/${selectedLanguageCode}/contact`, label: t('contact') },
  ];

  const userRole = (session?.user as { role?: string } | undefined)?.role;
  const isAdmin = userRole === 'admin';
  const userDisplayName = session?.user?.name || session?.user?.email || 'User';

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const handleLanguageChange = (langCode: string) => {
    setIsLanguageOpen(false);
    if (!pathname) return;

    const segments = pathname.split('/');
    segments[1] = langCode;
    const newPath = segments.join('/') || `/${langCode}`;
    router.push(newPath);
  };

  const isLinkActive = (href: string) => {
    if (href === `/${selectedLanguageCode}`) {
      return pathname === `/${selectedLanguageCode}`;
    }
    return pathname?.startsWith(href);
  };

  return (
    <header className="relative z-40">
      {/* Sticky Main Header */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm transition-all duration-200">
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 max-w-7xl mx-auto">
          {/* Logo */}
          <Link
            href={`/${selectedLanguageCode}`}
            className="text-2xl font-black tracking-tight text-gray-900 hover:opacity-80 transition-opacity flex items-center gap-1"
          >
            forum<span className="text-blue-600">.</span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = isLinkActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 text-sm font-semibold rounded-full transition-all duration-200 ${
                    active
                      ? 'bg-gray-100 text-gray-900'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}

            {isAdmin && (
              <Link
                href={`/${selectedLanguageCode}/dashboard`}
                className={`px-4 py-2 text-sm font-semibold rounded-full border border-gray-900 transition-all duration-200 ${
                  isLinkActive(`/${selectedLanguageCode}/dashboard`)
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-900 hover:bg-gray-900 hover:text-white'
                }`}
              >
                Dashboard
              </Link>
            )}
          </div>

          {/* Right Action Controls */}
          <div className="flex items-center gap-3">
            {/* Language Selector Dropdown */}
            <div className="relative" ref={langDropdownRef}>
              <button
                type="button"
                onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                className="flex items-center gap-2 px-3 py-1.5 border border-gray-200 text-gray-700 text-sm font-medium rounded-full bg-white hover:border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all duration-200 shadow-xs"
                aria-expanded={isLanguageOpen}
                aria-label="Select language"
              >
                <span className="text-base leading-none">{selectedLanguageObj.flag}</span>
                <span className="hidden sm:inline font-semibold">{selectedLanguageObj.label}</span>
                <svg
                  className={`w-3.5 h-3.5 text-gray-500 transition-transform duration-200 ${
                    isLanguageOpen ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Language Options */}
              {isLanguageOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-100 rounded-2xl shadow-xl z-50 p-1.5 animate-in fade-in zoom-in-95 duration-150">
                  {languages.map((lang) => {
                    const isSelected = selectedLanguageCode === lang.code;
                    return (
                      <button
                        key={lang.code}
                        onClick={() => handleLanguageChange(lang.code)}
                        className={`w-full px-3 py-2 text-xs font-semibold rounded-xl flex items-center justify-between transition-colors ${
                          isSelected
                            ? 'bg-gray-900 text-white'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span className="text-base">{lang.flag}</span>
                          {lang.label}
                        </span>
                        {isSelected && (
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Desktop Quick User / Auth Action */}
            <div className="hidden sm:flex items-center gap-2">
              {session?.user ? (
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gray-900 text-white flex items-center justify-center text-xs font-bold ring-2 ring-gray-100">
                    {getInitials(userDisplayName)}
                  </div>
                </div>
              ) : (
                <Link
                  href={`/${selectedLanguageCode}/sign-in`}
                  className="px-4 py-1.5 bg-gray-900 text-white text-sm font-semibold rounded-full hover:bg-gray-800 transition-colors shadow-xs"
                >
                  {t('signIn')}
                </Link>
              )}
            </div>

            {/* Hamburger Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-gray-700 rounded-lg hover:bg-gray-100 focus:outline-none transition-colors"
              aria-label="Toggle Navigation Menu"
              aria-expanded={isOpen}
            >
              <div className="w-5 h-4 flex flex-col justify-between relative">
                <span
                  className={`block h-0.5 w-5 bg-gray-900 rounded-full transition-all duration-300 transform origin-left ${
                    isOpen ? 'rotate-45 translate-x-0.5 -translate-y-0.5' : ''
                  }`}
                />
                <span
                  className={`block h-0.5 w-5 bg-gray-900 rounded-full transition-all duration-200 ${
                    isOpen ? 'opacity-0' : ''
                  }`}
                />
                <span
                  className={`block h-0.5 w-5 bg-gray-900 rounded-full transition-all duration-300 transform origin-left ${
                    isOpen ? '-rotate-45 translate-x-0.5 translate-y-0.5' : ''
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Backdrop Backdrop Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      {/* Off-Canvas Slide Drawer */}
      <aside
        className={`fixed top-0 right-0 bottom-0 w-80 max-w-[85vw] bg-white shadow-2xl z-50 transition-transform duration-300 ease-out transform flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Mobile Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <span className="text-lg font-bold text-gray-900">Navigation</span>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1.5 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close menu"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Navigation Links List */}
        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-1.5">
          {navLinks.map((link) => {
            const active = isLinkActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`group flex items-center justify-between rounded-2xl px-4 py-3.5 text-base font-semibold transition-all duration-150 ${
                  active
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <span>{link.label}</span>
                <svg
                  className={`w-4 h-4 transition-transform duration-200 group-hover:translate-x-1 ${
                    active ? 'text-white' : 'text-gray-400 group-hover:text-gray-700'
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            );
          })}

          {isAdmin && (
            <Link
              href={`/${selectedLanguageCode}/dashboard`}
              onClick={() => setIsOpen(false)}
              className={`group flex items-center justify-between rounded-2xl px-4 py-3.5 text-base font-semibold border border-gray-900 transition-all duration-150 ${
                isLinkActive(`/${selectedLanguageCode}/dashboard`)
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-900 hover:bg-gray-900 hover:text-white'
              }`}
            >
              <span>Dashboard</span>
              <svg
                className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          )}
        </div>

        {/* User / Authentication Actions at Bottom */}
        <div className="p-6 border-t border-gray-100 bg-gray-50/50">
          {session?.user ? (
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-white rounded-2xl border border-gray-100 shadow-xs">
                <div className="w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center font-bold text-sm">
                  {getInitials(userDisplayName)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-gray-900 truncate">{userDisplayName}</p>
                  <p className="text-xs text-gray-500 truncate">{session.user.email}</p>
                </div>
              </div>
              <button
                onClick={() => signOut()}
                className="w-full py-2.5 px-4 bg-red-50 text-red-600 font-semibold text-sm rounded-xl hover:bg-red-100 transition-colors flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                Sign Out
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-2.5">
              <Link
                href={`/${selectedLanguageCode}/sign-in`}
                onClick={() => setIsOpen(false)}
                className="w-full py-3 px-4 border border-gray-900 text-gray-900 font-semibold rounded-xl hover:bg-gray-900 hover:text-white transition-all duration-200 text-center text-sm"
              >
                {t('signIn')}
              </Link>
              <Link
                href={`/${selectedLanguageCode}/register`}
                onClick={() => setIsOpen(false)}
                className="w-full py-3 px-4 bg-gray-900 text-white font-semibold rounded-xl hover:bg-gray-800 transition-all duration-200 text-center text-sm shadow-xs"
              >
                {t('register')}
              </Link>
            </div>
          )}
        </div>
      </aside>

      {/* Navbar Height Spacer */}
      <div className="h-16" />
    </header>
  );
}
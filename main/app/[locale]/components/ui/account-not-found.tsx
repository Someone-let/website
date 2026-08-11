"use client";

import Link from "next/link";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

type AuthPromptModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
};

export default function AuthPromptModal({
  isOpen,
  onClose,
  title = "Create an Account",
  description = "Join our community to publish posts, like content, and join the conversation.",
}: AuthPromptModalProps) {
  const pathname = usePathname();
  const locale = pathname?.split("/")[1] || "en";
  const currentPath = pathname && pathname !== `/${locale}` ? pathname : `/${locale}`;

  const buildAuthHref = (mode: "sign-in" | "sign-up") => {
    const basePath = `/${locale}/${mode}`;
    const params = new URLSearchParams();

    if (currentPath) {
      params.set("callbackUrl", currentPath);
    }

    const queryString = params.toString();
    return queryString ? `${basePath}?${queryString}` : basePath;
  };

  // Handle ESC key press to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.body.style.overflow = "hidden"; // Lock background scroll
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop Overlay */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-sm rounded-3xl border border-neutral-800 bg-neutral-950 p-6 sm:p-8 text-center shadow-2xl transition-all animate-in fade-in zoom-in-95 duration-200 z-10 space-y-6">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-white rounded-full hover:bg-neutral-900 transition"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header Icon */}
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-neutral-800 bg-neutral-900 text-white shadow-inner">
          <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>

        {/* Text Content */}
        <div className="space-y-2">
          <h3 className="text-xl font-bold tracking-tight text-white">{title}</h3>
          <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
            {description}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 pt-2">
          {/* Primary Action - Sign Up */}
          <Link
            href={buildAuthHref("sign-in")}
            onClick={onClose}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-neutral-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            Create Account
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>

          {/* Secondary Action - Redirect to Sign In */}
          <div className="pt-1">
            <p className="text-xs text-neutral-500">
              Already have an account?{" "}
              <Link
                href={buildAuthHref("sign-in")}
                onClick={onClose}
                className="font-medium text-white hover:underline underline-offset-4"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
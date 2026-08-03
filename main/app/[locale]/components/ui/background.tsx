'use client';

import React from 'react';

export default function AnimatedBackground() {
  const particles = Array.from({ length: 18 });
  const crosses = Array.from({ length: 10 });

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden bg-black select-none pointer-events-none z-0">
      {/* Self-contained Keyframe Animations */}
      <style jsx global>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg) scale(1); }
          50% { transform: translateY(-35px) rotate(180deg) scale(1.05); }
        }
        @keyframes float-reverse {
          0%, 100% { transform: translateY(0px) rotate(0deg) scale(1); }
          50% { transform: translateY(40px) rotate(-180deg) scale(0.95); }
        }
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.15; transform: scale(1); }
          50% { opacity: 0.35; transform: scale(1.2); }
        }
        @keyframes spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes drift {
          0% { transform: translate(0, 0); opacity: 0.1; }
          50% { opacity: 0.6; }
          100% { transform: translate(80px, -120px); opacity: 0.1; }
        }
        .animate-float-slow { animation: float-slow 20s ease-in-out infinite; }
        .animate-float-reverse { animation: float-reverse 24s ease-in-out infinite; }
        .animate-pulse-glow { animation: pulse-glow 10s ease-in-out infinite; }
        .animate-spin-slow { animation: spin-slow 35s linear infinite; }
        .animate-spin-reverse { animation: spin-slow 45s linear infinite reverse; }
        .bg-grid-pattern {
          background-image: 
            linear-gradient(to right, rgba(255, 255, 255, 0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.04) 1px, transparent 1px);
          background-size: 60px 60px;
        }
      `}</style>

      {/* 1. Subtle Grid Pattern Background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-60" />

      {/* 2. Soft Ambient Grayscale Orbs */}
      <div className="absolute top-1/4 left-1/5 w-[500px] h-[500px] bg-neutral-300/10 rounded-full blur-[140px] animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/5 w-[600px] h-[600px] bg-white/10 rounded-full blur-[160px] animate-pulse-glow [animation-delay:4s]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-neutral-600/10 rounded-full blur-[180px] animate-pulse-glow [animation-delay:2s]" />

      {/* 3. Animated Object: Concentric Rotating Rings */}
      <div className="absolute top-1/4 left-12 w-80 h-80 border border-neutral-700/40 rounded-full animate-spin-slow flex items-center justify-center">
        <div className="w-60 h-60 border border-dashed border-neutral-500/30 rounded-full animate-spin-reverse flex items-center justify-center">
          <div className="w-40 h-40 border border-neutral-400/20 rounded-full" />
        </div>
      </div>

      {/* 4. Animated Object: Wireframe Rotating Diamond */}
      <div className="absolute bottom-1/4 right-16 w-72 h-72 border border-neutral-600/30 animate-float-slow flex items-center justify-center rotate-45">
        <div className="w-48 h-48 border border-neutral-400/30 animate-spin-reverse flex items-center justify-center">
          <div className="w-24 h-24 bg-gradient-to-br from-white/10 to-transparent border border-white/20" />
        </div>
      </div>

      {/* 5. Animated Object: SVG Floating Hexagon */}
      <div className="absolute top-16 right-1/3 opacity-30 animate-float-reverse">
        <svg width="140" height="140" viewBox="0 0 100 100" className="stroke-neutral-300 fill-none stroke-[0.8]">
          <polygon points="50,5 90,25 90,75 50,95 10,75 10,25" />
          <polygon points="50,20 75,35 75,65 50,80 25,65 25,35" />
        </svg>
      </div>

      <div className="absolute top-18 right-2/3 opacity-30 animate-float-reverse">
        <svg width="140" height="140" viewBox="0 0 100 100" className="stroke-neutral-300 fill-none stroke-[0.8]">
          <polygon points="50,5 90,25 90,75 50,95 10,75 10,25" />
          <polygon points="50,20 75,35 75,65 50,80 25,65 25,35" />
        </svg>
      </div>

      <div className="absolute bottom-18 right-3/1 opacity-30 animate-float-reverse">
        <svg width="140" height="140" viewBox="0 0 100 100" className="stroke-neutral-300 fill-none stroke-[0.8]">
          <polygon points="50,5 90,25 90,75 50,95 10,75 10,25" />
          <polygon points="50,20 75,35 75,65 50,80 25,65 25,35" />
        </svg>
      </div>

      {/* 6. Animated Object: SVG Floating Concentric Triangle Circle */}
      <div className="absolute bottom-16 left-1/3 opacity-25 animate-float-slow">
        <svg width="180" height="180" viewBox="0 0 100 100" className="stroke-white fill-none stroke-[0.75]">
          <circle cx="50" cy="50" r="45" strokeDasharray="3 3" />
          <polygon points="50,15 85,85 15,85" />
        </svg>
      </div>

      {/* 7. Animated Floating Crosshairs (+) */}
      {crosses.map((_, i) => (
        <div
          key={`cross-${i}`}
          className="absolute text-neutral-500/40 font-mono text-xl select-none"
          style={{
            top: `${(i * 13 + 7) % 85}%`,
            left: `${(i * 19 + 11) % 90}%`,
            animation: `float-slow ${14 + (i % 5) * 4}s ease-in-out infinite`,
            animationDelay: `${i * 1.5}s`,
          }}
        >
          +
        </div>
      ))}

      {/* 8. Animated Particles / Glowing Specks */}
      {particles.map((_, i) => (
        <div
          key={`particle-${i}`}
          className="absolute rounded-full bg-neutral-200"
          style={{
            width: `${(i % 3) * 2 + 2}px`,
            height: `${(i % 3) * 2 + 2}px`,
            top: `${(i * 17 + 5) % 95}%`,
            left: `${(i * 23 + 8) % 95}%`,
            opacity: 0.15 + (i % 4) * 0.15,
            animation: `drift ${16 + (i % 6) * 3}s linear infinite`,
            animationDelay: `${(i % 5) * 1.2}s`,
          }}
        />
      ))}

      {/* 9. Vignette Border Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,0.85)_100%)] pointer-events-none" />
    </div>
  );
}
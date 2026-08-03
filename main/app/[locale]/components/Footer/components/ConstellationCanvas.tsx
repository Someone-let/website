"use client";

import { useEffect, useRef } from "react";

import { ConstellationConfig } from "../types";

interface ConstellationCanvasProps {
  config: ConstellationConfig;
}

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
};

export function ConstellationCanvas({ config }: ConstellationCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let rafId = 0;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const resize = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    const particles: Particle[] = Array.from({ length: config.particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * config.particleSpeed,
      vy: (Math.random() - 0.5) * config.particleSpeed,
      size:
        config.particleMinSize +
        Math.random() * (config.particleMaxSize - config.particleMinSize),
    }));

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };

    const onLeave = () => {
      mouseRef.current.x = -9999;
      mouseRef.current.y = -9999;
    };

    window.addEventListener("resize", resize);
    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", onLeave);

    const minSpeed = Math.max(0.12, config.particleSpeed * 0.22);
    const maxSpeed = Math.max(minSpeed * 2, config.particleSpeed * 2.8);

    const tick = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        const dx = mouseRef.current.x - p.x;
        const dy = mouseRef.current.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < config.mouseRadius) {
          const force = (config.mouseRadius - dist) / config.mouseRadius;
          if (config.interactiveMode === "repel" && dist > 0) {
            p.vx -= (dx / dist) * force * 0.08;
            p.vy -= (dy / dist) * force * 0.08;
          }
          if (config.interactiveMode === "attract" && dist > 0) {
            p.vx += (dx / dist) * force * 0.08;
            p.vy += (dy / dist) * force * 0.08;
          }
        }

        p.vx *= 0.99;
        p.vy *= 0.99;

        const speed = Math.hypot(p.vx, p.vy);
        if (speed < minSpeed) {
          if (speed > 0) {
            const boost = minSpeed / speed;
            p.vx *= boost;
            p.vy *= boost;
          } else {
            const angle = Math.random() * Math.PI * 2;
            p.vx = Math.cos(angle) * minSpeed;
            p.vy = Math.sin(angle) * minSpeed;
          }
        } else if (speed > maxSpeed) {
          const clamp = maxSpeed / speed;
          p.vx *= clamp;
          p.vy *= clamp;
        }

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        p.x = Math.max(0, Math.min(width, p.x));
        p.y = Math.max(0, Math.min(height, p.y));
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const d = Math.sqrt(dx * dx + dy * dy);

          if (d < config.maxDistance) {
            const alpha = (1 - d / config.maxDistance) * 0.35;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `${config.lineColor}${Math.floor(alpha * 255)
              .toString(16)
              .padStart(2, "0")}`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      for (const p of particles) {
        if (config.glowEffect) {
          ctx.shadowColor = config.particleColor;
          ctx.shadowBlur = 10;
        } else {
          ctx.shadowBlur = 0;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = config.particleColor;
        ctx.fill();
      }

      ctx.shadowBlur = 0;
      rafId = requestAnimationFrame(tick);
    };

    tick();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
    };
  }, [config]);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />;
}

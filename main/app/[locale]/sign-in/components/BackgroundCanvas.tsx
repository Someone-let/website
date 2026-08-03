"use client";

import React, { useEffect, useRef } from "react";

import { BackgroundSettings } from "../types";

interface BackgroundCanvasProps {
  settings: BackgroundSettings;
}

interface Point3D {
  x: number;
  y: number;
  z: number;
}

interface WireframeMesh {
  type: "cube" | "octahedron" | "tetrahedron" | "ring" | "icosahedron";
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  rotX: number;
  rotY: number;
  rotZ: number;
  rotSpeedX: number;
  rotSpeedY: number;
  rotSpeedZ: number;
  scale: number;
  opacity: number;
}

interface Particle {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  pulseSpeed: number;
  pulsePhase: number;
}

export const BackgroundCanvas: React.FC<BackgroundCanvasProps> = ({ settings }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, targetX: -1000, targetY: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId = 0;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      if (settings.interactive) {
        mouseRef.current.targetX = e.clientX;
        mouseRef.current.targetY = e.clientY;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (settings.interactive && e.touches.length > 0) {
        mouseRef.current.targetX = e.touches[0].clientX;
        mouseRef.current.targetY = e.touches[0].clientY;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove);

    const isDark = settings.theme === "dark";
    const isHighContrast = settings.theme === "high-contrast";

    const numMeshes = Math.floor((settings.density / 100) * 18);
    const meshes: WireframeMesh[] = [];
    const meshTypes: WireframeMesh["type"][] = [
      "cube",
      "octahedron",
      "tetrahedron",
      "ring",
      "icosahedron",
    ];

    for (let i = 0; i < numMeshes; i++) {
      meshes.push({
        type: meshTypes[i % meshTypes.length],
        x: (Math.random() - 0.5) * width * 1.2,
        y: (Math.random() - 0.5) * height * 1.2,
        z: Math.random() * 800 + 200,
        vx: (Math.random() - 0.5) * 0.6 * settings.speed,
        vy: (Math.random() - 0.5) * 0.6 * settings.speed,
        vz: (Math.random() - 0.5) * 0.3 * settings.speed,
        rotX: Math.random() * Math.PI * 2,
        rotY: Math.random() * Math.PI * 2,
        rotZ: Math.random() * Math.PI * 2,
        rotSpeedX: (Math.random() - 0.5) * 0.015 * settings.speed,
        rotSpeedY: (Math.random() - 0.5) * 0.015 * settings.speed,
        rotSpeedZ: (Math.random() - 0.5) * 0.01 * settings.speed,
        scale: Math.random() * 45 + 35,
        opacity: Math.random() * 0.5 + 0.3,
      });
    }

    const numParticles = Math.floor((settings.density / 100) * 80);
    const particles: Particle[] = [];

    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        z: Math.random() * 500,
        vx: (Math.random() - 0.5) * 0.8 * settings.speed,
        vy: (Math.random() - 0.5) * 0.8 * settings.speed,
        radius: Math.random() * (settings.particleSize || 2) + 1,
        opacity: Math.random() * 0.7 + 0.2,
        pulseSpeed: Math.random() * 0.02 + 0.01,
        pulsePhase: Math.random() * Math.PI * 2,
      });
    }

    const blobs = Array.from({ length: 6 }, (_, i) => ({
      x: (width * (i + 1)) / 7,
      y: height * (i % 2 === 0 ? 0.3 : 0.7),
      radius: Math.min(width, height) * (0.15 + (i % 3) * 0.05),
      vx: (Math.random() - 0.5) * 0.5 * settings.speed,
      vy: (Math.random() - 0.5) * 0.5 * settings.speed,
      angle: Math.random() * Math.PI * 2,
      angleSpeed: (Math.random() - 0.5) * 0.01 * settings.speed,
    }));

    let time = 0;

    const getCubeVertices = (): Point3D[] => [
      { x: -1, y: -1, z: -1 },
      { x: 1, y: -1, z: -1 },
      { x: 1, y: 1, z: -1 },
      { x: -1, y: 1, z: -1 },
      { x: -1, y: -1, z: 1 },
      { x: 1, y: -1, z: 1 },
      { x: 1, y: 1, z: 1 },
      { x: -1, y: 1, z: 1 },
    ];

    const cubeEdges = [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 0],
      [4, 5],
      [5, 6],
      [6, 7],
      [7, 4],
      [0, 4],
      [1, 5],
      [2, 6],
      [3, 7],
    ];

    const getOctahedronVertices = (): Point3D[] => [
      { x: 1, y: 0, z: 0 },
      { x: -1, y: 0, z: 0 },
      { x: 0, y: 1, z: 0 },
      { x: 0, y: -1, z: 0 },
      { x: 0, y: 0, z: 1 },
      { x: 0, y: 0, z: -1 },
    ];

    const octahedronEdges = [
      [0, 2],
      [2, 1],
      [1, 3],
      [3, 0],
      [0, 4],
      [2, 4],
      [1, 4],
      [3, 4],
      [0, 5],
      [2, 5],
      [1, 5],
      [3, 5],
    ];

    const getTetrahedronVertices = (): Point3D[] => [
      { x: 1, y: 1, z: 1 },
      { x: -1, y: -1, z: 1 },
      { x: -1, y: 1, z: -1 },
      { x: 1, y: -1, z: -1 },
    ];

    const tetrahedronEdges = [
      [0, 1],
      [0, 2],
      [0, 3],
      [1, 2],
      [1, 3],
      [2, 3],
    ];

    const rotatePoint = (p: Point3D, rx: number, ry: number, rz: number): Point3D => {
      const y1 = p.y * Math.cos(rx) - p.z * Math.sin(rx);
      const z1 = p.y * Math.sin(rx) + p.z * Math.cos(rx);
      const x1 = p.x;

      const x2 = x1 * Math.cos(ry) + z1 * Math.sin(ry);
      const z2 = -x1 * Math.sin(ry) + z1 * Math.cos(ry);
      const y2 = y1;

      const x3 = x2 * Math.cos(rz) - y2 * Math.sin(rz);
      const y3 = x2 * Math.sin(rz) + y2 * Math.cos(rz);
      const z3 = z2;

      return { x: x3, y: y3, z: z3 };
    };

    const render = () => {
      time += 0.016 * settings.speed;

      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.08;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.08;

      ctx.clearRect(0, 0, width, height);

      if (isDark) {
        ctx.fillStyle = "#09090b";
      } else if (isHighContrast) {
        ctx.fillStyle = "#000000";
      } else {
        ctx.fillStyle = "#f8fafc";
      }

      ctx.fillRect(0, 0, width, height);

      if (settings.preset === "geometric-3d" || settings.preset === "floating-polygons") {
        const centerX = width / 2;
        const centerY = height / 2;
        const fov = 450;

        meshes.forEach((mesh) => {
          mesh.rotX += mesh.rotSpeedX;
          mesh.rotY += mesh.rotSpeedY;
          mesh.rotZ += mesh.rotSpeedZ;

          mesh.x += mesh.vx;
          mesh.y += mesh.vy;
          mesh.z += mesh.vz;

          if (Math.abs(mesh.x) > width * 0.6) mesh.vx *= -1;
          if (Math.abs(mesh.y) > height * 0.6) mesh.vy *= -1;
          if (mesh.z < 100 || mesh.z > 900) mesh.vz *= -1;

          let mouseFactorX = 0;
          let mouseFactorY = 0;

          if (settings.interactive && mouseRef.current.x > 0) {
            const dx = (mouseRef.current.x - centerX) / width;
            const dy = (mouseRef.current.y - centerY) / height;
            mouseFactorX = dy * 0.3;
            mouseFactorY = dx * 0.3;
          }

          let vertices: Point3D[] = [];
          let edges: number[][] = [];

          if (mesh.type === "cube") {
            vertices = getCubeVertices();
            edges = cubeEdges;
          } else if (mesh.type === "octahedron") {
            vertices = getOctahedronVertices();
            edges = octahedronEdges;
          } else if (mesh.type === "tetrahedron") {
            vertices = getTetrahedronVertices();
            edges = tetrahedronEdges;
          } else if (mesh.type === "ring") {
            const ringSegs = 16;
            for (let r = 0; r < ringSegs; r++) {
              const a = (r / ringSegs) * Math.PI * 2;
              vertices.push({ x: Math.cos(a), y: Math.sin(a), z: 0 });
            }
            for (let r = 0; r < ringSegs; r++) {
              edges.push([r, (r + 1) % ringSegs]);
            }
          } else {
            vertices = getOctahedronVertices();
            edges = octahedronEdges;
          }

          const projectedPoints = vertices.map((v) => {
            const rotated = rotatePoint(
              v,
              mesh.rotX + mouseFactorX,
              mesh.rotY + mouseFactorY,
              mesh.rotZ
            );
            const scaleFactor = fov / (fov + mesh.z);

            return {
              x: centerX + (mesh.x + rotated.x * mesh.scale) * scaleFactor,
              y: centerY + (mesh.y + rotated.y * mesh.scale) * scaleFactor,
              scale: scaleFactor,
            };
          });

          const depthAlpha = Math.max(0.05, Math.min(1, (1000 - mesh.z) / 800)) * mesh.opacity;
          ctx.beginPath();

          edges.forEach(([i1, i2]) => {
            const p1 = projectedPoints[i1];
            const p2 = projectedPoints[i2];
            if (p1 && p2) {
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
            }
          });

          if (isDark) {
            ctx.strokeStyle = `rgba(255, 255, 255, ${depthAlpha * 0.6})`;
            ctx.fillStyle = `rgba(255, 255, 255, ${depthAlpha * 0.04})`;
          } else if (isHighContrast) {
            ctx.strokeStyle = `rgba(255, 255, 255, ${depthAlpha * 0.8})`;
            ctx.fillStyle = `rgba(255, 255, 255, ${depthAlpha * 0.1})`;
          } else {
            ctx.strokeStyle = `rgba(24, 24, 27, ${depthAlpha * 0.55})`;
            ctx.fillStyle = `rgba(24, 24, 27, ${depthAlpha * 0.03})`;
          }

          ctx.lineWidth = Math.max(1, (fov / (fov + mesh.z)) * 1.8);
          ctx.stroke();
          ctx.fill();

          projectedPoints.forEach((p) => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, ctx.lineWidth * 1.2, 0, Math.PI * 2);
            ctx.fillStyle = isDark
              ? `rgba(255, 255, 255, ${depthAlpha * 0.9})`
              : `rgba(0, 0, 0, ${depthAlpha * 0.8})`;
            ctx.fill();
          });
        });
      } else if (settings.preset === "particles-constellation") {
        const maxDist = 140;

        particles.forEach((p, idx) => {
          p.x += p.vx;
          p.y += p.vy;
          p.pulsePhase += p.pulseSpeed;

          if (p.x < 0 || p.x > width) p.vx *= -1;
          if (p.y < 0 || p.y > height) p.vy *= -1;

          if (settings.interactive && mouseRef.current.x > 0) {
            const dx = mouseRef.current.x - p.x;
            const dy = mouseRef.current.y - p.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist > 0 && dist < 180) {
              const force = (180 - dist) / 180;
              p.x -= (dx / dist) * force * 3;
              p.y -= (dy / dist) * force * 3;
            }
          }

          const currentOpacity = p.opacity * (0.6 + 0.4 * Math.sin(p.pulsePhase));

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = isDark
            ? `rgba(255, 255, 255, ${currentOpacity})`
            : `rgba(24, 24, 27, ${currentOpacity * 0.85})`;
          ctx.fill();

          for (let j = idx + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const dx = p.x - p2.x;
            const dy = p.y - p2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < maxDist) {
              const lineAlpha = (1 - dist / maxDist) * 0.3 * currentOpacity;
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = isDark
                ? `rgba(255, 255, 255, ${lineAlpha})`
                : `rgba(0, 0, 0, ${lineAlpha})`;
              ctx.lineWidth = 0.8;
              ctx.stroke();
            }
          }
        });
      } else if (settings.preset === "liquid-blobs") {
        blobs.forEach((b, i) => {
          b.x += b.vx;
          b.y += b.vy;
          b.angle += b.angleSpeed;

          if (b.x - b.radius < 0 || b.x + b.radius > width) b.vx *= -1;
          if (b.y - b.radius < 0 || b.y + b.radius > height) b.vy *= -1;

          ctx.save();
          ctx.translate(b.x, b.y);

          const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, b.radius);
          if (isDark) {
            gradient.addColorStop(0, `rgba(255, 255, 255, ${0.12 - i * 0.015})`);
            gradient.addColorStop(0.6, "rgba(161, 161, 170, 0.05)");
            gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
          } else {
            gradient.addColorStop(0, `rgba(24, 24, 27, ${0.14 - i * 0.015})`);
            gradient.addColorStop(0.6, "rgba(113, 113, 122, 0.06)");
            gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
          }

          ctx.beginPath();
          const points = 8;
          for (let p = 0; p <= points; p++) {
            const a = (p / points) * Math.PI * 2;
            const distortion =
              Math.sin(a * 3 + time + i) * 20 + Math.cos(a * 2 - time) * 15;
            const r = b.radius + distortion;
            const px = Math.cos(a) * r;
            const py = Math.sin(a) * r;
            if (p === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
          }
          ctx.closePath();
          ctx.fillStyle = gradient;
          ctx.fill();
          ctx.restore();
        });
      } else if (settings.preset === "grid-matrix") {
        const step = 45;
        const rows = Math.ceil(height / step) + 1;
        const cols = Math.ceil(width / step) + 1;

        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            const gx = c * step;
            const gy = r * step;

            const dx = gx - (mouseRef.current.x > 0 ? mouseRef.current.x : width / 2);
            const dy = gy - (mouseRef.current.y > 0 ? mouseRef.current.y : height / 2);
            const dist = Math.sqrt(dx * dx + dy * dy);

            const wave = Math.sin(dist * 0.02 - time * 2) * 0.5 + 0.5;
            const size = 1.2 + wave * 2.5;
            const alpha = 0.08 + wave * 0.25;

            ctx.beginPath();
            ctx.arc(gx, gy, size, 0, Math.PI * 2);
            ctx.fillStyle = isDark
              ? `rgba(255, 255, 255, ${alpha})`
              : `rgba(24, 24, 27, ${alpha})`;
            ctx.fill();

            if (dist < 120 && settings.interactive) {
              ctx.beginPath();
              ctx.moveTo(gx - 4, gy);
              ctx.lineTo(gx + 4, gy);
              ctx.moveTo(gx, gy - 4);
              ctx.lineTo(gx, gy + 4);
              ctx.strokeStyle = isDark
                ? `rgba(255, 255, 255, ${0.4 * (1 - dist / 120)})`
                : `rgba(0, 0, 0, ${0.4 * (1 - dist / 120)})`;
              ctx.lineWidth = 1;
              ctx.stroke();
            }
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [settings]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-700"
    />
  );
};

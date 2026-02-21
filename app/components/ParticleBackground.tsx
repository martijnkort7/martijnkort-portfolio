/**
 * ParticleBackground — animatief canvas met verbonden particles en muisinteractie.
 * Pure React + Canvas API, geen externe packages.
 */
"use client";

import { useEffect, useRef, useState } from "react";

const PARTICLE_COUNT = 65;
const MAX_SPEED = 0.4;
const CONNECT_DISTANCE = 120;
const MOUSE_DISTANCE = 150;
const MOUSE_ATTRACT = 0.05;
const PARTICLE_RADIUS = 1.5;
const PARTICLE_COLOR = "100, 255, 218";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

const BREAKPOINT = 768;

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(window.innerWidth >= BREAKPOINT);

    function handleResize() {
      setEnabled(window.innerWidth >= BREAKPOINT);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    const mouse = { x: -9999, y: -9999 };

    function resize() {
      canvas!.width = window.innerWidth;
      canvas!.height = window.innerHeight;
    }
    resize();

    const particles: Particle[] = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * MAX_SPEED * 2,
      vy: (Math.random() - 0.5) * MAX_SPEED * 2,
    }));

    function handleMouseMove(e: MouseEvent) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    }

    function render() {
      const w = canvas!.width;
      const h = canvas!.height;
      ctx!.clearRect(0, 0, w, h);

      for (const p of particles) {
        // Mouse attraction
        const dmx = mouse.x - p.x;
        const dmy = mouse.y - p.y;
        const mouseDist = Math.sqrt(dmx * dmx + dmy * dmy);
        if (mouseDist < MOUSE_DISTANCE) {
          p.vx += dmx * MOUSE_ATTRACT;
          p.vy += dmy * MOUSE_ATTRACT;
        }

        // Clamp speed
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (speed > MAX_SPEED) {
          p.vx = (p.vx / speed) * MAX_SPEED;
          p.vy = (p.vy / speed) * MAX_SPEED;
        }

        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Bounce off edges
        if (p.x < 0) { p.x = 0; p.vx *= -1; }
        if (p.x > w) { p.x = w; p.vx *= -1; }
        if (p.y < 0) { p.y = 0; p.vy *= -1; }
        if (p.y > h) { p.y = h; p.vy *= -1; }

        // Draw particle
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, PARTICLE_RADIUS, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(${PARTICLE_COLOR}, 0.4)`;
        ctx!.fill();
      }

      // Connection lines between particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECT_DISTANCE) {
            const opacity = 0.15 * (1 - dist / CONNECT_DISTANCE);
            ctx!.beginPath();
            ctx!.moveTo(particles[i].x, particles[i].y);
            ctx!.lineTo(particles[j].x, particles[j].y);
            ctx!.strokeStyle = `rgba(${PARTICLE_COLOR}, ${opacity})`;
            ctx!.lineWidth = 0.5;
            ctx!.stroke();
          }
        }
      }

      // Connection lines from cursor to nearby particles
      for (const p of particles) {
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MOUSE_DISTANCE) {
          const opacity = 0.25 * (1 - dist / MOUSE_DISTANCE);
          ctx!.beginPath();
          ctx!.moveTo(mouse.x, mouse.y);
          ctx!.lineTo(p.x, p.y);
          ctx!.strokeStyle = `rgba(${PARTICLE_COLOR}, ${opacity})`;
          ctx!.lineWidth = 0.5;
          ctx!.stroke();
        }
      }

      animationId = requestAnimationFrame(render);
    }

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);
    animationId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-10"
    />
  );
}

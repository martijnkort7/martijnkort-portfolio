/**
 * ParticleToggle — pill-vormige knop om de particle achtergrond aan/uit te zetten.
 * Bevat subtiele CSS-only uitsiepelende particles als uitnodiging.
 */
"use client";

import { useState, useEffect } from "react";
import { Sparkles } from "lucide-react";

interface ParticleToggleProps {
  isVisible: boolean;
  onToggle: () => void;
  hasAppeared: boolean;
}

const dots = [
  { animation: "particle1 5s ease-out 0s infinite" },
  { animation: "particle2 5s ease-out 0.5s infinite" },
  { animation: "particle3 5s ease-out 1.2s infinite" },
  { animation: "particle4 5s ease-out 0.8s infinite" },
  { animation: "particle5 5s ease-out 1.8s infinite" },
  { animation: "particle6 5s ease-out 0.3s infinite" },
];

export default function ParticleToggle({ isVisible, onToggle, hasAppeared }: ParticleToggleProps) {
  const [dotsKey, setDotsKey] = useState(0);

  useEffect(() => {
    if (!isVisible && hasAppeared) {
      const timer = setTimeout(() => {
        setDotsKey((prev) => prev + 1);
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [isVisible, hasAppeared]);

  return (
    <div className="hidden md:block fixed top-6 right-6 z-50" style={{ overflow: "visible" }}>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes particle1 { 0% { transform: translate(0, 0); opacity: 0.6; } 100% { transform: translate(-40px, -50px); opacity: 0; } }
        @keyframes particle2 { 0% { transform: translate(0, 0); opacity: 0.6; } 100% { transform: translate(40px, -45px); opacity: 0; } }
        @keyframes particle3 { 0% { transform: translate(0, 0); opacity: 0.6; } 100% { transform: translate(-35px, 40px); opacity: 0; } }
        @keyframes particle4 { 0% { transform: translate(0, 0); opacity: 0.6; } 100% { transform: translate(50px, 35px); opacity: 0; } }
        @keyframes particle5 { 0% { transform: translate(0, 0); opacity: 0.6; } 100% { transform: translate(-55px, 10px); opacity: 0; } }
        @keyframes particle6 { 0% { transform: translate(0, 0); opacity: 0.6; } 100% { transform: translate(45px, -20px); opacity: 0; } }
      `}} />

      {!isVisible && hasAppeared && (
        <div key={dotsKey} style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none" }}>
          {dots.map((d, i) => (
            <span
              key={i}
              aria-hidden="true"
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                width: 3,
                height: 3,
                borderRadius: "50%",
                backgroundColor: "#64ffda",
                pointerEvents: "none",
                animation: d.animation,
              }}
            />
          ))}
        </div>
      )}

      <button
        onClick={onToggle}
        className="relative inline-flex items-center gap-1.5"
        style={{
          fontSize: 11,
          padding: "6px 12px",
          borderRadius: 999,
          border: `1px solid rgba(100, 255, 218, ${isVisible ? 1 : 0.3})`,
          color: `rgba(100, 255, 218, ${isVisible ? 1 : 0.5})`,
          background: "transparent",
          boxShadow: isVisible ? "0 0 10px rgba(100, 255, 218, 0.31)" : "none",
          opacity: hasAppeared ? (isVisible ? 1 : 0.5) : 0,
          pointerEvents: hasAppeared ? "auto" : "none",
          transition: "all 0.8s ease",
          cursor: "pointer",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.opacity = "1";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.opacity = "0.5";
        }}
        aria-label={isVisible ? "Particles uitschakelen" : "Particles inschakelen"}
      >
        <Sparkles size={12} />
        {isVisible ? "stop particles" : "particles"}
      </button>
    </div>
  );
}

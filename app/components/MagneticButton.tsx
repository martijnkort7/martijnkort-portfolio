/**
 * MagneticButton — wrapper die children magnetisch naar de cursor trekt.
 * Pure React met inline styles, geen externe packages.
 */
"use client";

import { useRef, useState, type ReactNode } from "react";

interface MagneticButtonProps {
  children: ReactNode;
}

export default function MagneticButton({ children }: MagneticButtonProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("translate(0px, 0px)");
  const [isHovering, setIsHovering] = useState(false);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = wrapperRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const x = ((e.clientX - centerX) / (rect.width / 2)) * (rect.width * 0.25);
    const y = ((e.clientY - centerY) / (rect.height / 2)) * (rect.height * 0.25);

    setTransform(`translate(${x}px, ${y}px)`);
    setIsHovering(true);
  }

  function handleMouseLeave() {
    setTransform("translate(0px, 0px)");
    setIsHovering(false);
  }

  return (
    <div
      ref={wrapperRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ padding: 40, margin: -40, display: "inline-block" }}
    >
      <div
        style={{
          transform,
          transition: isHovering
            ? "transform 0.15s ease-out"
            : "transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)",
          willChange: "transform",
        }}
      >
        {children}
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useMotionTemplate } from "framer-motion";

export default function SpotlightCursor() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [hasMoved, setHasMoved] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!hasMoved) setHasMoved(true);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY, hasMoved]);

  const background = useMotionTemplate`radial-gradient(
    600px circle at ${mouseX}px ${mouseY}px,
    rgba(100, 255, 218, 0.07),
    transparent 80%
  )`;

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-30"
      style={{ background }}
      animate={{ opacity: hasMoved ? 1 : 0 }}
      transition={{ duration: 0.5 }}
    />
  );
}

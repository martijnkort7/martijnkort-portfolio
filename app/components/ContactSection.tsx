"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, Linkedin, Github } from "lucide-react";
import MagneticButton from "./MagneticButton";

export default function ContactSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px 0px" });

  return (
    <div ref={ref} className="flex flex-col items-center text-center">
      <motion.p
        className="max-w-md text-lg leading-relaxed text-slate-light"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        Benieuwd of ik iets voor je kan betekenen, of gewoon nieuwsgierig
        geworden na het lezen? Stuur een mail. Ik reageer snel.
      </motion.p>

      <MagneticButton>
        <motion.a
          href="mailto:martijn.kort@hotmail.com"
          className="mt-8 inline-flex items-center gap-2.5 rounded-lg border border-accent px-8 py-3 font-heading text-sm font-semibold text-accent transition-all duration-300 hover:bg-accent/10 hover:shadow-[0_0_20px_rgba(100,255,218,0.1)]"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <Mail size={16} />
          Stuur een mail
        </motion.a>
      </MagneticButton>

      <motion.div
        className="mt-10 flex items-center gap-6"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <a
          href="https://linkedin.com/in/martijnkort07"
          target="_blank"
          rel="noopener noreferrer"
          className="text-slate transition-colors duration-300 hover:text-accent"
          aria-label="LinkedIn"
        >
          <Linkedin size={22} />
        </a>
        <a
          href="https://github.com/martijnkort7"
          target="_blank"
          rel="noopener noreferrer"
          className="text-slate transition-colors duration-300 hover:text-accent"
          aria-label="GitHub"
        >
          <Github size={22} />
        </a>
      </motion.div>
    </div>
  );
}

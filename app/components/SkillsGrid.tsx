"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const skills = [
  "Procesoptimalisatie",
  "BPMN & Procesanalyse",
  "Process Mining",
  "KPI-monitoring & Rapportage",
  "Lean / Continuous Improvement",
  "AI & Automatisering",
  "AI Agents",
  "Prompt Engineering",
  "Zapier",
  "Python",
  "Data-gedreven besluitvorming",
  "Teamcoördinatie",
  "Communicatie & Stakeholdermanagement",
  "Change Management",
  "Snel schakelen",
];

export default function SkillsGrid() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px 0px" });

  return (
    <div ref={ref} className="flex flex-wrap gap-3">
      {skills.map((skill, i) => (
        <motion.span
          key={skill}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={
            isInView
              ? { opacity: 1, scale: 1 }
              : { opacity: 0, scale: 0.85 }
          }
          transition={{
            duration: 0.4,
            delay: i * 0.06,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="rounded-full bg-accent/10 px-4 py-1.5 text-sm font-medium text-accent transition-all duration-300 hover:bg-accent/20 hover:shadow-[0_0_12px_rgba(100,255,218,0.15)] cursor-default"
        >
          {skill}
        </motion.span>
      ))}
    </div>
  );
}

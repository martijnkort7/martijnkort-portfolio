"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface SkillGroup {
  heading: string;
  skills: string[];
}

const skillGroups: SkillGroup[] = [
  {
    heading: "Proces & Analyse",
    skills: [
      "Procesoptimalisatie",
      "BPMN & Procesanalyse",
      "Process Mining",
      "KPI-monitoring & Rapportage",
      "Lean / Continue Verbetering",
      "Data-gedreven besluitvorming",
    ],
  },
  {
    heading: "AI & Technologie",
    skills: [
      "AI & Automatisering",
      "AI Agents",
      "Prompt Engineering",
      "Python",
      "Zapier",
      "HubSpot CRM",
      "Claude Code",
    ],
  },
  {
    heading: "Mensen & Organisatie",
    skills: [
      "Teamcoördinatie",
      "Stakeholdermanagement",
      "Change Management",
      "Communicatie",
    ],
  },
];

export default function SkillsGrid() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px 0px" });

  let globalIndex = 0;

  return (
    <div ref={ref} className="flex flex-col gap-8">
      {skillGroups.map((group) => (
        <div key={group.heading}>
          <h3 className="mb-3 font-heading text-xs font-semibold uppercase tracking-widest text-slate-light">
            {group.heading}
          </h3>
          <div className="flex flex-col gap-3 lg:flex-row lg:flex-wrap">
            {group.skills.map((skill) => {
              const i = globalIndex++;
              return (
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
                  className="rounded-full bg-accent/10 px-4 py-1.5 text-center text-sm font-medium text-accent transition-all duration-300 hover:bg-accent/20 hover:shadow-[0_0_12px_rgba(100,255,218,0.15)] cursor-default lg:text-left"
                >
                  {skill}
                </motion.span>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

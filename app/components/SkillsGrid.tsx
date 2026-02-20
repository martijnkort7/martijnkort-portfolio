"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface SkillGroup {
  heading: string;
  skills: string[];
}

const skillGroups: SkillGroup[] = [
  {
    heading: "Proces",
    skills: [
      "Procesoptimalisatie",
      "BPMN & Procesanalyse",
      "Process Mining",
      "KPI-monitoring & Rapportage",
      "Lean / Continuous Improvement",
    ],
  },
  {
    heading: "AI & Automatisering",
    skills: [
      "AI & Automatisering",
      "AI Agents",
      "Prompt Engineering",
      "Claude Code",
      "Claude Cowork",
      "Zapier",
      "Python",
      "Data-gedreven besluitvorming",
    ],
  },
  {
    heading: "Mensen & Organisatie",
    skills: [
      "Teamcoördinatie",
      "Communicatie & Stakeholdermanagement",
      "Change Management",
    ],
  },
];

const allSkills = skillGroups.flatMap((g) => g.skills);

export default function SkillsGrid() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px 0px" });

  // Track global index for stagger delay
  let globalIndex = 0;

  return (
    <div ref={ref}>
      {/* Mobile: grouped with headings */}
      <div className="flex flex-col gap-6 lg:hidden">
        {skillGroups.map((group) => (
          <div key={group.heading} className="flex flex-col gap-3">
            <h3 className="font-heading text-xs font-semibold uppercase tracking-widest text-slate-light">
              {group.heading}
            </h3>
            {group.skills.map((skill) => {
              const i = allSkills.indexOf(skill);
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
                  className="rounded-full bg-accent/10 px-4 py-1.5 text-center text-sm font-medium text-accent transition-all duration-300 hover:bg-accent/20 hover:shadow-[0_0_12px_rgba(100,255,218,0.15)] cursor-default"
                >
                  {skill}
                </motion.span>
              );
            })}
          </div>
        ))}
      </div>

      {/* Desktop: flat flex-wrap, no headings */}
      <div className="hidden lg:flex lg:flex-wrap lg:gap-3">
        {allSkills.map((skill, i) => (
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
    </div>
  );
}

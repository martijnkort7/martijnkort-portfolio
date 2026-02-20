"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface Experience {
  period: string;
  role: string;
  company: string;
  location: string;
  bullets?: string[];
}

const experiences: Experience[] = [
  {
    period: "2025 — heden",
    role: "Process Owner Maatwerk",
    company: "ICM",
    location: "Utrecht",
    bullets: [
      "Organisatie en coördinatie van incompany trajecten",
      "Coördinatie van het Maatwerkteam",
      "CRM-doorontwikkeling en KPI-monitoring",
    ],
  },
  {
    period: "feb 2025 — heden",
    role: "Account Executive",
    company: "Watermelon",
    location: "Utrecht",
    bullets: [
      "Bedrijven helpen klantprocessen te automatiseren met AI",
      "HubSpot-omgeving doorontwikkelen",
    ],
  },
  {
    period: "okt 2023 — feb 2025",
    role: "Partner Care & Quality Medewerker",
    company: "Bol.com",
    location: "Utrecht",
    bullets: [
      "Vraagbaak bij complexe casussen",
      "Procesverbetering over afdelingen heen",
      "Coaching en onboarding van nieuwe collega's",
    ],
  },
  {
    period: "apr 2022 — sep 2023",
    role: "Partner Service Medewerker",
    company: "Bol.com",
    location: "Utrecht",
  },
  {
    period: "feb 2018 — mrt 2022",
    role: "Teamleider",
    company: "Albert Heijn",
    location: "Hilversum",
  },
];

function ExperienceCard({
  experience,
  index,
}: {
  experience: Experience;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <div className="group grid grid-cols-[1fr] sm:grid-cols-[140px_1fr] gap-1 sm:gap-6 rounded-lg p-4 -mx-4 transition-all duration-300 hover:bg-navy-light/50 hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.05)] hover:drop-shadow-lg">
        {/* Period */}
        <p className="text-xs font-semibold uppercase tracking-wide text-slate sm:pt-1">
          {experience.period}
        </p>

        {/* Details */}
        <div>
          <h3 className="font-heading text-base font-semibold leading-snug text-lightest group-hover:text-accent transition-colors duration-300">
            {experience.role}
            <span className="text-accent"> · </span>
            <span className="font-medium">{experience.company}</span>
          </h3>
          <p className="mt-1 text-xs text-slate">{experience.location}</p>

          {experience.bullets && experience.bullets.length > 0 && (
            <ul className="mt-3 space-y-1.5">
              {experience.bullets.map((bullet) => (
                <li
                  key={bullet}
                  className="relative pl-4 text-sm leading-relaxed text-slate-light before:absolute before:left-0 before:top-[0.55em] before:h-1 before:w-1 before:rounded-full before:bg-accent/60"
                >
                  {bullet}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function ExperienceTimeline() {
  return (
    <div className="flex flex-col gap-2">
      {experiences.map((exp, i) => (
        <ExperienceCard key={`${exp.company}-${exp.role}`} experience={exp} index={i} />
      ))}
    </div>
  );
}

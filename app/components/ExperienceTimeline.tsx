"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ExternalLink } from "lucide-react";

interface Experience {
  period: string;
  role: string;
  company: string;
  location: string;
  description: string;
  url: string;
}

const experiences: Experience[] = [
  {
    period: "mrt 2026 — heden",
    role: "Process Owner Maatwerk",
    company: "ICM",
    location: "Utrecht",
    url: "https://www.icm.nl/incompany/",
    description:
      "Verantwoordelijk voor de volledige regie van incompany leertrajecten, van eerste briefing tot evaluatie. Ik coördineer het Maatwerkteam, bewaak de kwaliteit van uitvoering en stuur continu bij op procesverbetering zodat elk traject soepeler loopt dan het vorige.",
  },
  {
    period: "feb 2025 — feb 2026",
    role: "Account Executive",
    company: "Watermelon",
    location: "Utrecht",
    url: "https://watermelon.ai/nl/",
    description:
      "Hielp bedrijven hun klantprocessen te automatiseren met AI, van analyse en verbetervoorstel tot daadwerkelijke implementatie. Ik sprak dagelijks met beslissers die wilden weten wat AI voor hun organisatie kon betekenen, en vertaalde dat naar concrete stappen. Daarnaast werkte ik mee aan de doorontwikkeling en optimalisatie van onze eigen processen.",
  },
  {
    period: "okt 2023 — feb 2025",
    role: "Partner Care & Quality Medewerker",
    company: "Bol.",
    location: "Utrecht",
    url: "https://partnerplatform.bol.com/nl/",
    description:
      "Vraagbaak voor complexe casussen en drijvende kracht achter procesverbeteringen die het team verder hielpen. Ik signaleerde knelpunten, realiseerde verbeteringen samen met andere afdelingen en begeleidde nieuwe collega's tijdens hun inwerktraject.",
  },
  {
    period: "apr 2022 — sep 2023",
    role: "Partner Service Medewerker",
    company: "Bol.",
    location: "Utrecht",
    url: "https://partnerplatform.bol.com/nl/",
    description:
      "Eerste lijn voor verkooppartners met complexe vragen. Hier ontwikkelde ik mijn gevoel voor patroonherkenning: welke processen lopen keer op keer vast en waarom. Dat groeide door naar een vraagbaakfunctie.",
  },
  {
    period: "feb 2018 — mrt 2022",
    role: "Teamleider",
    company: "Albert Heijn",
    location: "Hilversum",
    url: "https://www.ah.nl/",
    description:
      "Leidde een team in een van de snelste omgevingen die er zijn, de supermarkt. Schakelen, prioriteren en mensen meenemen onder constante tijdsdruk. Mijn eerste praktijkschool in procesdenken.",
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
      <a
        href={experience.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group grid grid-cols-[1fr] sm:grid-cols-[140px_1fr] gap-1 sm:gap-6 rounded-lg p-4 -mx-4 no-underline cursor-pointer transition-all duration-300 hover:bg-navy-light/50 hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.05)] hover:drop-shadow-lg"
        aria-label={`${experience.role} bij ${experience.company}`}
      >
        {/* Period */}
        <p className="text-xs font-semibold uppercase tracking-wide text-slate sm:pt-1">
          {experience.period}
        </p>

        {/* Details */}
        <div>
          <h3 className="font-heading text-base font-semibold leading-snug text-lightest group-hover:text-accent transition-colors duration-300">
            {experience.role}
            <span className="text-accent"> · </span>
            <span className="inline-flex items-center gap-1 font-medium">
              {experience.company}
              <ExternalLink
                size={12}
                className="inline-block opacity-0 -translate-y-px transition-opacity duration-300 group-hover:opacity-100"
              />
            </span>
          </h3>
          <p className="mt-1 text-xs text-slate">{experience.location}</p>

          <p className="mt-3 text-sm leading-relaxed text-slate-light">
            {experience.description}
          </p>
        </div>
      </a>
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

"use client";

import ProjectCard, { type Project } from "./ProjectCard";

const projects: Project[] = [
  {
    title: "Portfolio Website",
    description:
      "Mijn persoonlijke portfoliosite, gebouwd met Next.js 15, TypeScript en Tailwind CSS. Mijn eerste stap in publiek bouwen — en bewijs dat ik niet alleen over technologie praat.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel", "Claude Code"],
    github: "https://github.com/martijnkort7/martijnkort-portfolio",
  },
];

function PlaceholderCard({ index }: { index: number }) {
  return (
    <div className="flex items-center justify-center rounded-lg border border-dashed border-navy-lighter/50 p-8">
      <div className="text-center">
        <p className="text-sm italic text-slate">Binnenkort meer...</p>
        <p className="mt-2 text-xs text-slate/50">Het zijn roerige tijden voor tijdreizigers...</p>
      </div>
    </div>
  );
}

export default function ProjectsGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {projects.map((project, i) => (
        <ProjectCard key={project.title} project={project} index={i} />
      ))}
      <PlaceholderCard index={projects.length} />
    </div>
  );
}

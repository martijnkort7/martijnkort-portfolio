"use client";

import ProjectCard, { type Project } from "./ProjectCard";

const projects: Project[] = [
  {
    title: "Portfolio Website",
    description:
      "Mijn persoonlijke portfoliosite, gebouwd met Next.js 15, TypeScript en Tailwind CSS. Deployed via Vercel.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
    github: "https://github.com/martijnkort7/martijnkort-portfolio",
  },
];

export default function ProjectsGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {projects.map((project, i) => (
        <ProjectCard key={project.title} project={project} index={i} />
      ))}
    </div>
  );
}

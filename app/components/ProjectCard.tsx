"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";

export interface Project {
  title: string;
  description: string;
  tags: string[];
  github?: string;
  live?: string;
}

export default function ProjectCard({
  project,
  index,
}: {
  project: Project;
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
        delay: index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <div className="group rounded-lg border border-navy-light/50 bg-navy-light/20 p-5 transition-all duration-300 hover:border-accent/20 hover:bg-navy-light/50 hover:shadow-[0_0_20px_rgba(100,255,218,0.04)]">
        {/* Header with links */}
        <div className="mb-3 flex items-start justify-between">
          <h3 className="font-heading text-lg font-semibold text-lightest transition-colors duration-300 group-hover:text-accent">
            {project.title}
          </h3>
          <div className="flex items-center gap-3">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate transition-colors duration-200 hover:text-accent"
                aria-label={`GitHub repository van ${project.title}`}
              >
                <Github size={18} />
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate transition-colors duration-200 hover:text-accent"
                aria-label={`Live demo van ${project.title}`}
              >
                <ExternalLink size={18} />
              </a>
            )}
          </div>
        </div>

        {/* Description */}
        <p className="mb-4 text-sm leading-relaxed text-slate-light">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

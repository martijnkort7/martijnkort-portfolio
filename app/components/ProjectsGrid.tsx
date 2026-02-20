import { readFileSync } from "fs";
import { join } from "path";
import ProjectCard, { type Project } from "./ProjectCard";
import { ExternalLink } from "lucide-react";

interface RepoData {
  name: string;
  description: string | null;
  readme_summary: string | null;
  url: string;
  language: string | null;
  languages: string[];
  topics: string[];
  stars: number;
  updated_at: string;
  pushed_at: string;
  recently_active: boolean;
}

function repoToProject(repo: RepoData): Project {
  return {
    title: repo.name,
    description:
      repo.readme_summary || repo.description || "Geen beschrijving beschikbaar.",
    languages: repo.languages || [],
    topics: repo.topics || [],
    github: repo.url,
  };
}

function loadRepos(): Project[] {
  try {
    const filePath = join(process.cwd(), "app", "data", "repos.json");
    const raw = readFileSync(filePath, "utf-8");
    const repos: RepoData[] = JSON.parse(raw);

    return repos
      .sort(
        (a, b) =>
          new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime()
      )
      .slice(0, 6)
      .map(repoToProject);
  } catch {
    return [];
  }
}

export default function ProjectsGrid() {
  const projects = loadRepos();

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-2">
        {projects.map((project, i) => (
          <ProjectCard key={project.title} project={project} index={i} />
        ))}
        {projects.length < 6 && (
          <div className="flex items-center justify-center rounded-lg border border-dashed border-navy-lighter/50 p-8">
            <div className="text-center">
              <p className="text-sm italic text-slate">Binnenkort meer...</p>
              <p className="mt-2 text-xs text-slate/50">
                Het zijn roerige tijden voor tijdreizigers...
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="mt-8 text-center">
        <a
          href="https://github.com/martijnkort7"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-heading text-sm font-medium text-slate-light transition-colors duration-300 hover:text-accent"
        >
          Bekijk alle projecten op GitHub
          <ExternalLink size={14} />
        </a>
      </div>
    </div>
  );
}

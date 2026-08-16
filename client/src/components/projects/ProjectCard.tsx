import { Link } from "wouter";
import type { ProjectEntry } from "@/data/projects";

type ProjectCardProps = {
  project: ProjectEntry;
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="flex h-full flex-col border border-border bg-card p-5 transition-colors hover:border-foreground/40">
      <header className="mb-3 flex items-baseline justify-between gap-2">
        <h3 className="font-display text-lg font-semibold">{project.name}</h3>
      </header>

      {project.description ? (
        <p className="text-sm leading-relaxed text-muted-foreground">{project.description}</p>
      ) : (
        /* Deliberately empty: real copy is pending from the owner (PLAN.md §2, item #2). */
        <p className="text-sm text-muted-foreground/60">
          &gt; cat {project.slug}.md … write-up in progress
        </p>
      )}

      {project.stack.length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground/80">
          {project.stack.map((tech) => (
            <li key={tech}>{tech}</li>
          ))}
        </ul>
      )}

      <div className="mt-auto flex gap-4 pt-4 text-sm">
        {project.links?.repo && (
          <a
            href={project.links.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 hover:text-muted-foreground"
          >
            repo
          </a>
        )}
        {project.links?.demo && (
          <a
            href={project.links.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 hover:text-muted-foreground"
          >
            demo
          </a>
        )}
        {project.playRoute && (
          <Link href={project.playRoute}>
            <a className="underline underline-offset-4 hover:text-muted-foreground">
              ▶ play a tiny tribute
            </a>
          </Link>
        )}
      </div>
    </article>
  );
}

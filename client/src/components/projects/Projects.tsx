import { SectionHeading } from "@/components/terminal/SectionHeading";
import { ProjectCard } from "./ProjectCard";
import { projects } from "@/data/projects";

export default function Projects() {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="container scroll-mt-14 py-24">
      <SectionHeading command="ls projects/ --featured" title="Projects" />
      <div className="grid gap-6 sm:grid-cols-2">
        {featured.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {rest.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </section>
  );
}

import { projects } from "@/content/projects";
import { Section } from "@/components/ui/Section";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ProjectCard } from "@/components/ui/ProjectCard";

export function Projects() {
  const featured = projects.filter((p) => p.featured ?? true);

  return (
    <Section id="projects" wide>
      <SectionLabel>Selected work</SectionLabel>

      <div>
        {featured.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </Section>
  );
}

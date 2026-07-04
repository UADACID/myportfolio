import { skills } from "@/content/skills";
import { Section } from "@/components/ui/Section";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function Skills() {
  return (
    <Section id="skills">
      <SectionLabel>Skills</SectionLabel>

      <dl className="divide-y divide-border/50">
        {skills.map((group) => (
          <div
            key={group.category}
            className="grid gap-2 py-5 sm:grid-cols-[140px_1fr] sm:gap-8"
          >
            <dt className="text-sm text-muted-foreground">{group.category}</dt>
            <dd className="text-[15px] leading-7 text-foreground">
              {group.items.join(" · ")}
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}

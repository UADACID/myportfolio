import { experience } from "@/content/experience";
import { Section } from "@/components/ui/Section";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ExperienceItem } from "@/components/ui/ExperienceItem";

export function Experience() {
  return (
    <Section id="experience">
      <SectionLabel>Experience</SectionLabel>

      <ol className="list-none">
        {experience.map((item, index) => (
          <ExperienceItem
            key={`${item.company}-${item.period}`}
            item={item}
            isLast={index === experience.length - 1}
          />
        ))}
      </ol>
    </Section>
  );
}

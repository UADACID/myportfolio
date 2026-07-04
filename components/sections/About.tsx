import { site } from "@/content/site";
import { Section } from "@/components/ui/Section";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function About() {
  return (
    <Section id="about">
      <SectionLabel>About</SectionLabel>

      <div className="space-y-5">
        {site.bio.map((paragraph) => (
          <p
            key={paragraph.slice(0, 40)}
            className="text-[15px] leading-7 text-muted"
          >
            {paragraph}
          </p>
        ))}
      </div>
    </Section>
  );
}

import { site } from "@/content/site";
import { Section } from "@/components/ui/Section";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { TextLink } from "@/components/ui/TextLink";

export function Contact() {
  return (
    <Section id="contact">
      <SectionLabel>Contact</SectionLabel>

      <div className="space-y-6">
        <p className="text-2xl font-medium tracking-tight text-foreground sm:text-3xl">
          Let&apos;s work together.
        </p>

        <div className="flex flex-col gap-4">
          <TextLink href={`mailto:${site.email}`}>{site.email}</TextLink>
          {site.social.map((link) => (
            <TextLink
              key={link.label}
              href={link.href}
              external={link.icon !== "mail"}
            >
              {link.label}
            </TextLink>
          ))}
        </div>
      </div>
    </Section>
  );
}

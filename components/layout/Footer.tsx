import { site } from "@/content/site";
import { PuzzleEdge } from "@/components/ui/PuzzleEdge";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-[16] overflow-visible py-8">
      <PuzzleEdge fill="var(--background)" variant={5} />
      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-6 text-sm text-muted sm:flex-row">
        <p>
          © {year} {site.name}. All rights reserved.
        </p>
        <p className="font-mono text-xs text-muted-foreground">
          Built with Next.js & Tailwind
        </p>
      </div>
    </footer>
  );
}

import { site } from "@/content/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border py-8">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-6 text-sm text-muted sm:flex-row">
        <p>© {year} {site.name}. All rights reserved.</p>
        <p className="font-mono text-xs text-muted-foreground">
          Built with Next.js & Tailwind
        </p>
      </div>
    </footer>
  );
}

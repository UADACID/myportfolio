import { site } from "@/content/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border py-8">
      <div className="mx-auto max-w-5xl px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted">
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

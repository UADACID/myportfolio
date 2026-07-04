import { site } from "@/content/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/50 py-8">
      <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-2 px-6 sm:flex-row sm:items-center">
        <p className="text-xs text-muted-foreground">
          © {year} {site.name}
        </p>
        <p className="text-xs text-muted-foreground">Next.js · Vercel</p>
      </div>
    </footer>
  );
}

# Portfolio Website

A minimal, modern portfolio built with Next.js, Tailwind CSS, and Framer Motion. Features dark/light theme support, subtle scroll animations, and one-click Vercel deployment.

## Tech Stack

- **Next.js 16** (App Router)
- **Tailwind CSS v4**
- **Framer Motion** — scroll reveals & micro-interactions
- **next-themes** — dark/light/system theme
- **Lucide React** — icons

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Editing Content

All portfolio content lives in typed data files under `content/`:

| File | What to edit |
|------|-------------|
| `content/site.ts` | Name, role, tagline, bio, email, social links, nav |
| `content/skills.ts` | Skill categories and items |
| `content/projects.ts` | Project cards (title, description, tech, links) |
| `content/experience.ts` | Work history timeline |

No need to touch components — just update these files and redeploy.

## Deploy to Vercel

1. Push this repo to GitHub
2. Go to [vercel.com/new](https://vercel.com/new) and import the repository
3. Vercel auto-detects Next.js — click **Deploy**
4. (Optional) Add a custom domain in Project Settings → Domains

Every push to `main` triggers a production deploy. Pull requests get preview URLs automatically.

## Project Structure

```
app/                  # Next.js App Router pages & layout
components/
  layout/             # Navbar, Footer, ThemeToggle
  sections/           # Hero, About, Skills, Projects, Experience, Contact
  ui/                 # Reusable UI (SectionHeading, ProjectCard, etc.)
content/              # Portfolio data (edit these!)
lib/                  # Animation variants
public/               # Static assets (avatar, images)
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## Customization

- **Accent color**: Edit CSS variables in `app/globals.css` (`--accent`)
- **Fonts**: Configured in `app/layout.tsx` via `next/font`
- **Metadata/SEO**: Update `metadata` export in `app/layout.tsx` and URLs in `app/sitemap.ts` / `app/robots.ts`

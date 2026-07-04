export const site = {
  name: "Pratama Setya Aji",
  role: "Mobile & Full Stack Engineer",
  tagline:
    "I build mobile products end to end — from Figma pixels to production on GCP.",
  email: "pratamasetya99@gmail.com",
  location: "Yogyakarta, Indonesia",
  available: true,
  bio: [
    "Eight years shipping cross-platform mobile and web apps with React Native, Flutter, TypeScript, and Firebase. I work across the stack — UI, APIs, real-time systems, and cloud infrastructure.",
    "B.S. Software Engineering, Universitas Ahmad Dahlan. Currently leading the Indonesian engineering team at Corom Music Entertainment, Tokyo.",
  ],
  nav: [
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Work", href: "#projects" },
    { label: "Experience", href: "#experience" },
    { label: "Contact", href: "#contact" },
  ],
  social: [
    {
      label: "GitHub",
      href: "https://github.com/uadacid",
      icon: "github" as const,
    },
    {
      label: "Email",
      href: "mailto:pratamasetya99@gmail.com",
      icon: "mail" as const,
    },
  ],
} as const;

export type Project = {
  title: string;
  description: string;
  tech: string[];
  github?: string;
  live?: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    title: "Chat Application Platform",
    description:
      "Architected and developed a chat application with real-time messaging, project management features, and scalable backend infrastructure.",
    tech: ["Meteor.js", "React Native", "MongoDB"],
    featured: true,
  },
  {
    title: "Cross-Platform Mobile Apps",
    description:
      "Delivered multiple mobile applications in collaboration with Product and UI/UX teams. Built scalable architectures, reusable component libraries, and mentored developers to accelerate delivery.",
    tech: ["React Native", "Flutter", "TypeScript"],
    featured: true,
  },
  {
    title: "React Native to Flutter Migration",
    description:
      "Led the complete migration of a core mobile application from React Native to Flutter, rebuilding the platform from scratch with improved performance and maintainability.",
    tech: ["Flutter", "React Native", "Dart"],
    featured: true,
  },
  {
    title: "Enterprise Mobile Products",
    description:
      "Built and maintained production mobile software products for enterprise clients, focusing on reliability, performance, and long-term maintainability.",
    tech: ["React Native", "JavaScript", "REST APIs"],
    featured: true,
  },
];

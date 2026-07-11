export type Project = {
  title: string;
  description: string;
  tech: string[];
  image?: string;
  github?: string;
  live?: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    title: "Corom — Live Venue Platform",
    description:
      "Corom lets anyone create their own personal online live venue with real-time chat, emoji reactions, and interactive mini-games. I own backend infrastructure on Google Cloud Platform and lead the Indonesian engineering team, turning product ideas into reliable, scalable experiences end to end.",
    tech: ["React Native", "Google Cloud", "iOS", "Android"],
    image: "/projects/corom/cover.png",
    featured: true,
  },
  {
    title: "Cicle — Management Tools",
    description:
      "Team management and collaboration app with real-time chat, task boards, schedules, and file sharing. Built with Firebase Firestore, Socket.io, Cloud Storage, OneSignal push notifications, Google Sign-In, and GetX state management.",
    tech: [
      "React Native",
      "Flutter",
      "Firebase",
      "Socket.io",
      "OneSignal",
      "GetX",
      "Dio",
    ],
    image: "/projects/cicle/cover.png",
    featured: true,
  },
  {
    title: "Alfamind — E-commerce App",
    description:
      "E-commerce mobile app where I sliced Figma designs into React Native and integrated backend APIs. Owned the transaction, shipping, and account modules with Redux state management, Firebase push notifications, Cloud Storage, Socket.io, Google Sign-In, and Axios.",
    tech: [
      "React Native",
      "Redux",
      "Firebase",
      "Socket.io",
      "Axios",
      "API Integration",
    ],
    image: "/projects/alfamind/cover.png",
    featured: true,
  },
  {
    title: "Zipkos — Property Application",
    description:
      "Property rental app for finding and booking rooms and spaces. I sliced Figma designs into React Native for iOS and Android and integrated backend APIs for listings, maps, and user flows.",
    tech: ["React Native", "iOS", "Android", "API Integration"],
    image: "/projects/zipkos/cover.png",
    featured: true,
  },
  {
    title: "MusikBagus — Music Application",
    description:
      "Music platform app featuring releases, events, and artist content. I migrated the codebase from React Native to Flutter and connected the app to backend services through REST APIs, working in an agile Scrum workflow.",
    tech: ["Flutter", "Dart", "React Native", "API Integration", "Scrum"],
    image: "/projects/musikbagus/cover.png",
    featured: true,
  },
];

/** The single project spotlighted in the Hero right column. */
export const featuredProject = projects.find((p) => p.featured) ?? projects[0];

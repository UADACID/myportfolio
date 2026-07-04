export type SkillGroup = {
  category: string;
  items: string[];
};

export const skills: SkillGroup[] = [
  {
    category: "Mobile",
    items: [
      "React Native",
      "Flutter",
      "Mobile Architecture",
      "Performance Optimization",
    ],
  },
  {
    category: "Engineering",
    items: ["TypeScript", "Firebase", "System Design", "Product Development"],
  },
  {
    category: "Leadership",
    items: [
      "Technical Leadership",
      "Cross-functional Collaboration",
      "Mentoring",
      "Project Management",
    ],
  },
  {
    category: "Languages",
    items: ["English"],
  },
];

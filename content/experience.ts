export type Experience = {
  company: string;
  role: string;
  period: string;
  location?: string;
  summary: string;
};

export const experience: Experience[] = [
  {
    company: "Corom Music Entertainment",
    role: "Remote Software Engineer",
    period: "Jun 2023 — Present",
    location: "Shibuya-ku, Tokyo",
    summary:
      "Shipping fullstack products across web, Android, and iOS for a Tokyo-based music entertainment company. I own backend infrastructure on Google Cloud Platform and lead the Indonesian engineering team, turning product ideas into reliable, scalable experiences end to end.",
  },
  {
    company: "Cilsy Fiolution",
    role: "Remote Lead Mobile Developer",
    period: "Feb 2021 — Nov 2022",
    location: "Bandung, Indonesia",
    summary:
      "Led the migration of the core mobile application from React Native to Flutter. Rebuilt the platform from scratch and guided technical decisions for the new codebase.",
  },
  {
    company: "Meteor Inovasi Digital",
    role: "React Native Developer",
    period: "May 2018 — Jan 2021",
    location: "Tangerang Selatan, Indonesia",
    summary:
      "Collaborated with Product and UI/UX teams to deliver mobile applications using React Native and Flutter. Built scalable architectures, reusable components, and mentored developers across multiple projects.",
  },
  {
    company: "PT. Interkoneksi Multitekno",
    role: "Mobile Developer",
    period: "Aug 2017 — Dec 2017",
    location: "Jakarta Utara, Indonesia",
    summary:
      "Built and maintained production mobile software products with React Native, focusing on stability and performance for client deployments.",
  },
  {
    company: "DeveloperCybermantra",
    role: "Fullstack Developer",
    period: "Nov 2016 — Aug 2017",
    location: "Yogyakarta, Indonesia",
    summary:
      "Developed chat application architecture and project management features using Meteor.js and React Native. Handled end-to-end development from backend services to the mobile client.",
  },
];

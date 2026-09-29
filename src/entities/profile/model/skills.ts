import type { Skill, SkillLevel } from "./skill-types";

export const skillLevels: SkillLevel[] = ["daily", "confident", "familiar"];

export const skills: Skill[] = [
  { name: "Vue 3", level: "daily" },
  { name: "TypeScript", level: "daily" },
  { name: "Tailwind CSS", level: "daily" },
  { name: "Pinia", level: "daily" },
  { name: "Vue Router", level: "daily" },
  { name: "Vite", level: "daily" },
  { name: "OpenLayers", level: "daily" },
  { name: "deck.gl", level: "daily" },
  { name: "WebSockets", level: "daily" },
  { name: "REST API", level: "daily" },
  { name: "React", level: "confident" },
  { name: "Next.js", level: "confident" },
  { name: "React Three Fiber", level: "confident" },
  { name: "Three.js", level: "confident" },
  { name: "GSAP", level: "confident" },
  { name: "Feature-Sliced Design", level: "confident" },
  { name: "next-intl", level: "confident" },
  { name: "Vitest", level: "confident" },
  { name: "GitHub Actions", level: "confident" },
  { name: "Sentry", level: "confident" },
];

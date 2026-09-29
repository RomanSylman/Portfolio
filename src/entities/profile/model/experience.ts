import type { ExperienceEntry } from "./experience-types";

export const profile = {
  name: "Roman Sylman",
} as const;

export const experience: ExperienceEntry[] = [
  {
    id: "antenor",
    company: "Antenor",
    period: { start: "2023", end: null },
  },
  {
    id: "maxopen",
    company: "Maxopen",
  },
];

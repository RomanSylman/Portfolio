export type SkillLevel = "daily" | "confident" | "familiar";

export interface Skill {
  name: string;
  level: SkillLevel;
}

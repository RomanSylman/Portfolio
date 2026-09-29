export interface ExperienceEntry {
  id: string;
  company: string;
  period?: {
    start: string;
    end: string | null;
  };
}

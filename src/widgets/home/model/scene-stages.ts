export interface SceneStage {
  id: string;
  color: string;
}

export const sceneStages = [
  { id: "hero", color: "#7c9cff" },
  { id: "about", color: "#67e8f9" },
  { id: "skills", color: "#a78bfa" },
  { id: "experience", color: "#fbbf24" },
  { id: "projects", color: "#34d399" },
  { id: "contact", color: "#fb7185" },
] as const satisfies readonly SceneStage[];

export const STAGE_COUNT = sceneStages.length;

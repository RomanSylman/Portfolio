import type { Project } from "./types";

export const projects: Project[] = [
  {
    slug: "fleet-telematics",
    stack: [
      "Vue 3",
      "TypeScript",
      "Pinia",
      "OpenLayers",
      "deck.gl",
      "WebSockets",
    ],
    image: "/projects/fleet-map.svg",
  },
  {
    slug: "portfolio",
    stack: ["Next.js", "React Three Fiber", "GSAP", "TypeScript"],
    image: "/projects/portfolio.svg",
  },
];

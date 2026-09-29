import { useMemo, useState } from "react";
import { BufferAttribute, BufferGeometry, Color } from "three";

import { getShapeTargets, PARTICLE_COUNT } from "./shapes";

export function useParticleGeometry() {
  const [geometry] = useState(() => {
    const targets = getShapeTargets();
    const geometry = new BufferGeometry();

    targets.forEach((target, index) => {
      geometry.setAttribute(
        `aTarget${String(index)}`,
        new BufferAttribute(target, 3),
      );
    });

    const random = new Float32Array(PARTICLE_COUNT);
    const scatter = new Float32Array(PARTICLE_COUNT * 3);
    for (let index = 0; index < PARTICLE_COUNT; index += 1) {
      const raw = Math.sin(index * 12.9898) * 43758.5453;
      const unit = raw - Math.floor(raw);
      random[index] = unit;

      const z = 1 - (index / (PARTICLE_COUNT - 1)) * 2;
      const ring = Math.sqrt(Math.max(1 - z * z, 0));
      const theta = index * 2.399963;
      const spread = 6 + unit * 3;
      scatter[index * 3] = Math.cos(theta) * ring * spread;
      scatter[index * 3 + 1] = z * spread;
      scatter[index * 3 + 2] = Math.sin(theta) * ring * spread;
    }
    const basePositions = targets[0];
    if (basePositions) {
      geometry.setAttribute("position", new BufferAttribute(basePositions, 3));
    }
    geometry.setAttribute("aRandom", new BufferAttribute(random, 1));
    geometry.setAttribute("aScatter", new BufferAttribute(scatter, 3));

    return geometry;
  });

  return geometry;
}

export type StageColor = Color;

export function useStageColors() {
  return useMemo(
    () => [
      new Color("#7c9cff"),
      new Color("#67e8f9"),
      new Color("#a78bfa"),
      new Color("#fbbf24"),
      new Color("#34d399"),
      new Color("#fb7185"),
    ],
    [],
  );
}

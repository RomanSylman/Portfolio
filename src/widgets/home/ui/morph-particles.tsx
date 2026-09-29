"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { AdditiveBlending, Color, type ShaderMaterial, Vector3 } from "three";

import { damp } from "@/shared/lib/damp";
import { useScrollStore } from "@/shared/lib/scroll";
import { usePointerStore } from "@/shared/lib/webgl";

import { useIntroStore } from "../model/intro-store";
import {
  type StageColor,
  useParticleGeometry,
  useStageColors,
} from "../model/sample-shape";
import fragmentShader from "../shaders/particles.frag";
import vertexShader from "../shaders/particles.vert";

const POINTER_PLANE_Z = 0;
const CAMERA_Z = 6;
const FOV_HALF_RAD = (45 * Math.PI) / 360;
const DESKTOP_BREAKPOINT = 1024;
const DESKTOP_OFFSET = 0.22;

export function MorphParticles() {
  const geometry = useParticleGeometry();
  const colors: readonly StageColor[] = useStageColors();
  const smoothed = useRef({ stage: 0, x: 0, y: 0 });

  const materialRef = useRef<ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      uStage: { value: 0 },
      uIntro: { value: 0 },
      uMouse: { value: new Vector3() },
      uRepelStrength: { value: 0.85 },
      uTime: { value: 0 },
      uSize: { value: 80 },
      uPixelRatio: { value: 1 },
      uColor: { value: new Color("#7c9cff") },
      uOpacity: { value: 0.95 },
      uGlow: { value: 0.85 },
    }),
    [],
  );

  useFrame(({ clock, size, gl }, delta) => {
    const targetStage = useScrollStore.getState().stage;
    const pointer = usePointerStore.getState();
    const state = smoothed.current;

    damp(state, "stage", targetStage, 0.3, delta);
    damp(state, "x", pointer.x, 0.25, delta);
    damp(state, "y", pointer.y, 0.25, delta);

    const viewHeight =
      Math.tan(FOV_HALF_RAD) * (CAMERA_Z - POINTER_PLANE_Z) * 2;
    const viewWidth = viewHeight * (size.width / size.height);

    const live = materialRef.current?.uniforms;
    if (!live) return;

    const stage = live.uStage;
    const intro = live.uIntro;
    const time = live.uTime;
    const mouse = live.uMouse;
    const color = live.uColor;
    const pixelRatio = live.uPixelRatio;
    const opacity = live.uOpacity;
    if (
      !stage ||
      !intro ||
      !time ||
      !mouse ||
      !color ||
      !pixelRatio ||
      !opacity
    ) {
      return;
    }

    stage.value = state.stage;
    intro.value = useIntroStore.getState().progress;
    time.value = clock.elapsedTime;
    const desktop = size.width >= DESKTOP_BREAKPOINT;
    pixelRatio.value = gl.getPixelRatio();
    opacity.value = desktop ? 0.95 : 0.55;
    (mouse.value as Vector3).set(
      (state.x * viewWidth) / 2 - (desktop ? viewWidth * DESKTOP_OFFSET : 0),
      (state.y * viewHeight) / 2,
      0,
    );

    const base = Math.min(Math.floor(state.stage), colors.length - 1);
    const next = Math.min(base + 1, colors.length - 1);
    const from = colors[base];
    const to = colors[next];
    if (from && to) {
      (color.value as Color).copy(from).lerp(to, state.stage - base);
    }
  });

  return (
    <points geometry={geometry} frustumCulled={false}>
      <shaderMaterial
        ref={materialRef}
        args={[{ uniforms }]}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        depthWrite={false}
        blending={AdditiveBlending}
      />
    </points>
  );
}

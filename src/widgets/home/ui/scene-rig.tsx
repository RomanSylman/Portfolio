"use client";

import { useFrame } from "@react-three/fiber";
import { type ReactNode, useRef } from "react";
import { type Group } from "three";

import { damp } from "@/shared/lib/damp";
import { usePointerStore } from "@/shared/lib/webgl";

const DESKTOP_BREAKPOINT = 1024;
const CAMERA_Z = 6;
const FOV_HALF_RAD = (45 * Math.PI) / 360;

interface SceneRigProps {
  children: ReactNode;
}

export function SceneRig({ children }: SceneRigProps) {
  const group = useRef<Group>(null);
  const motion = useRef({ x: 0, rotX: 0, influence: 0, scale: 1, spin: 0 });

  useFrame(({ size }, delta) => {
    const node = group.current;
    if (!node) return;

    const pointer = usePointerStore.getState();
    const wide = size.width >= DESKTOP_BREAKPOINT;
    const viewHeight = Math.tan(FOV_HALF_RAD) * CAMERA_Z * 2;
    const viewWidth = viewHeight * (size.width / Math.max(size.height, 1));
    const state = motion.current;

    state.spin += delta * 0.12;
    damp(state, "x", wide ? viewWidth * 0.22 : 0, 0.45, delta);
    damp(state, "rotX", -pointer.y * 0.18, 0.3, delta);
    damp(state, "influence", pointer.x * 0.25, 0.3, delta);
    damp(state, "scale", wide ? 1 : 0.75, 0.45, delta);

    node.position.x = state.x;
    node.rotation.x = state.rotX;
    node.rotation.y = state.spin + state.influence;
    node.scale.setScalar(state.scale);
  });

  return <group ref={group}>{children}</group>;
}

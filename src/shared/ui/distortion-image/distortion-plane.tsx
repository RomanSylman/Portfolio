"use client";

import { useTexture } from "@react-three/drei";
import { type ThreeEvent, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef, useState } from "react";
import { type Mesh, type ShaderMaterial, Vector2 } from "three";

import { damp } from "@/shared/lib/damp";
import { usePageTransitionStore } from "@/shared/lib/page-transition";

import fragmentShader from "./shaders/distortion.frag";
import vertexShader from "./shaders/distortion.vert";

interface DistortionPlaneProps {
  src: string;
}

function coverScale(planeAspect: number, imageAspect: number) {
  if (imageAspect <= 0) return new Vector2(1, 1);
  if (planeAspect > imageAspect) {
    return new Vector2(1, imageAspect / planeAspect);
  }
  return new Vector2(planeAspect / imageAspect, 1);
}

export function DistortionPlane({ src }: DistortionPlaneProps) {
  const texture = useTexture(src);
  const viewport = useThree((state) => state.viewport);
  const [hovered, setHovered] = useState(false);
  const pointer = useRef(new Vector2(0.5, 0.5));
  const hover = useRef({ value: 0 });
  const materialRef = useRef<ShaderMaterial>(null);
  const meshRef = useRef<Mesh>(null);

  const image = texture.image as { width?: number; height?: number };
  const imageAspect =
    image.width && image.height ? image.width / image.height : 1;
  const planeAspect =
    viewport.height > 0 ? viewport.width / viewport.height : 1;

  const uniforms = useMemo(
    () => ({
      uTexture: { value: texture },
      uPointer: { value: new Vector2(0.5, 0.5) },
      uCover: { value: new Vector2(1, 1) },
      uHover: { value: 0 },
      uTime: { value: 0 },
    }),
    [texture],
  );

  useFrame(({ clock }, delta) => {
    if (meshRef.current) {
      meshRef.current.visible =
        usePageTransitionStore.getState().progress === 0;
    }

    damp(hover.current, "value", hovered ? 1 : 0, 0.2, delta);

    const live = materialRef.current?.uniforms;
    if (!live) return;

    const hoverUniform = live.uHover;
    const timeUniform = live.uTime;
    const pointerUniform = live.uPointer;
    const coverUniform = live.uCover;
    if (!hoverUniform || !timeUniform || !pointerUniform || !coverUniform)
      return;

    hoverUniform.value = hover.current.value;
    timeUniform.value = clock.elapsedTime;
    (pointerUniform.value as Vector2).lerp(pointer.current, 0.15);
    (coverUniform.value as Vector2).copy(coverScale(planeAspect, imageAspect));
  });

  const onPointerMove = (event: ThreeEvent<PointerEvent>) => {
    if (!event.uv) return;
    pointer.current.set(event.uv.x, event.uv.y);
  };

  return (
    <mesh
      ref={meshRef}
      onPointerOver={() => {
        setHovered(true);
      }}
      onPointerOut={() => {
        setHovered(false);
      }}
      onPointerMove={onPointerMove}
    >
      <planeGeometry args={[viewport.width, viewport.height, 32, 32]} />
      <shaderMaterial
        ref={materialRef}
        args={[{ uniforms }]}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
      />
    </mesh>
  );
}

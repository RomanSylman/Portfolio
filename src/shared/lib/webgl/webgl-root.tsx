"use client";

import { PerformanceMonitor, View } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useState } from "react";

import { usePointerTracking } from "./use-pointer-tracking";

const MOBILE_BREAKPOINT = 768;
const DESKTOP_DPR: [number, number] = [1, 2];
const MOBILE_DPR: [number, number] = [1, 1.5];

function isMobileViewport() {
  return typeof window !== "undefined" && window.innerWidth < MOBILE_BREAKPOINT;
}

export function WebGLRoot() {
  usePointerTracking();
  const [dpr, setDpr] = useState<[number, number]>(() =>
    isMobileViewport() ? MOBILE_DPR : DESKTOP_DPR,
  );

  return (
    <div data-transition-keep className="pointer-events-none fixed inset-0 z-0">
      <Canvas
        className="pointer-events-none"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
        eventSource={
          typeof document !== "undefined" ? document.body : undefined
        }
        dpr={dpr}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: "high-performance",
        }}
        camera={{ position: [0, 0, 6], fov: 45 }}
      >
        <View.Port />
        <PerformanceMonitor
          onDecline={() => {
            setDpr(MOBILE_DPR);
          }}
          onIncline={() => {
            setDpr(isMobileViewport() ? MOBILE_DPR : DESKTOP_DPR);
          }}
        />
      </Canvas>
    </div>
  );
}

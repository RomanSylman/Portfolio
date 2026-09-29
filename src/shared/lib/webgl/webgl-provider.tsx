"use client";

import dynamic from "next/dynamic";
import { type ReactNode } from "react";

import { useReducedMotion } from "@/shared/lib/use-reduced-motion";

import { WebGLContext } from "./webgl-context";

const WebGLRoot = dynamic(
  () => import("./webgl-root").then((module) => module.WebGLRoot),
  { ssr: false },
);

interface WebGLProviderProps {
  children: ReactNode;
}

export function WebGLProvider({ children }: WebGLProviderProps) {
  const reducedMotion = useReducedMotion();

  return (
    <WebGLContext value={!reducedMotion}>
      {children}
      {!reducedMotion && <WebGLRoot />}
    </WebGLContext>
  );
}

"use client";

import { createContext, use } from "react";

const WebGLContext = createContext(true);

export function useWebGLEnabled() {
  return use(WebGLContext);
}

export { WebGLContext };

import type { ReactNode } from "react";

import { SmoothScrollProvider } from "@/shared/lib/scroll";
import { WebGLProvider } from "@/shared/lib/webgl";
import { CustomCursor } from "@/shared/ui/custom-cursor";
import { TransitionOverlay } from "@/shared/ui/transition-overlay";

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <SmoothScrollProvider>
      <WebGLProvider>
        <CustomCursor />
        <TransitionOverlay />
        {children}
      </WebGLProvider>
    </SmoothScrollProvider>
  );
}

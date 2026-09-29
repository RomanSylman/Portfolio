import type { ReactNode } from "react";

import { cn } from "@/shared/lib/cn";
import { RevealText } from "@/shared/ui/reveal-text";

interface HeadingProps {
  eyebrow?: string;
  children: ReactNode;
  className?: string;
}

export function Heading({ eyebrow, children, className }: HeadingProps) {
  return (
    <div className={cn("mb-10", className)}>
      {eyebrow !== undefined && (
        <RevealText
          as="p"
          className="text-accent mb-3 text-sm font-medium tracking-[0.2em] uppercase"
        >
          {eyebrow}
        </RevealText>
      )}
      {typeof children === "string" ? (
        <RevealText
          as="h2"
          className="text-foreground text-4xl font-semibold tracking-tight sm:text-5xl"
        >
          {children}
        </RevealText>
      ) : (
        <h2 className="text-foreground text-4xl font-semibold tracking-tight sm:text-5xl">
          {children}
        </h2>
      )}
    </div>
  );
}

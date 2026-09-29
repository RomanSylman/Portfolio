import type { ReactNode } from "react";

import { cn } from "@/shared/lib/cn";

interface SectionProps {
  id: string;
  children: ReactNode;
  className?: string;
}

export function Section({ id, children, className }: SectionProps) {
  return (
    <section
      id={id}
      data-stage={id}
      className={cn(
        "relative flex min-h-screen flex-col justify-center py-24",
        className,
      )}
    >
      {children}
    </section>
  );
}

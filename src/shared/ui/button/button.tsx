import type { ComponentProps } from "react";

import { cn } from "@/shared/lib/cn";
import { Magnetic } from "@/shared/ui/magnetic";

type ButtonVariant = "primary" | "ghost";

interface ButtonProps extends ComponentProps<"a"> {
  variant?: ButtonVariant;
}

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-accent text-background hover:bg-accent-strong focus-visible:outline-accent",
  ghost:
    "border border-line text-foreground hover:border-accent hover:text-accent focus-visible:outline-accent",
};

export function Button({
  variant = "primary",
  className,
  ...props
}: ButtonProps) {
  return (
    <Magnetic>
      <a
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2",
          variants[variant],
          className,
        )}
        {...props}
      />
    </Magnetic>
  );
}

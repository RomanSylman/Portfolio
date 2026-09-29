"use client";

import { useCallback, useState } from "react";

/**
 * A ref callback that also exposes the element through state, so children can
 * render conditionally once the tracked DOM node exists.
 */
export function useElementRef<T extends HTMLElement>() {
  const [element, setElement] = useState<T | null>(null);

  const ref = useCallback((node: T | null) => {
    setElement(node);
  }, []);

  return [ref, element] as const;
}

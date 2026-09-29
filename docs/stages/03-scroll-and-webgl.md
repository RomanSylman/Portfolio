# Stage 03: Scroll tracking and the shared WebGL canvas

## Goal

Smooth scrolling that reports its position, and one WebGL context for the whole
page.

## What was done

- `SmoothScrollProvider` runs Lenis from the GSAP ticker and maintains a
  ScrollTrigger that writes `progress` and a fractional `stage` into a Zustand
  store.
- `WebGLRoot` renders a single fixed canvas with a `View.Port`, adaptive device
  pixel ratio and a performance monitor that lowers the pixel ratio under load.
- `WebGLProvider` mounts the canvas client-side only and skips it when the user
  prefers reduced motion.
- A pointer store records the cursor in normalized coordinates for the scene.

## Decisions

- [ADR 0003](../adr/0003-single-webgl-canvas-with-views.md).

## How to verify

```bash
pnpm dev
```

Scrolling is smoothed, and exactly one `<canvas>` appears in the document.

## Notes

`prefers-reduced-motion` is read through `useSyncExternalStore` rather than an
effect, which avoids an extra render and satisfies the React hooks lint rules.

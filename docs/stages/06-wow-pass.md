# Stage 06: Wow pass

## Goal

Make the scene react to the cursor, start from a clean sphere, and add the
intro, text motion, glow, custom cursor and project screenshots that the first
build was missing.

## What landed

- Pointer tracking listens on `window`. The canvas is
  `pointer-events: none`, so the previous `onPointerMove` on `<Canvas>` never
  ran and the pointer store stayed at `0, 0`.
- The canvas container is positioned with an inline style. React Three Fiber
  sets `position: relative` inline, which was beating the `fixed inset-0`
  class and leaving the canvas 150px tall at the bottom of the page.
- `body` is a stacking context. The canvas uses `z-index: 0` and the home
  `<main>` uses `z-index: 10`, so particles sit above the page background and
  below the copy.
- `View` outside the canvas ignores a passed `track` ref and renders its own
  element. That element has to carry the size (`fixed inset-0` for the scene,
  `absolute inset-0` for a card). The scene view also gets its own
  `PerspectiveCamera`, because the portal camera otherwise stays at the origin.
- Shader sources are TypeScript string modules. Turbopack was dropping the
  `.glsl` imports, so the material compiled as an empty program and drew
  nothing.
- Stage tracking moved from the global scroll provider into `useStageTracker`,
  mounted by the home scene. Section positions are cached until
  `ScrollTrigger.refresh`. The probe is the top of the viewport, so the hero
  starts at stage `0`. Returning from a case study remounts the tracker and
  picks up the home sections again.
- Particle size uses the device pixel ratio and a larger base size. `aRandom`
  is kept in `[0, 1)`. An `aScatter` attribute holds the intro cloud.
- `SceneRig` places the group to the right of the copy from 1024px up, centers
  and shrinks it below that, tilts it toward the cursor and adds a slow spin.
- Fragment shader draws a core and an exponential halo (`uGlow`) with additive
  blending. See [ADR 0007](../adr/0007-shader-glow-over-postprocessing.md).
- Intro timeline eases shader `uIntro` over about 2.4s. Reduced motion sets the
  progress to `1` immediately and does not block scrolling.
- `RevealText` splits headings into masked characters. `Reveal` fades blocks in
  on enter. Hero copy is tied to the intro; other sections use ScrollTrigger.
- Custom cursor and magnetic buttons, disabled for coarse pointers and reduced
  motion.
- Project screenshots: the image area is transparent, the plane uses an
  orthographic camera sized to the view, the texture is cover-cropped, and a
  `next/image` stays visible until the texture is ready.

## How to verify

```bash
pnpm check
pnpm build
pnpm dev
```

Open `/uk`:

- The sphere assembles during the intro and the name appears letter by letter.
- On a desktop width the particles sit to the right, glow, move away from the
  cursor and tilt with it.
- Scrolling changes shape and color, starting from a full sphere at the top.
- Project screenshots are visible and ripple under the cursor.
- The custom cursor follows the pointer and buttons pull toward it.

Repeat at a narrow width (object centered, quieter) and with
`prefers-reduced-motion: reduce` (no intro, no custom cursor, static images
where WebGL is skipped).

# ADR 0003: One WebGL canvas shared through views

## Status

Accepted

## Context

The page has two kinds of 3D content: a full-viewport background scene and a
distorted screenshot inside every project card. The straightforward approach is
a `<Canvas>` for each, but every canvas creates its own WebGL context. Browsers
limit the number of contexts, and each one carries its own memory and shader
compilation cost. A page with several projects would hit that limit.

## Decision

Render exactly one `<Canvas>`, fixed to the viewport, and compose everything
through `<View>` from `@react-three/drei`. Each view is bound to a DOM element
that tracks its screen position, and a single `<View.Port />` renders them all.
The canvas is mounted once by `WebGLProvider` and disabled entirely when the
user prefers reduced motion.

## Alternatives considered

- One canvas per 3D element. Simple to write, unreliable once there is more than
  a handful of them, and expensive on low-end devices.
- Rendering screenshots to textures ahead of time. Avoids extra canvases but
  loses the live hover interaction.

## Consequences

- Context count stays at one regardless of how many projects are shown.
- 3D content must be expressed as views tied to DOM nodes, which adds a small
  amount of wiring (`useElementRef`).
- Event handling uses the document body as the event source, so pointer
  interactions work even though the canvas itself ignores pointer events.

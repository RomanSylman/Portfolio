# 0007. Shader glow instead of postprocessing bloom

## Status

Accepted

## Context

The particle scene should read as a light source, not a cloud of flat discs.
The usual way to get that look is a bloom pass from
`@react-three/postprocessing`. That pass runs on the whole canvas. This project
renders every 3D element through `drei` `View` scissor regions on one canvas
([ADR 0003](0003-single-webgl-canvas-with-views.md)), and a full-canvas bloom
pass does not line up with that scissor split. It is also expensive on phones,
where the scene is already scaled down.

## Decision

Glow is drawn in the particle fragment shader. Each point has a bright core and
an exponential halo, blended additively, controlled by a `uGlow` uniform. No
postprocessing composer is mounted.

## Alternatives considered

- **Bloom via `@react-three/postprocessing`.** Matches the reference look, but
  it processes the shared canvas as one image and fights the view scissor
  regions. It also adds a full-screen pass on every frame.
- **A second canvas just for the particles.** Would let bloom run in isolation,
  and would throw away the single-context decision in ADR 0003.

## Consequences

- The glow only affects particles, not the project screenshots, which is what
  we want.
- Tuning the look means editing `uGlow` and the halo falloff, not a bloom
  radius. The result is cheaper and stays compatible with the view-based
  renderer.

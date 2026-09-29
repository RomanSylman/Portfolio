# ADR 0004: Particle morphing on the GPU

## Status

Accepted

## Context

The signature effect is a cloud of particles that reshapes itself as the visitor
scrolls between sections. With several thousand particles, updating positions on
the CPU every frame would compete with React and scrolling for main-thread time.

## Decision

Sample each target shape once, store every shape as its own vertex attribute on a
single geometry, and interpolate between the two shapes surrounding the current
scroll position inside the vertex shader. The scroll position arrives as one
uniform. Cursor repulsion is another uniform, computed from the pointer position
projected onto the scene plane.

Shapes are sampled from mesh surfaces with `MeshSurfaceSampler` where the shape
is a solid, and generated procedurally for the spiral and the wave.

## Alternatives considered

- Updating a position buffer from JavaScript each frame. Easy to debug, but the
  cost grows linearly with the particle count and runs on the main thread.
- Morph targets (`morphTargetInfluences`). Built for blending a few shapes of a
  mesh, not for point clouds with per-particle attributes.

## Consequences

- Per-frame CPU work is a handful of uniform updates, independent of particle
  count.
- Adding a shape means adding an attribute and a branch in the shader, so the
  number of sections and the shader are coupled. That coupling lives in
  `shapes.ts` and the vertex shader.
- The animation reads the scroll store through `getState()` inside `useFrame`,
  so it never causes a React render.

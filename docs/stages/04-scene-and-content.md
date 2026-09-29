# Stage 04: Scene, sections and case studies

## Goal

The visual centerpiece, the page content and the case study pages.

## What was done

- Built the particle scene. Six target shapes are sampled once and stored as
  vertex attributes, and the vertex shader blends between them using the scroll
  stage. Particles drift and move away from the cursor.
- Added the distortion image: a shader plane whose UVs ripple around the cursor,
  used by the project cards, with a static image fallback.
- Added the `profile` and `project` entities and the home page sections: hero,
  about, skills, experience, projects and contact.
- Added MDX case studies for three placeholder projects in both locales, rendered
  statically, plus locale-aware CV download buttons backed by placeholder PDFs.

## Decisions

- [ADR 0004](../adr/0004-gpu-particle-morphing.md) and
  [ADR 0006](../adr/0006-mdx-case-studies.md).

## How to verify

```bash
pnpm build
```

The build emits static pages for both locales and for every project case.

## Notes

`.glsl` files are imported as raw strings through a Turbopack rule. Compiling
MDX with `@next/mdx` failed under server rendering because the output expected
client-side React context, so case studies are evaluated on the server with
`@mdx-js/mdx` instead. A `README.md` placed in the root `pages/` directory was
picked up as a page and crashed the build; it is now `README.txt`.

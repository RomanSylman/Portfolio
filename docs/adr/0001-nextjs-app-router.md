# ADR 0001: Next.js with the App Router

## Status

Accepted

## Context

The site needs static rendering for performance and SEO, per-locale metadata,
and a deployment target that handles all of it without a custom server. It also
has to stay comfortable to develop, since the 3D scene needs fast feedback.

## Decision

Use the latest stable Next.js with the App Router, TypeScript and pnpm. Pages
are statically rendered through `generateStaticParams`.

## Alternatives considered

- Vite with React. Faster to start, but routing, metadata, image optimization
  and static generation would all be built by hand, and SEO would be weaker.
- Nuxt with TresJS. A coherent option, but the React Three Fiber ecosystem is
  the more mature choice for the planned scene.

## Consequences

- Locale-prefixed routes, metadata and static generation come from the
  framework.
- The App Router reserves the `app/` and `pages/` directories, so the FSD layers
  live under `src/` and the root `pages/` directory stays empty on purpose.
- Server and client components have to be separated deliberately, which shaped
  how the WebGL canvas is mounted.

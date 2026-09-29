# ADR 0002: Feature-Sliced Design

## Status

Accepted

## Context

The codebase is meant to be read by other engineers, so its structure has to
communicate where code belongs and prevent that structure from eroding over
time. A convention that is not checked automatically will not hold.

## Decision

Organize `src/` into Feature-Sliced Design layers: `app`, `pages`, `widgets`,
`features`, `entities` and `shared`. Each slice exposes a public API through
`index.ts`, and imports may only flow downwards. Steiger enforces both rules in
`pnpm lint:fsd` and in CI.

## Alternatives considered

- A lighter custom layering (`app`, `shared`, `features`, `three`) checked with
  `eslint-plugin-boundaries`. Fewer concepts, but a hand-rolled ruleset that
  nobody else would recognize.
- Grouping by file type (`components`, `hooks`, `utils`). Simple early on, but
  it spreads one feature across many directories and gives no guidance on
  dependencies.

## Consequences

- A reader can predict where code lives, and cross-layer imports fail the build.
- Steiger's insignificant-slice rule merges slices that have a single consumer.
  The home page sections therefore live in one `home` widget, and the skills and
  experience data share the `profile` entity. This keeps the tree smaller at the
  cost of wider slices.
- Next.js routing stays outside the FSD layers, in the root `app/` directory.

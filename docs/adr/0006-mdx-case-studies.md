# ADR 0006: Case studies as evaluated MDX

## Status

Accepted

## Context

Each project needs a long-form, bilingual case study with structured metadata
(role, stack, year, links) rendered as its own page. The content should be
writable as Markdown but carry typed data alongside it.

## Decision

Store case studies as MDX files at `content/projects/<slug>/<locale>.mdx`, each
exporting a `metadata` object. `getProjectCase` reads the file and evaluates it
with `@mdx-js/mdx` on the server, returning the component and the metadata. The
route enumerates every slug and locale in `generateStaticParams`, so the pages
are static.

## Alternatives considered

- `@next/mdx` compiling `.mdx` files as modules. This is the conventional
  approach, but with this Next.js and React combination the compiled output
  pulled in client-side React context during server rendering and failed the
  production build. See the stage log.
- Plain Markdown parsed at build time. Simpler, but no colocated typed metadata
  and no embedded components later.

## Consequences

- Content is plain files that diff cleanly and need no build step of their own.
- Evaluation happens at build time because the pages are static, so there is no
  runtime cost.
- The MDX runtime is provided explicitly (`react/jsx-runtime`), which keeps the
  server bundle free of client-only context.

# Stage 01: Foundation

## Goal

A runnable Next.js application with strict typing and the full quality toolchain.

## What was done

- Scaffolded Next.js 16 with the App Router, TypeScript, Tailwind CSS v4 and
  pnpm, and initialized git.
- Enabled `strict`, `noUncheckedIndexedAccess` and `noImplicitOverride`, with the
  `@/*` path alias.
- Added `.editorconfig` and `.nvmrc` pinning Node.js 24.
- Configured ESLint with `typescript-eslint` strict type-checked rules, import
  sorting and `eslint-config-prettier`, plus Prettier with the Tailwind plugin.
- Added the `check`, `lint:fsd`, `typecheck` and `format` scripts.

## Decisions

- [ADR 0001](../adr/0001-nextjs-app-router.md) records the framework choice.

## How to verify

```bash
pnpm check
```

## Notes

The scaffold had to be generated in a temporary directory because `create-next-app`
derives the package name from the directory name and rejects uppercase letters.
The package was then renamed to `portfolio`.

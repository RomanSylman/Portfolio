# Stage 02: Architecture and internationalization

## Goal

The Feature-Sliced Design structure and bilingual routing in place before any
feature code.

## What was done

- Created the FSD layers under `src/` and an intentionally empty root `pages/`
  directory so Next.js does not treat `src/pages` as the Pages Router.
- Added Steiger with the FSD plugin and scoped its import rules to `src/`.
- Set up next-intl with `uk` and `en`, message catalogs, locale-aware navigation
  helpers and the middleware in `src/proxy.ts`.
- Made `app/[locale]/layout.tsx` the root layout so the locale is available
  through `next/root-params` and pages render statically.

## Decisions

- [ADR 0002](../adr/0002-feature-sliced-design.md) and
  [ADR 0005](../adr/0005-next-intl-i18n.md).

## How to verify

```bash
pnpm lint:fsd
pnpm build
```

The build lists `/uk` and `/en` as statically generated.

## Notes

Steiger's insignificant-slice rule required merging slices that have a single
consumer. The home page sections ended up in one `home` widget, and skills with
experience share the `profile` entity. A root `app/layout.tsx` had to be removed,
because a layout above `[locale]` stops the locale from being a root parameter.

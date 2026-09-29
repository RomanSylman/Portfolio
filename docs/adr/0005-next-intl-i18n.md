# ADR 0005: next-intl for internationalization

## Status

Accepted

## Context

The site is bilingual, Ukrainian and English, and both versions have to be
indexable and statically rendered. The locale also has to be available deep in
the tree, in server components that render metadata and case studies.

## Decision

Use next-intl with a `[locale]` segment and `localePrefix: "always"`. The locale
layout is the root layout, which makes the locale a root parameter readable
anywhere through `next/root-params`. `src/shared/i18n/request.ts` resolves it
there, so pages stay static instead of opting into dynamic rendering.

## Alternatives considered

- A custom dictionary loaded by locale. Less code up front, but no message
  formatting, no typed keys and hand-rolled routing.
- Next.js built-in i18n routing. It does not exist for the App Router, so it was
  not an option.

## Consequences

- All routes are locale-prefixed and statically generated for both locales.
- Messages live in `messages/uk.json` and `messages/en.json` and must stay in
  sync.
- `next/root-params` only works because no layout exists above `[locale]`. Adding
  a root `app/layout.tsx` would silently break locale resolution.

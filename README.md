# Portfolio

A bilingual (Ukrainian / English) portfolio site built with Next.js and React
Three Fiber. A single WebGL scene of particles morphs between shapes as the
visitor scrolls, and project screenshots distort under the cursor.

The repository is structured as a demonstration of frontend architecture as much
as a portfolio: Feature-Sliced Design enforced by a linter, strict TypeScript,
and a documented record of every decision and build stage.

## Stack

- Next.js 16 (App Router, Turbopack) and React 19
- TypeScript in strict mode
- Tailwind CSS v4
- three.js via `@react-three/fiber` and `@react-three/drei`
- GSAP ScrollTrigger and Lenis for scroll, Zustand for shared state
- next-intl for Ukrainian and English
- MDX case studies compiled at request time with `@mdx-js/mdx`

## Getting started

Requirements: Node.js 24 (see `.nvmrc`) and pnpm 12.

```bash
pnpm install
pnpm dev
```

The site is served at `/uk` and `/en`. `/` redirects to the default locale.

## Scripts

| Script           | Purpose                                        |
| ---------------- | ---------------------------------------------- |
| `pnpm dev`       | Start the development server                   |
| `pnpm build`     | Production build                               |
| `pnpm lint`      | ESLint with strict type-checked rules          |
| `pnpm lint:fsd`  | Steiger: Feature-Sliced Design boundary checks |
| `pnpm typecheck` | `tsc --noEmit`                                 |
| `pnpm format`    | Format with Prettier                           |
| `pnpm check`     | Lint, FSD, types and formatting in one command |

`pnpm check` and `pnpm build` also run in GitHub Actions on every push and pull
request, followed by a Lighthouse job. See [`.github/workflows/ci.yml`](.github/workflows/ci.yml).

## Documentation

- [Architecture](docs/architecture.md) explains the layers, the single WebGL
  canvas and the data flow from scroll to scene.
- [Conventions](docs/conventions.md) covers naming, public APIs and i18n keys.
- [Content guide](docs/content-guide.md) explains how to add a project, a case
  study, a translation or an updated CV.
- [Architecture decision records](docs/adr) record why the major choices were
  made.
- [Stage log](docs/stages) records what each build stage produced.

## Updating the content

Profile copy, project summaries and case studies are real. Follow the
[content guide](docs/content-guide.md) to add a project or change a translation.
The CV files live at `public/cv/cv-uk.pdf` and `public/cv/cv-en.pdf`. The site
URL in `src/shared/config/site.ts` is still `https://example.com` until there is
a domain.

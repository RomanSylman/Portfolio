# Changelog

All notable changes to this project are documented here. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

### Added

- Opening a project sends the background particles out from the current shape,
  then carries them in one clockwise vortex around the card. The path is rounded
  through the corners and stays loose, so the stream does not reverse, leave
  gaps, or settle into a dense line before the page covers. The rest of the page
  fades, the card stays, and a background cover appears only at the end. The
  animation is skipped for reduced motion, without WebGL, and for modified
  clicks.
- Next.js 16 application scaffold with the App Router, TypeScript in strict
  mode, Tailwind CSS v4 and pnpm.
- Code quality tooling: ESLint flat config with `typescript-eslint` strict
  type-checked rules, import sorting and Prettier with Tailwind class sorting.
- Feature-Sliced Design layout under `src/` with Steiger enforcing layer
  boundaries and public APIs.
- Internationalization for Ukrainian and English with next-intl, locale-prefixed
  routes and statically rendered pages.
- Scroll infrastructure: Lenis smooth scrolling synchronized with GSAP
  ScrollTrigger, and a Zustand store exposing scroll progress and the active
  stage.
- A single shared WebGL canvas rendering both the background scene and project
  screenshots through `drei` views, with adaptive pixel ratio, a performance
  monitor and a reduced-motion fallback.
- Scroll-driven particle scene that morphs between six shapes on the GPU and
  reacts to the cursor.
- Shader-based hover distortion on project screenshots, falling back to a
  static image without WebGL.
- Home page sections: hero, about, skills, experience, projects and contact.
- MDX case study pages per project and locale, rendered statically.
- Locale-aware CV download buttons pointing at `public/cv`.
- GitHub Actions workflow running the full check suite, the production build
  and Lighthouse CI with score thresholds.
- Project documentation: architecture, conventions, content guide, architecture
  decision records and a per-stage build log.
- Intro animation that gathers particles into the hero sphere, with a letter
  reveal on the hero and scroll-triggered text motion on the other sections.
- Shader glow on the particles, a custom cursor and magnetic buttons.
- Scene placement that keeps the particles to the right of the copy on desktop
  and centered behind it on small screens.

### Changed

- Real profile content: name, contacts, skills, experience, education and four
  bilingual case studies. NDA cases do not name the client or show product UI.
  Experience and project copy lives in the message files, and project dates are
  a `period` string.

### Fixed

- Cursor repulsion, which never ran because pointer events were listened for on
  a canvas with `pointer-events: none`.
- Stage index starting at `0.5` and going stale after leaving the home page.
- Particle size ignoring the device pixel ratio, and random attributes that
  could be negative.
- Project screenshots hidden behind an opaque card background, with a plane
  that did not cover the card.

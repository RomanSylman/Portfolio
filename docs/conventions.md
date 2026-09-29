# Conventions

## Naming

- Files and directories use kebab-case: `scroll-store.ts`, `download-cv`.
- React components use PascalCase and live in a file named after them:
  `project-card.tsx` exports `ProjectCard`.
- Hooks start with `use` and live in a file named after the hook.
- A slice's public API is its `index.ts`. Anything not re-exported there is
  private to the slice.

## Imports

- Import across slices only through their public API, using the `@/` alias.
- Imports inside a slice may use relative paths.
- Imports flow downwards only: `pages` to `widgets`, `features` and `entities`;
  those to `shared`. Never upwards or sideways between slices of the same layer.
- Steiger checks both rules. Run `pnpm lint:fsd` before pushing.

## TypeScript

`strict`, `noUncheckedIndexedAccess` and `noImplicitOverride` are on. Indexed
access can be `undefined`, so guard it instead of asserting.

Prefer `interface` for object shapes. Import types with
`import { type Foo }`, which the linter enforces.

## Styling

Tailwind CSS v4 utility classes, with design tokens declared in
`src/app/styles/globals.css` under `@theme`. Use the tokens (`bg-background`,
`text-muted`, `border-line`, `text-accent`) rather than raw colors so the palette
stays in one place. Prettier sorts Tailwind classes automatically.

## Internationalization

- All user-visible text lives in `messages/uk.json` and `messages/en.json`.
- Both files carry the same key structure. Add a key to both in the same change.
- Read messages with `useTranslations` in client components and `getTranslations`
  in server components.
- Locale-aware links go through the navigation helpers in `src/shared/i18n`.

## Git

- Commits follow [Conventional Commits](https://www.conventionalcommits.org/):
  `feat:`, `fix:`, `docs:`, `refactor:`, `chore:`.
- `pnpm check` must pass before a branch is merged. CI enforces it.

## 3D code

- Shader sources are `.glsl` files imported as raw strings. Turbopack handles
  them through the rule in `next.config.ts`.
- Read shared state inside `useFrame` via `store.getState()` so animation does
  not cause React renders.
- Anything the user can miss must have a non-WebGL fallback, and motion must
  respect `prefers-reduced-motion`.

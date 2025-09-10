# Repository Guidelines

## Project Structure & Module Organization
- `src/pages/`: Route files (`.astro`, `.md`, `.tsx`). One file = one URL.
- `src/components/`: Reusable UI/utility components.
- `src/layouts/`: Shared page layouts.
- `public/`: Static assets served from site root (`/`).
- `src/styles/` or `styles/`: Global and shared styles.
- `tests/` and `e2e/`: Unit and end-to-end tests.
- Root config: `astro.config.*`, `tsconfig.*`, `package.json`.

Example: add a blog page in `src/pages/blog/post-1.md` and a card in `src/components/PostCard.astro`.

## Build, Test, and Development Commands
- `npm ci`: Install exact dependencies for CI/local.
- `npm run dev`: Start dev server with HMR.
- `npm run build`: Production build to `dist/`.
- `npm run preview`: Serve the built site from `dist/`.
- `npm test`: Run unit tests (Vitest).
- `npm run test:e2e`: Run E2E tests (Playwright, if configured).

Examples: local dev `npm ci && npm run dev`; full check `npm run build && npm test`.

## Coding Style & Naming Conventions
- Indentation: 2 spaces; keep lines focused and readable.
- Languages: Astro, TypeScript/JavaScript, CSS/SCSS.
- Formatting: Prettier. Linting: ESLint (fix with `npm run lint -- --fix` if available).
- Naming: Components `PascalCase` (e.g., `NavBar.astro`); pages and utilities `kebab-case`.
- Imports: Prefer absolute/aliased paths via `tsconfig`/`astro.config`.

## Testing Guidelines
- Frameworks: Vitest for unit; Playwright for E2E (if configured).
- File patterns: `**/*.test.ts?(x)` for unit; `e2e/**/*.spec.ts` for E2E.
- Coverage: Use `npm run coverage` if provided; prioritize core logic.
- Before PRs: run `npm test` and `npm run test:e2e` (when applicable).

## Commit & Pull Request Guidelines
- Commits: Imperative, concise subjects (e.g., `feat: add blog layout`). Optional scopes like `components`, `pages`.
- PRs: Include description, rationale, and linked issue(s). Add screenshots/GIFs for UI changes and repro steps for bug fixes.
- CI: PRs should pass CI and introduce no new ESLint/TypeScript errors.

## Security & Configuration Tips
- Secrets: Store in `.env` (not committed). Access via `import.meta.env`.
- Config: Prefer `astro.config.*`/`tsconfig.*` over ad‑hoc paths.
- Dependencies: Keep minimal; prefer first‑party Astro integrations.


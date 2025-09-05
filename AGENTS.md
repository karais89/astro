# Repository Guidelines

## Project Structure & Module Organization
- `src/pages/`: Route files (`.astro`, `.md`, `.tsx`).
- `src/components/`: Reusable UI and utility components.
- `src/layouts/`: Site layouts shared across pages.
- `public/`: Static assets served at site root.
- `src/styles/` or `styles/`: Global and shared styles.
- `tests/` and/or `e2e/`: Unit and end-to-end tests.
- `astro.config.*`, `tsconfig.*`, `package.json`: Project configuration.

## Build, Test, and Development Commands
- `npm ci`: Install exact dependencies for CI/local.
- `npm run dev`: Start local dev server with HMR.
- `npm run build`: Produce optimized production build to `dist/`.
- `npm run preview`: Serve the built site from `dist/`.
- `npm test`: Run unit tests (e.g., Vitest).
- `npm run test:e2e`: Run browser tests (e.g., Playwright).

Examples:
- Local dev: `npm ci && npm run dev`
- Full check: `npm run build && npm test`

## Coding Style & Naming Conventions
- Indentation: 2 spaces; keep lines focused and readable.
- Languages: Astro, TypeScript/JavaScript, CSS/SCSS.
- Formatting: Prettier; Linting: ESLint (fix with `npm run lint -- --fix` if available).
- Naming: Components `PascalCase` (e.g., `NavBar.astro`); pages and utility files `kebab-case`.
- Imports: Prefer absolute or aliased paths configured in `tsconfig`/`astro.config`.

## Testing Guidelines
- Frameworks: Vitest for unit; Playwright for E2E (if configured).
- File patterns: `**/*.test.ts?(x)` for unit; `e2e/**/*.spec.ts` for E2E.
- Coverage: Use `npm run coverage` if provided; aim for meaningful coverage on core logic.
- Run locally before PRs: `npm test` and, if relevant, `npm run test:e2e`.

## Commit & Pull Request Guidelines
- Commits: Imperative, concise subjects (e.g., "feat: add blog layout").
- Scope tags are welcome when clear (e.g., `components`, `pages`).
- PRs: Provide description, rationale, and linked issue(s). Include screenshots/GIFs for UI changes and steps to reproduce for bug fixes.
- Passing CI and no new ESLint/TypeScript errors required before review.

## Security & Configuration Tips
- Secrets: Use `.env` (not committed). Access via `import.meta.env`.
- Config: Prefer changes in `astro.config.*` and `tsconfig.*` over ad‑hoc paths.
- Dependencies: Keep minimal; prefer first‑party Astro integrations where possible.

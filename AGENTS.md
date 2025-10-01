# Repository Guidelines

## Project Structure & Module Organization
Source lives under `src/`. Pages that map to routes belong in `src/pages/` (one file per URL). Shared UI sits in `src/components/`, while common layouts go in `src/layouts/` when introduced. Site-wide styles are collected in `src/styles/`; static assets belong in `public/` and ship directly at the site root. Content collections and Markdown live in `src/content/` alongside `content.config.ts`. Keep experiments or utilities in dedicated subdirectories; avoid nesting unrelated code in pages.

## Build, Test, and Development Commands
Run `npm ci` to install exact dependency versions. Use `npm run dev` (alias `npm start`) for local development with HMR, and `npm run build` to produce the optimized `dist/` bundle. Preview a production build with `npm run preview`. If you need direct Astro tooling access, `npm run astro -- <command>` forwards arguments to the Astro CLI.

## Coding Style & Naming Conventions
Indent with 2 spaces and keep files Prettier-friendly. Prefer TypeScript or modern ES modules; co-locate component styles when scoped is clearer. Name components and layouts in `PascalCase` (e.g., `HeroBanner.astro`), route files in `kebab-case` (e.g., `docs/getting-started.astro`), and utilities in `camelCase`. Favor absolute imports via the configured TS aliases instead of deep relative paths. Run Prettier or `npm run astro check` before committing.

## Testing Guidelines
Testing is not yet wired into `package.json`. When adding tests, use Vitest (`*.test.ts`) for unit coverage and Playwright (`e2e/*.spec.ts`) for flows. Document new commands in `package.json` and ensure they run without extra setup. Aim to cover critical content pipelines and reusable components.

## Commit & Pull Request Guidelines
Write imperative commit subjects (`feat: add pricing page`). Group related changes and keep commits scoped. Pull requests should explain the intent, list major changes, and link issues or tasks. Include screenshots for visual updates and note any follow-up work. Ensure `npm run build` passes before requesting review and call out any missing tests or manual verification steps.

## Security & Configuration Tips
Do not commit secrets; place them in `.env` files and load via `import.meta.env`. Prefer configuring integrations in `astro.config.mjs` over ad-hoc scripts. Keep dependencies lean—use Astro/Starlight features before adding new packages, and lock updates with `npm ci` for reproducible builds.

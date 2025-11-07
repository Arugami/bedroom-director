# Repository Guidelines

## Project Structure & Module Organization
- `bedroom-director-web/` hosts the Next 16 app; routes live in `src/app`, shared UI in `src/components`, helpers in `src/lib`, and static assets in `public/`.
- `data/` stores the canonical CSV/JSON catalog plus dated backups; treat it as the only write target for tool metadata.
- `scripts/maintenance`, `scripts/updates`, and `scripts/utilities` hold Python jobs for syncing or refreshing platform info; keep notebooks outside the repo.
- `docs/`, `research/`, and `notes/` cover strategy material; `bedroom-director-universe/` holds the narrative and brand assets.

## Build, Test, and Development Commands
- `cd bedroom-director-web && npm install` hydrates dependencies.
- `npm run dev` starts the hot-reload server, `npm run build` emits the production bundle, and `npm run start` smoke-tests that bundle.
- `npm run lint` executes the Next/ESLint rules and currently serves as the minimum “test” gate.
- Data transforms: `python scripts/utilities/sync_to_json.py` (CSV → JSON) and `python scripts/utilities/update_api_platform_availability.py` ahead of any platform or pricing edits.

## Coding Style & Naming Conventions
- TypeScript: 2-space indentation, semicolons, and strict typing; components use PascalCase (`ToolGrid.tsx`), hooks camelCase (`useTools.ts`), utilities stay under `src/lib`.
- Tailwind utility clusters belong in `className`; extract shared variants with `clsx` or `class-variance-authority`.
- Python scripts follow PEP 8 snake_case naming and expose a `main()` guard for CLI execution.
- CSV headers stay lowercase_with_underscores to keep ingest scripts and docs aligned.

## Testing Guidelines
- Automated tests are not wired yet; when adding them, pair Jest or Vitest with Testing Library so future `npm test` stays co-located with components.
- Run `npm run lint` before every commit and note suppressed rules in PRs.
- For data edits, add assertions inside `scripts/monitoring/` (e.g., category counts never shrink) and post the command output in review notes.

## Commit & Pull Request Guidelines
- Use Conventional Commits (`feat: add model filters`, `fix: correct pricing sync`, `docs: update schema guide`) to keep the history greppable.
- Each PR should link to the touched doc or dataset, summarize user impact, attach UI screenshots for `src/components` work, and list the commands you ran (`npm run lint`, data sync scripts) so reviewers can replay steps quickly.

## Data & Configuration Tips
- Edit `data/ai_video_image_models.csv` with UTF-8 aware tools; after changes, rerun `python scripts/utilities/sync_to_json.py` and place a timestamped copy in `data/backups/`.
- Secrets stay in local `.env` files ignored by git; mirror required variable names in `docs/06_WEBSITE_IMPLEMENTATION_GUIDE.md` so new agents can provision environments without guesswork.

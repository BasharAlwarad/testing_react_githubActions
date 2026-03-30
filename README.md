# React + Vitest CI/CD (GitHub Actions)

This project is configured to run Continuous Integration and Continuous Delivery with GitHub Actions.

## Pipeline goals

- Install dependencies on multiple Node versions.
- Run unit and integration tests with Vitest.
- Fail when coverage is below thresholds.
- Build the Vite production bundle.
- Deploy `dist/` to GitHub Pages from `main`.

## What was added

- Workflow file: `.github/workflows/ci.yml`
- Coverage threshold enforcement in `vite.config.ts`
- Dynamic Vite base path support via `VITE_BASE_PATH`

## CI workflow behavior

The workflow:

- Runs on push to `main` and PRs targeting `main`.
- Uses a Node matrix: `22` and `24`.
- Runs `npm ci`, then `npx vitest run --coverage`.
- Uploads coverage artifacts for each Node version.
- Builds only on Node `22` and uploads `dist/` as GitHub Pages artifact.
- Deploys with `actions/deploy-pages` only on `main`.

## Coverage thresholds

Configured in `vite.config.ts`:

- Branches: 80%
- Functions: 80%
- Statements: 80%
- Lines: 80%

If coverage drops below these values, CI fails.

## Scripts used in CI

- `npm ci`
- `npx vitest run --coverage`
- `npm run build`

`npm run build` currently runs TypeScript checks, tests, and then `vite build`.

## First-time push and Pages setup

1. Create a new repository on your GitHub account.
2. In GitHub repo settings, enable Pages deployment from GitHub Actions.
3. Point this local project to your repository and push:

```bash
git remote remove origin
git remote add origin https://github.com/<user>/<repo>.git
git push -u origin main
```

The workflow sets `VITE_BASE_PATH=/${{ github.event.repository.name }}/` during CI build so the deployed site works at:

`https://<user>.github.io/<repo>/`

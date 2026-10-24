# AGENTS.md

## Cursor Cloud specific instructions

This repo is a single full-stack web app (`rest-express`): an Express + TypeScript
backend that also serves a React (Vite) "Digital Brutalism" portfolio SPA. There is
one service; frontend and backend run together from `npm run dev`.

### Running

- Dev server: `npm run dev` (runs `tsx server/index.ts` with `NODE_ENV=development`).
  Serves both the API and the Vite dev frontend on a single port.
- The app listens on port **5000** (override with `PORT`). URL: `http://localhost:5000/`.
- The `/health` endpoint and other production middleware (helmet, compression,
  trust-proxy) are only registered when `NODE_ENV=production`; in dev, `/health`
  falls through to the SPA and returns HTML. Use `npm run start` (after `npm run build`)
  to exercise the production path.
- Storage is in-memory (`server/storage.ts`); data resets on restart. No database is
  required for local dev — `DATABASE_URL` is only for future Postgres integration.

### API

- Demo REST routes live under `/api` in `server/routes.ts` (`GET /api/users`,
  `GET /api/users/:id`, `POST /api/users`).

### Lint / test / build

- Type check: `npm run check` (runs `tsc`; there is no separate ESLint script despite
  the README mention).
- Unit tests: `npm test -- --run` (Vitest; matches `client/src/**/*.test.ts`).
- Build: `npm run build` (builds Vite client to `dist/public` then esbuild server to `dist/index.js`).
- Playwright e2e (`tests/*.spec.ts`) require browsers via `npx playwright install` and
  the sample test hits the public internet (example.com); not part of the default `npm test`.

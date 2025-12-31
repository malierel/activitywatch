# ActivityWatch Web UI Next

A modern parallel UI for ActivityWatch built with Vite, React, TypeScript, Tailwind CSS, Radix/shadcn-inspired components, TanStack Query/Table/Virtual, Apache ECharts, lucide-react, and zod.

## Goals
- Runs alongside the legacy UI and keeps aw-server as source of truth
- Local-first: dev proxy to localhost aw-server, prod served from `/next`
- Shared design system with tokens for light/dark themes and accessibility

## Getting started
1. **Install dependencies** (requires internet access):
   ```bash
   npm install
   ```
2. **Run dev server with proxy to aw-server (default localhost:5600):**
   ```bash
   npm run dev
   ```
   - Set `AW_SERVER_URL` to override the proxy target.
3. **Build for production:**
   ```bash
   npm run build
   ```
   - Output goes to `dist/` with `base` set to `/next/`.
4. **Preview built assets locally:**
   ```bash
   npm run preview
   ```

## aw-server integration (initial sketch)
- Dev uses Vite proxy (`/api` -> `AW_SERVER_URL` or `http://localhost:5600`).
- For production, serve `dist/` under `/next` alongside the existing UI. The preferred location is aw-server's static assets folder (e.g., `aw_server/static/next`). When submodules are available, add a small router entry in aw-server to map `/next` to these assets without disturbing `/`, and ensure SPA fallback (`index.html`) for nested routes.
- Keep all API calls under `/api/0/*` to preserve compatibility and localhost-only security constraints.

## Structure
- `src/index.css`: Tailwind layers and CSS variables for tokens (surface, text, border, semantic states).
- `src/components/design-system`: App shell, headers, filter bar, KPI/data cards, InlineState, table/virtualized components, modal/tabs/badge.
- `src/lib/api`: Fetch client with zod validation and TanStack Query hooks.
- `src/pages`: Stubs for Activity, Timeline, Reports, Search, Trends, Buckets, Settings (+ rule builder).

## Notes
- Dependencies are declared but not vendored. Run `npm install` with network access to hydrate `node_modules` and generate a lockfile.
- Base router uses `/next` basename so assets mount cleanly when served by aw-server.
- Hosts are derived from `/api/0/buckets/` metadata so the UI works even when `/api/0/hosts` is unavailable.

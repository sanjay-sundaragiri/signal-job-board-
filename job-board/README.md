# Signal — a job board

A dense, fast job board built with React (Vite) and Tailwind CSS. Built as a UX/feature-detail showcase: a scrolling ticker of new postings, a master-detail split view, a command palette (⌘K), keyboard navigation, saved jobs, filters, and empty/loading states....

## Run locally

```bash
npm install
npm run dev
```

Open the printed local URL (usually `http://localhost:5173`).

## Build

```bash
npm run build
npm run preview   # sanity-check the production build locally
```

## Deploy to Vercel

Yes — this is a standard Vite + React app, and Vercel supports it with zero configuration.

**Option A — CLI**
```bash
npm install -g vercel
vercel
```
Follow the prompts. Vercel auto-detects the Vite framework preset (build command `vite build`, output directory `dist`).

**Option B — GitHub import**
1. Push this folder to a GitHub repo.
2. In the Vercel dashboard, click **Add New → Project** and import the repo.
3. Vercel detects "Vite" automatically. Leave the defaults and click **Deploy**.

No environment variables are required — all data is mocked in `src/data/jobs.js`.

## Where to plug in real data

Replace `fetchJobs()` in `src/data/jobs.js` with a real API call (same shape: an array of job objects, returned as a Promise). Nothing else needs to change.

## Feature list

- Scrolling ticker of the newest postings (click any item to jump to it)
- Search (`/` to focus) + command palette (`⌘K` / `Ctrl+K`) with arrow-key navigation
- Filters: role type, seniority, location, minimum salary — combinable, with a live result count
- Sort by newest or salary
- Master-detail layout on desktop; full-screen detail sheet on mobile
- Keyboard navigation between jobs (`↑` / `↓`), `Esc` to close
- Save/bookmark jobs, persisted to `localStorage`, with a dedicated "Saved" view
- Apply modal with client-side validation and a success toast
- Loading skeletons and empty states (no results vs. no saved jobs)
- Accessible: visible focus rings, `aria-live` toasts, labeled controls, reduced-motion support

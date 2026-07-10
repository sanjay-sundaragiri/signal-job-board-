# Signal — a job board

A dense, fast job board built with React (Vite) and Tailwind CSS — built as a UX/feature-detail showcase rather than another generic card grid.

[![CI/CD](https://github.com/sanjay-sundaragiri/signal-job-board-/actions/workflows/deploy.yml/badge.svg)](https://github.com/sanjay-sundaragiri/signal-job-board-/actions/workflows/deploy.yml)

**Live demo:**  [Live](https://signal-job-board.vercel.app)

**Full feature documentation:** [docs/DOCUMENTATION.md](./docs/DOCUMENTATION.md)

---

## What this is

Instead of a card grid, Signal borrows from trading terminals: a scrolling ticker of new postings, dense monospace metadata, and a **master-detail layout** — click a role on the left, read and apply on the right, no page navigation. Built to demonstrate real UX depth: keyboard shortcuts, a command palette, persisted saved jobs, combinable filters, and proper loading/empty states.

## Feature highlights

- 📟 Scrolling ticker of newest postings — click any item to jump to it
- 🔎 Search (`/` to focus) + command palette (`⌘K` / `Ctrl+K`) with arrow-key navigation
- 🎛️ Filters: role type, seniority, location, minimum salary — all combinable, live result count
- ↕️ Sort by newest or salary
- 🖥️ Master-detail layout on desktop; full-screen detail sheet on mobile
- ⌨️ Keyboard navigation between jobs (`↑` / `↓`), `Esc` to close
- 🔖 Save/bookmark jobs, persisted to `localStorage`, with a dedicated "Saved" view
- 📝 Apply modal with client-side validation and a success toast
- ⏳ Loading skeletons and empty states (no results vs. no saved jobs)
- ♿ Accessible: visible focus rings, `aria-live` toasts, labeled controls, reduced-motion support

See [docs/DOCUMENTATION.md](./docs/DOCUMENTATION.md) for the full breakdown of every feature, the data model, and the project structure.

## Tech stack

- [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [lucide-react](https://lucide.dev/) for icons
- Mock data — no backend required (see [Where to plug in real data](#where-to-plug-in-real-data))

## Getting started

```bash
git clone https://github.com/sanjay-sundaragiri/signal-job-board-.git
cd signal-job-board-
npm install
npm run dev
```

Open the printed local URL (usually `http://localhost:5173`).

### Build

```bash
npm run build
npm run preview   # sanity-check the production build locally
```

## Deployment

This repo deploys to [Vercel](https://vercel.com) via the GitHub Actions pipeline in [`.github/workflows/deploy.yml`](./.github/workflows/deploy.yml):

- **Every push/PR to `main`** → installs dependencies and runs `npm run build`, catching build errors early
- **On a pull request** → deploys a Vercel *preview* and comments the URL on the PR
- **On merge to `main`** → deploys straight to Vercel *production*

To set this up on your own fork, add these repository secrets under **Settings → Secrets and variables → Actions**:

| Secret | Where to find it |
|---|---|
| `VERCEL_TOKEN` | Vercel → Settings → Tokens → Create Token |
| `VERCEL_ORG_ID` | `orgId` in `.vercel/project.json` after running `vercel link` |
| `VERCEL_PROJECT_ID` | `projectId` in `.vercel/project.json` after running `vercel link` |

You can also deploy manually at any time:

```bash
npm install -g vercel
vercel        # preview deploy
vercel --prod # production deploy
```

## Where to plug in real data

Replace `fetchJobs()` in `src/data/jobs.js` with a real API call that resolves to an array of job objects in the same shape. Nothing else in the app needs to change.

## Project structure

```
signal-job-board-/
├── .github/workflows/deploy.yml   # CI/CD pipeline
├── docs/DOCUMENTATION.md          # full feature documentation
├── src/
│   ├── components/                # one component per UI concern
│   ├── data/jobs.js               # mock dataset + fetchJobs()
│   ├── hooks/useLocalStorage.js   # persistence for saved jobs
│   ├── utils/format.js            # time-ago / salary formatting
│   ├── App.jsx                    # top-level state + wiring
│   └── main.jsx                   # React entry point
├── index.html
├── tailwind.config.js
└── package.json
```

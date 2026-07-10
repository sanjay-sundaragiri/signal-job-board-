# Signal — Job Board Documentation

A dense, fast job board built with React and Tailwind CSS. This document covers every feature, the reasoning behind the design, and how the pieces fit together.

## Table of contents

- [Design concept](#design-concept)
- [Feature reference](#feature-reference)
- [Keyboard shortcuts](#keyboard-shortcuts)
- [Data model](#data-model)
- [Project structure](#project-structure)
- [CI/CD pipeline](#cicd-pipeline)
- [Accessibility notes](#accessibility-notes)
- [Known limitations](#known-limitations)

## Design concept

Most job boards default to a card grid. Signal instead borrows from trading terminals: a scrolling ticker of new postings, monospace metadata (salary, time posted, applicant count), and a **master-detail layout** — click a role on the left, read the full posting and apply on the right, without a page navigation. The goal is information density without clutter, and a UI that rewards keyboard use as much as mouse use.

## Feature reference

### 1. Ticker (ticker-tape marquee)
A horizontally scrolling strip of the 8 most recently posted roles, always visible at the top of the page. Clicking any item jumps straight to that job's detail view. Hovering pauses the scroll so it can be read. Built with a CSS keyframe animation, not JavaScript, so it doesn't block the main thread.

### 2. Search
A single search box (in the header) filters jobs live across title, company, tags, and role type. Press **`/`** anywhere on the page to jump focus straight into it, without touching the mouse.

### 3. Command palette (⌘K)
A `Cmd+K` / `Ctrl+K` overlay for power users: type to fuzzy-match across all jobs, use `↑`/`↓` to highlight a result, `Enter` to jump to it, `Esc` to close. Functions as a faster alternative to scrolling the full list.

### 4. Filters
A sticky sidebar with four independent, combinable filters:
- **Role type** (Engineering, Design, Product, Data, Marketing)
- **Seniority** (Intern → Staff+)
- **Location** (Remote, Hybrid, On-site)
- **Minimum salary** (a range slider, $0k–$200k+)

A live counter shows how many roles currently match. A "Reset" link appears only when at least one filter is active, and clears everything in one click.

### 5. Sorting
Two sort modes — **Newest** and **Salary** (descending) — as a toggle above the job list. Re-sorts the currently filtered set instantly; no page reload.

### 6. Master-detail view
Desktop: the job list and the full job detail sit side by side, in sync. Selecting a job on the left updates the right pane immediately. Mobile: the detail view becomes a full-screen sheet that slides up, with its own close button.

### 7. Keyboard navigation
With the job list in view (and no input focused), **`↑`/`↓`** moves the active selection up and down the currently filtered/sorted list. **`Esc`** closes the detail view or any open modal.

### 8. Save / bookmark jobs
Every job row and the detail view have a bookmark toggle. Saved jobs persist in the browser's `localStorage`, so they survive a page refresh — no account or backend required. A dedicated "Saved" view (toggled from the header) filters the list down to only bookmarked roles, with an empty state guiding first-time use.

### 9. Apply modal
Clicking "Apply now" opens a form (name, email, optional portfolio/LinkedIn link) with inline client-side validation. On submit, it simulates a network request (700ms) and shows a success toast. No data leaves the browser — this is a demo submission flow, documented as such in the UI itself.

### 10. Toast notifications
A lightweight, self-dismissing notification system (bottom-right) confirms actions: saving/removing a job, submitting an application. Announced via `aria-live` for screen readers.

### 11. Loading and empty states
- **Loading:** skeleton placeholders (pulsing gray blocks) shown while the mock "fetch" resolves, so the layout doesn't jump once real data arrives.
- **Empty — no filter matches:** a message plus a one-click "clear filters" action.
- **Empty — no saved jobs:** a distinct message explaining bookmarks are local to the device.

## Keyboard shortcuts

| Shortcut | Action |
|---|---|
| `/` | Focus the search box |
| `⌘K` / `Ctrl+K` | Open the command palette |
| `↑` / `↓` | Move active selection through the job list |
| `Esc` | Close command palette / job detail / apply modal |
| `Enter` (in job row) | Open that job's detail |

## Data model

Each job object (see `src/data/jobs.js`) has this shape:

```js
{
  id: 'j-101',
  title: 'Senior Frontend Engineer',
  company: 'Northwind Labs',
  companyBlurb: '...',
  logoLetter: 'N',
  logoColor: '#2F5DFF',
  roleType: 'Engineering',       // one of ROLE_TYPES
  seniority: 'Senior',            // one of SENIORITY
  location: 'Remote',             // one of LOCATIONS
  country: 'Worldwide',
  salaryMin: 150,
  salaryMax: 190,
  tags: ['React', 'TypeScript', 'Design Systems'],
  postedAt: <timestamp>,
  featured: true,
  applicants: 12,
  description: '...',
  responsibilities: ['...'],
  requirements: ['...'],
  benefits: ['...'],
}
```

`fetchJobs()` in the same file simulates an async API call (500ms delay) and returns this array as a Promise. **To connect a real backend:** replace the body of `fetchJobs()` with an actual `fetch(...)` call that returns data in the same shape — nothing else in the app needs to change.

## Project structure

```
job-board/
├── .github/workflows/deploy.yml   # CI/CD pipeline
├── docs/DOCUMENTATION.md          # this file
├── src/
│   ├── components/                # one component per UI concern
│   ├── data/jobs.js                # mock dataset + fetchJobs()
│   ├── hooks/useLocalStorage.js    # persistence for saved jobs
│   ├── utils/format.js             # time-ago / salary formatting
│   ├── App.jsx                     # top-level state + wiring
│   └── main.jsx                    # React entry point
├── index.html
├── tailwind.config.js
└── package.json
```

## CI/CD pipeline

Defined in `.github/workflows/deploy.yml`, running on GitHub Actions:

1. **On every push/PR to `main`:** install dependencies and run `npm run build`, to catch build-breaking errors before deployment is attempted.
2. **On a pull request:** deploy a Vercel *preview* build and post the URL as a PR comment.
3. **On merge to `main`:** deploy straight to Vercel *production*.

Required GitHub repository secrets: `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID` (see the main README for how to obtain these).

## Accessibility notes

- All interactive controls have visible focus rings (`:focus-visible`).
- Toasts are announced via `aria-live="polite"`.
- Bookmark buttons expose `aria-pressed` and `aria-label`.
- Modals use `role="dialog"` and `aria-modal="true"`.
- Animations respect `prefers-reduced-motion`.

## Known limitations

- Data is mocked and resets on every page load except for saved jobs (which persist via `localStorage`).
- The apply form does not send data anywhere — it's a demonstration of the UX flow, stated explicitly in the modal itself.
- `localStorage` state is per-browser, per-device — saved jobs won't sync across devices without adding a real backend/auth layer.

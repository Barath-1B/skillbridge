# SkillBridge

A career-path advisor for computer science students and early-career developers. It compares what
you already know against what a career actually requires, and tells you what is missing.

## Overview

You create a profile — experience level, skills, certifications, interests — and take a Big Five
(OCEAN) personality quiz. The backend scores that profile against 30 curated career paths and
returns a ranked list with a match score, a breakdown of how the score was reached, the specific
skills you are missing (grouped by how critical they are), and a three-phase learning roadmap you
can check off as you go.

It is a full-stack MERN application: a React 19 + Vite client and an Express + MongoDB API, built as
a monorepo.

## Problem statement

Most career advice for CS students stops at the job title. You are told "become a data engineer",
but not whether you are 20% or 80% of the way there, which of your existing skills already transfer,
or what to learn first. Generic roadmaps ignore what you already know, and personality quizzes give
you a four-letter type with no connection to actual jobs.

SkillBridge makes the gap concrete. Every score is explained, every missing skill is listed and
ranked by importance, and the roadmap is ordered so that prerequisites come before the things that
depend on them.

## Features

**Accounts and sessions**
- Email/password registration and login, passwords hashed with bcrypt
- JWT access token (1h) in an httpOnly cookie, plus a rotating refresh token (30d) scoped to
  `/api/auth`; only SHA-256 hashes of refresh tokens are stored, capped at 5 per user for
  multi-device use
- The client axios instance auto-refreshes on a 401 with a single-flight interceptor, so a
  concurrent burst of requests triggers exactly one refresh
- Change password, delete account

**Profile and personality**
- Guided multi-step profile setup: experience level, skill selection with search and category
  filters, certifications, interests
- OCEAN quiz (32 questions) — scored and used in career matching
- MBTI quiz (32 questions) — **display-only**, it never influences match scores
- Retake any test later; a history timeline shows when each was last taken, and a full reset clears
  onboarding data so you can start over

**Career analysis**
- Analyzer runs your profile against every career path and ranks the results
- Each result shows a match score, a written explanation of every component that moved it, missing
  skills split into critical / important / nice-to-have, and a confidence level
- Sort by fit, or by "opportunity" (fit plus a bounded market-demand nudge)
- Career brief page per path: description, advantages, resources, certifications, and the roadmap
- Save careers, tick off roadmap items, track percentage complete per career

**Admin**
- Role-gated admin area: create/edit/delete career paths and skills, manage users and roles
- Career editor includes a required-skills editor with per-skill weight and priority
- Analytics: user/career/skill totals, users by role, per-career engagement counts

**Other**
- Light/dark theme, page transitions, responsive layout
- `GET /api/health` reports uptime and MongoDB connection state
- Structured JSON logging (pino), security headers (helmet), gzip, rate limiting
- Optional Sentry error tracking on both client and server (no-op unless a DSN is set)

## How it works

The scoring engine lives in [server/src/utils/gap-engine.js](server/src/utils/gap-engine.js) and is a
pure function — no database, no I/O — so it can be unit tested directly. Services prepare plain
objects and hand them to it.

**1. Weighted skill match.** Every career lists required skills with a weight (1–10) and a priority
(high/medium/low). The base score is credited weight ÷ total required weight × 100.

**2. Adjacency credit.** Skills are stored with a `relatedSkills` graph — each entry is a skill name
plus a similarity from 0 to 1. If you do not hold a required skill but you hold something adjacent to
it, you get partial credit at that similarity. Someone who knows PostgreSQL is not at zero for a
career that wants MySQL.

**3. Modifiers**, applied on top of the skill score:

| Modifier | Range | Basis |
|---|---|---|
| Personality fit | −5 to +10 | Mean absolute deviation between your OCEAN scores and an ideal trait profile defined per career domain (8 domains have profiles) |
| Certifications | 0 to +5 | Fraction of the career's required certifications you hold |
| Experience fit | −3 to +1 | Your experience level vs. the career's difficulty. A big stretch costs points; a good match earns one |
| Interests | 0 to +5 | Your stated interests intersecting the career's domain or title |

The final match score is clamped to 0–100.

**4. Eligibility** deliberately keys off the skill-only score (≥ 20), not the final score. A strong
personality fit alone should never make a career with zero matching skills look attainable.

**5. Confidence** (low/medium/high) is a heuristic over how much signal your profile actually
provides — whether you have taken the personality test, have at least three skills, set an
experience level and interests — plus how close the score sits to the eligibility cutoff. When
confidence is low, the result tells you which inputs are missing.

Market demand is handled separately: it never changes the fit score, only a secondary
`recommendedScore` used for the "best opportunity" sort
([analyzer.service.js](server/src/modules/analyzer/analyzer.service.js)).

The roadmap ([roadmap.service.js](server/src/modules/roadmap/roadmap.service.js)) reuses the same
adjacency data to tag every phase item as have / partial / missing, estimate effort in hours, and
flag when an item depends on an earlier-phase skill you do not yet hold.

## Tech stack

| Layer | Technologies |
|---|---|
| Frontend | React 19, Vite 8, React Router 7, Tailwind CSS 4, framer-motion, Headless UI, lucide-react, axios |
| Frontend state | React Context (`AuthContext`, `ThemeContext`, `Toast`) — no Redux |
| Backend | Node.js, Express 4, Mongoose 8 |
| Database | MongoDB |
| Auth | jsonwebtoken, bcryptjs, httpOnly cookies, cookie-parser |
| Validation | express-validator |
| Security / ops | helmet, cors, compression, express-rate-limit, pino |
| Testing | `node:test` (built-in runner), supertest, mongodb-memory-server |
| CI | GitHub Actions |
| Deployment | Render (API), Vercel (client) |
| Monitoring | Sentry (optional) |

## Architecture

A request travels through fixed layers:

```
React page
  → service (client/src/services/*)
    → shared axios instance (withCredentials: true)
      → /api/<module>
        → routes → validators → validate → controller → service → Mongoose model
```

**Backend — module per feature.** Each feature under `server/src/modules/` is a self-contained
slice with the same layers: `*.routes.js`, `*.controller.js`, `*.service.js`, and usually
`*.validators.js`. Modules: `auth`, `profile`, `analyzer`, `careers`, `roadmap`, `admin`,
`retake-tests`. They mount under `/api/<module>` — with one exception, `analyzer`, which mounts at
`/api/analyze`.

Responsibilities are kept strict:
- **Controllers** are thin: read the request, call the service, respond through the `ApiResponse`
  helper, forward errors with `next(err)`.
- **Services** hold all business logic and database access, and throw `ApiError(status, message)`
  for expected failures.
- **Error middleware** turns those into consistent JSON responses, so no route hand-rolls an error
  shape.
- **Pure utilities** (`gap-engine.js`, `personality-scoring.js`) contain the domain logic and stay
  free of I/O, which is what makes them testable without a database.

[server/src/app.js](server/src/app.js) builds the Express app with no environment validation, no
database connection and no `listen()` — that is what lets tests import it directly with supertest.
[server/src/index.js](server/src/index.js) is bootstrap only: it hard-fails on missing environment
variables, connects to MongoDB, listens, and registers graceful shutdown plus fatal handlers for
`unhandledRejection` and `uncaughtException`.

**Data models** (4): `User`, `CareerPath`, `Skill`, `UserProgress`. Careers reference skills by
ObjectId with a weight and priority; `UserProgress` is unique per (user, career) and stores both
completed skills and completed roadmap items.

**Rate limiting** is layered: 400 requests / 15 min per IP globally, 10 / 15 min on login and
register in production, 30 / 15 min on token refresh, and a per-user limiter (200 / 15 min, keyed by
user ID) on the compute-heavy analyzer and retake-test routes. The per-user limiter sits *after*
authentication so that one user behind a shared campus or office IP cannot exhaust everyone's quota.

## API endpoints

All routes are prefixed with `/api`. Payloads are returned nested under a `data` key.

| Method | Endpoint | Auth | Purpose |
|---|---|---|---|
| GET | `/health` | — | Uptime and DB connection status |
| POST | `/auth/register` | — | Create an account |
| POST | `/auth/login` | — | Log in, set cookies |
| POST | `/auth/refresh` | cookie | Rotate the refresh token |
| POST | `/auth/logout` | — | Clear cookies |
| GET | `/auth/me` | yes | Current user |
| PUT | `/auth/password` | yes | Change password |
| DELETE | `/auth/account` | yes | Delete account |
| GET | `/profile` | yes | Full profile |
| PUT | `/profile` | yes | Update skills, experience, certifications, interests |
| PUT | `/profile/account` | yes | Update name, email, avatar |
| PUT | `/profile/settings` | yes | Theme and notification preferences |
| GET | `/profile/skills` | — | All available skills |
| GET | `/profile/ocean/questions` | — | OCEAN question bank |
| POST | `/profile/ocean` | yes | Submit OCEAN answers |
| GET | `/profile/mbti/questions` | — | MBTI question bank |
| POST | `/profile/mbti` | yes | Submit MBTI answers |
| GET | `/analyze` | yes | Run gap analysis across all careers |
| GET | `/careers` | — | List career paths |
| GET | `/careers/saved` | yes | Saved careers |
| GET | `/careers/:id` | — | Career detail |
| GET | `/careers/:id/analyze` | yes | Analyze one career |
| POST / DELETE | `/careers/:id/save` | yes | Save / unsave a career |
| GET | `/roadmap` | yes | All saved roadmaps with progress |
| GET | `/roadmap/:careerPathId` | yes | Career brief + annotated roadmap |
| PATCH | `/roadmap/:careerPathId/skills/:skillId` | yes | Toggle a required skill |
| PATCH | `/roadmap/:careerPathId/roadmap-items` | yes | Toggle a roadmap item |
| POST | `/retake-tests/ocean` \| `/mbti` \| `/skills` | yes | Retake a test |
| GET | `/retake-tests/history` | yes | Test history timeline |
| POST | `/retake-tests/reset` | yes | Reset all onboarding data |
| GET/POST/PUT/DELETE | `/admin/careers`, `/admin/skills` | admin | Manage content |
| GET/PUT/DELETE | `/admin/users` | admin | Manage users and roles |
| GET | `/admin/analytics` | admin | Platform statistics |

## Folder structure

```
skillbridge/
├── client/
│   ├── src/
│   │   ├── api/           # shared axios instance + 401 refresh interceptor
│   │   ├── components/    # common primitives, layout, admin, charts, roadmap, profile
│   │   ├── constants/     # experience levels, OCEAN/MBTI labels, categories, theme
│   │   ├── context/       # AuthContext, ThemeContext
│   │   ├── features/      # self-contained features (retake-tests)
│   │   ├── hooks/         # useAuth, useFetch
│   │   ├── pages/         # route components, incl. pages/admin
│   │   ├── routes/        # AdminRoute guard
│   │   ├── services/      # thin API wrappers, one folder per backend area
│   │   ├── utils/         # class-name helper, motion presets
│   │   └── App.jsx        # routes, guards, page transitions
│   └── vercel.json
├── server/
│   ├── src/
│   │   ├── config/        # db connection, sentry
│   │   ├── constants/     # OCEAN + MBTI question banks
│   │   ├── middleware/    # authenticate, role, validate, rate limits, error handler
│   │   ├── models/        # User, CareerPath, Skill, UserProgress
│   │   ├── modules/       # auth, profile, analyzer, careers, roadmap, admin, retake-tests
│   │   ├── seed/          # skills + career path seed data and runner
│   │   ├── utils/         # gap-engine, personality-scoring, ApiError, ApiResponse, logger
│   │   ├── app.js         # Express app (import-safe for tests)
│   │   └── index.js       # bootstrap: env checks, DB, listen, shutdown
│   └── tests/
├── .github/workflows/ci.yml
├── .githooks/pre-commit
└── render.yaml
```

## Getting started

### Prerequisites

- Node.js 18 or newer
- MongoDB 6 or newer — a local instance or a MongoDB Atlas cluster

### Installation

```bash
git clone https://github.com/Barath-1B/skillbridge.git
cd skillbridge
```

**Backend**

```bash
cd server
npm install
cp .env.example .env      # then fill in the values below
npm run seed              # one-time: load skills and career paths
npm run dev               # http://localhost:5001
```

**Frontend** (in a second terminal)

```bash
cd client
npm install
cp .env.example .env
npm run dev               # http://localhost:5173
```

### Seeding

`npm run seed` loads **117 skills** and **30 career paths** across 25 domains.

Two things to know before running it:

- It **deletes all existing Skills and CareerPaths** before inserting. It is a reset, not a merge.
- Careers reference required skills **by name**, and the runner resolves those names to ObjectIds.
  If a career names a skill that is not in the skills seed, that requirement is skipped with a
  warning. So when adding a required skill to a career, the name must match the skills seed exactly.

Seeding refuses to run when `NODE_ENV=production` unless `ALLOW_PROD_SEED=true`.


## Usage

1. Register an account and log in.
2. Complete profile setup — pick your experience level and the skills you already have.
3. Take the OCEAN quiz. This one affects your match scores.
4. Optionally take the MBTI quiz; the result is shown on your profile but is not used in scoring.
5. Open the analyzer to see every career path ranked by fit, with the score breakdown, missing
   skills and confidence level for each.
6. Open a career brief to read the full detail and the three-phase roadmap.
7. Save the career and tick off roadmap items as you learn them to track progress.
8. Retake any test from the retake-tests page when your skills change.

To try the admin area, set a user's `role` to `admin` in the database, then visit `/admin`.

## Scripts

**Server**

| Command | Description |
|---|---|
| `npm run dev` | nodemon on `src/index.js` |
| `npm start` | production start |
| `npm run seed` | wipe and reload skills + career paths |
| `npm test` | `node --test` over `tests/` |

**Client**

| Command | Description |
|---|---|
| `npm run dev` | Vite dev server |
| `npm run build` | production build |
| `npm run lint` | ESLint |
| `npm run preview` | serve the production build |

## Testing and CI

Server tests run on Node's built-in test runner — no test framework:

- `tests/gap-engine.test.js` — scoring engine, covered directly because it is pure
- `tests/personality-scoring.test.js` — OCEAN and MBTI scoring helpers
- `tests/auth.api.test.js` — auth API integration test against an in-memory MongoDB via
  `mongodb-memory-server` (the first run downloads a mongod binary)

[CI](.github/workflows/ci.yml) runs the server tests and the client lint + build on every push and
pull request. A pre-commit hook in [.githooks/](.githooks/) runs the relevant checks based on what
you staged; enable it per clone with `git config core.hooksPath .githooks`.

Known gaps, stated plainly: there is no client-side test suite, and no linter configured for the
backend.

## Deployment

- **API** — [render.yaml](render.yaml) defines a Render web service rooted at `server/`, with
  `/api/health` as the health check.
- **Client** — Vercel, with [client/vercel.json](client/vercel.json) rewriting all paths to `/` so
  client-side routing works on refresh.

Setting `NODE_ENV=production` changes three things: cookies become `secure` with
`sameSite: 'none'` for the cross-origin Vercel ↔ Render setup, auth rate limits tighten from 1000 to
10 attempts per 15 minutes, and seeding is blocked.

## Future improvements

- Client-side test suite (React Testing Library) and a linter for the backend
- Calibrate the confidence heuristic against real outcome data instead of signal completeness
- OAuth login (Google/GitHub) alongside email/password
- Resume upload with skill extraction, so profile setup is not fully manual
- Exportable or shareable roadmap (PDF)
- Admin analytics beyond counts — score distributions and drop-off points
- Expand the skill adjacency graph; roughly 60% of seeded skills currently define related skills

## Learning outcomes

Building this taught me more about structure than about any single library:

- **Keeping domain logic pure pays off immediately.** The scoring engine takes plain objects and
  returns a plain object. That one decision is why it can be unit tested without a database, and why
  both the analyzer and the roadmap can reuse it without duplication.
- **Layered architecture only helps if the boundaries are enforced.** Controllers that stay thin and
  services that own all data access made features predictable to add — every module looks the same,
  so there is no re-learning cost.
- **Sessions are more than issuing a token.** Implementing rotating refresh tokens meant thinking
  about hash storage, replay detection, multi-device caps, and a client interceptor that does not
  fire five refreshes when five requests fail at once.
- **Schema design decides what is expensive later.** Referencing skills by ObjectId while seeding by
  name required a resolution step, and the compound unique index on `UserProgress` prevents a whole
  class of duplicate-row bugs.
- **Match the tool to the size of the problem.** React Context was enough for this app's state; a
  Redux store would have been ceremony, not structure.
- **CI is worth setting up early.** Tests and lint running on every push caught drift I would
  otherwise have found much later.

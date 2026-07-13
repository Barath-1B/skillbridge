# SkillBridge — Upgrade Roadmap
> Systematic plan covering pre-deploy fixes, MBTI integration, OCEAN improvements, and production hardening.

---

## Phase Overview

| Phase | Scope | Effort | Blocks deploy? |
|-------|-------|--------|----------------|
| 0 | Pre-deploy blockers | ~1 hr | Yes |
| 1 | MBTI personality test | ~6 hr | No |
| 2 | OCEAN test improvements | ~3 hr | No |
| 3 | Production hardening | ~4 hr | No |
| 4 | CI/CD + testing | ~3 hr | No |

Total: ~17 hours of focused work. Phases 1–4 can be parallelized after Phase 0.

---

# Phase 0 — Pre-Deploy Blockers (Critical)

**Goal:** Make the app safe to deploy. ~1 hour total.

## 0.1 Production seed guard
**File:** `server/src/seed/run-seed.js`

Add to the top of `seed()` function:
```js
if (process.env.NODE_ENV === 'production' && !process.env.ALLOW_PROD_SEED) {
  console.error('Refusing to seed in production. Set ALLOW_PROD_SEED=true to override.');
  process.exit(1);
}
```

**Why:** Current code does `deleteMany({})` unconditionally on both Skill and CareerPath collections. One accidental run against Atlas wipes all production data including user-generated content.

## 0.2 Health endpoint
**File:** `server/src/index.js`

Add before the auth-protected routes:
```js
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    uptime: process.uptime(),
    mongo: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    timestamp: new Date().toISOString(),
  });
});
```

**Why:** Render needs a `healthCheckPath` to detect crashed instances. Without it, Render will keep routing traffic to a dead pod.

Update `render.yaml`:
```yaml
services:
  - type: web
    name: skillbridge-api
    healthCheckPath: /api/health
    ...
```

## 0.3 Standardize env var docs
**Files:** `client/.env.example`, `CLAUDE.md`, `docs/deployment.md`

Confirmed actual variable in use: `VITE_API_URL` (verified in `client/src/api/axios.js:4`).

Update any reference to `VITE_API_BASE_URL` in documentation to `VITE_API_URL`.

## 0.4 Verification
```bash
# Local
NODE_ENV=production npm run seed   # should refuse
curl http://localhost:5001/api/health   # should return JSON ok
```

---

# Phase 1 — MBTI Personality Test

**Goal:** Add MBTI alongside OCEAN in the Personality tab. ~6 hours.

Source: 70-question bank from `rauf-21/mbti-personality-test-app`.

## 1.1 Backend — User model
**File:** `server/src/models/user.model.js`

Add:
```js
mbtiType: { type: String, maxlength: 4, default: null },
mbtiScores: {
  E: Number, I: Number,
  S: Number, N: Number,
  T: Number, F: Number,
  J: Number, P: Number,
},
lastMbtiTestDate: Date,
```

## 1.2 Backend — Question bank
**File (new):** `server/src/constants/mbti-questions.js`

70 questions in this format:
```js
{
  id: 1,
  text: "At a party do you:",
  options: [
    { value: 'A', label: 'Interact with many, including strangers', dimension: 'E' },
    { value: 'B', label: 'Interact with a few, known to you', dimension: 'I' },
  ],
}
```

Distribution: ~17–18 questions per dichotomy across E/I, S/N, T/F, J/P.

## 1.3 Backend — Scoring service
**File:** `server/src/modules/profile/profile.service.js`

Add `computeAndSaveMbti(userId, answers)`:
```js
// Count letter frequencies
const counts = { E:0, I:0, S:0, N:0, T:0, F:0, J:0, P:0 };
for (const { questionId, answer } of answers) {
  const q = questionMap[questionId];
  const opt = q.options.find(o => o.value === answer);
  counts[opt.dimension]++;
}

// Derive type (ties favor first letter)
const type =
  (counts.E >= counts.I ? 'E' : 'I') +
  (counts.S >= counts.N ? 'S' : 'N') +
  (counts.T >= counts.F ? 'T' : 'F') +
  (counts.J >= counts.P ? 'J' : 'P');

// Confidence per dimension
const total = (a, b) => counts[a] + counts[b];
const scores = {
  E: Math.round(counts.E / total('E','I') * 100),
  I: Math.round(counts.I / total('E','I') * 100),
  // ... S, N, T, F, J, P
};

await User.findByIdAndUpdate(userId, { mbtiType: type, mbtiScores: scores });
```

## 1.4 Backend — Routes, validators, controller
| File | Add |
|------|-----|
| `server/src/modules/profile/profile.routes.js` | `GET /profile/mbti/questions`, `POST /profile/mbti` |
| `server/src/modules/profile/profile.validators.js` | `mbtiValidators`: exactly 70 answers, value A or B |
| `server/src/modules/profile/profile.controller.js` | `submitMbti` handler |
| `server/src/modules/retake-tests/retake-tests.routes.js` | `POST /retake-tests/mbti` |
| `server/src/modules/retake-tests/retake-tests.service.js` | `retakeMbtiTest()` (same logic + sets `lastMbtiTestDate`) |

## 1.5 Frontend — Constants
**File (new):** `client/src/constants/mbti.js`

```js
export const MBTI_TYPES = {
  ENFP: { code: 'ENFP', epithet: 'The Campaigner', description: '...' },
  INTJ: { code: 'INTJ', epithet: 'The Architect', description: '...' },
  // ... 16 total
};

export const MBTI_DIMENSIONS = [
  { pair: ['E', 'I'], labels: { E: 'Extraverted', I: 'Introverted' } },
  { pair: ['S', 'N'], labels: { S: 'Sensing', N: 'Intuitive' } },
  { pair: ['T', 'F'], labels: { T: 'Thinking', F: 'Feeling' } },
  { pair: ['J', 'P'], labels: { J: 'Judging', P: 'Perceiving' } },
];
```

## 1.6 Frontend — MBTI quiz page
**File (new):** `client/src/pages/MbtiQuiz.jsx`

Model after `OceanQuiz.jsx`:
- One question at a time
- Framer-motion transitions
- Auto-advance 250ms after selection
- Progress: "Question 23 of 70"
- Submit → `POST /profile/mbti` → redirect to `/profile`

## 1.7 Frontend — Profile page integration
**File:** `client/src/pages/ProfilePage.jsx`

Personality tab — add **above** the existing OCEAN section:
```
┌──────────────────────────────────────┐
│  MBTI Personality Type   [Take test] │
│  ┌──────┐  ENFP — The Campaigner     │
│  │ ENFP │  "Imaginative, empathetic  │
│  └──────┘   idealist"                │
│                                      │
│  E ████████░░ 71%   I 29%            │
│  N ██████░░░░ 64%   S 36%            │
│  F █████░░░░░ 57%   T 43%            │
│  P ████████░░ 73%   J 27%            │
└──────────────────────────────────────┘
```

If `user.mbtiType` is null, show a CTA card linking to `/quiz/mbti`.

## 1.8 Frontend — Retake support
| File | Change |
|------|--------|
| `client/src/features/retake-tests/components/RetakeMbtiTest.jsx` | New — copy pattern from `RetakeOceanTest.jsx` |
| `client/src/features/retake-tests/RetakeTestsPage.jsx` | Add MBTI tab |
| `client/src/features/retake-tests/components/TestHistory.jsx` | Show `lastMbtiTestDate` |

## 1.9 Frontend — Routing
Add `/quiz/mbti` route → `MbtiQuiz` component.

## 1.10 Verification
- Register fresh user → no MBTI section visible (CTA card shown)
- Click "Take MBTI test" → answer 70 questions → redirected to profile
- Profile shows type badge + confidence bars
- Retake tests page → MBTI tab present alongside OCEAN/Skills

---

# Phase 2 — OCEAN Test Improvements

**Goal:** Better statistical reliability + UX consistency. ~3 hours.

## 2.1 Expand question bank: 12 → 30
**File:** `server/src/constants/ocean-questions.js`

Add IDs 13–30 matching the existing format. Target 6 questions per trait (up from ~2–3).

## 2.2 Update validators
**Files:** `server/src/modules/profile/profile.validators.js`, `server/src/modules/retake-tests/retake-tests.validators.js`

Change `min: 12, max: 12` → `min: 30, max: 30` in `oceanValidators`. Change `questionId` max from 12 to 30.

## 2.3 Fix Onboarding step 3 — one question at a time
**File:** `client/src/pages/Onboarding.jsx`

Replace current `{questions.map(...)}` scrollable list with single-question card matching `OceanQuiz.jsx`. Add Prev/Next nav and "Question X of 30" progress.

## 2.4 Enrich trait metadata
**File:** `client/src/constants/ocean.js`

```js
export const OCEAN_TRAITS = [
  {
    key: 'O',
    label: 'Openness',
    description: 'Curiosity, creativity, openness to new experiences',
    highLabel: 'Highly imaginative & exploratory',
    lowLabel: 'Practical & consistent',
  },
  // ... C, E, A, N
];
```

## 2.5 Tier labels on Profile bars
**File:** `client/src/pages/ProfilePage.jsx`

Below each bar, show tier:
- 0–29: Low | 30–44: Below avg | 45–55: Average | 56–70: Above avg | 71–100: High

## 2.6 Verification
```bash
curl http://localhost:5001/api/profile/ocean/questions   # → 30 questions
```
- Onboarding step 3: questions appear one at a time
- Profile Personality tab: each bar has a tier label and description

---

# Phase 3 — Production Hardening

**Goal:** Make the app resilient in production. ~4 hours.

## 3.1 Refresh token flow
**Files:** `server/src/modules/auth/*`

Current: single 7-day JWT. After 7 days users get silently logged out.

Add:
- `refreshToken` field on User model (random string, 30-day TTL)
- `POST /auth/refresh` endpoint
- Frontend axios interceptor: on 401, attempt `/auth/refresh` once before redirecting to login

## 3.2 Error tracking
**Dependency:** `@sentry/node` (server), `@sentry/react` (client)

Wrap Express in Sentry handler, init React in `main.jsx`. Add `SENTRY_DSN` env var.

## 3.3 Structured logging
**File:** `server/src/index.js`

Replace `console.log` with `pino` or `winston`:
```js
const logger = require('pino')();
logger.info({ port: PORT }, 'Server started');
```

Critical for Render log search.

## 3.4 Per-user rate limiting
**File:** `server/src/middleware/rate-limiter.js`

Current limiter is IP-only. For authenticated routes, key by `req.user.userId` to prevent one user behind shared IP from blocking others.

## 3.5 Keep-alive for Render free tier
Render free tier spins down after 15 min → 30s cold start on next request.

Either:
- Upgrade to Starter ($7/mo) — recommended for production
- Set up UptimeRobot to ping `/api/health` every 10 min (free workaround)

## 3.6 Verification
- Sentry dashboard receives a test exception
- Auth flow: log in, wait 1 hour, refresh page → still logged in via refresh
- Logs in Render dashboard are searchable as JSON

---

# Phase 4 — CI/CD + Testing

**Goal:** Prevent broken commits from reaching prod. ~3 hours.

## 4.1 GitHub Actions CI
**File (new):** `.github/workflows/ci.yml`

```yaml
name: CI
on: [push, pull_request]
jobs:
  lint-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20' }
      - run: cd server && npm ci && npm test
      - run: cd client && npm ci && npm run lint && npm run build
```

## 4.2 Smoke tests
**Files (new):** `server/src/__tests__/*.test.js`

At minimum:
- Auth: register → login → me → logout
- OCEAN scoring: submit 30 answers → returns valid `{ O,C,E,A,N }`
- MBTI scoring: submit 70 answers → returns valid 4-letter type
- Gap engine: known input → expected match score

Use `vitest` or `jest` + `supertest`.

## 4.3 Pre-commit hook
**File:** `package.json` (root) or `.husky/`

```json
"husky": {
  "hooks": {
    "pre-commit": "npm run lint",
    "pre-push": "npm test"
  }
}
```

## 4.4 Verification
- Push a deliberately broken commit → CI fails
- Push a working commit → CI passes → Render auto-deploys

---

# Execution Order

```
Day 1: Phase 0 (1 hr)  →  Deploy to Render + Vercel
Day 2: Phase 1 MBTI (6 hr)
Day 3: Phase 2 OCEAN (3 hr)
Day 4: Phase 3 hardening (4 hr)  // can run parallel to Day 3 if multi-agent
Day 5: Phase 4 CI/CD (3 hr)
```

## Multi-agent parallelization
After Phase 0, these can run in parallel:

| Agent | Phase | Files touched (disjoint) |
|-------|-------|-------------------------|
| Agent A | Phase 1 — MBTI | `server/modules/profile/*`, `server/constants/mbti-questions.js`, `client/pages/MbtiQuiz.jsx`, `client/constants/mbti.js`, `client/features/retake-tests/*` |
| Agent B | Phase 2 — OCEAN | `server/constants/ocean-questions.js`, `server/validators`, `client/pages/Onboarding.jsx`, `client/constants/ocean.js` |
| Agent C | Phase 3 — Hardening | `server/modules/auth/*`, `server/middleware/*`, `server/index.js` |

**Shared file conflict:** `client/pages/ProfilePage.jsx` — touched by Agent A (MBTI section) and Agent B (OCEAN tier labels). Either:
- Run sequentially (A then B), or
- Merge agents A and B into one ProfilePage edit at the end

---

# Quick-Win Priority

If time is limited, do these in order:

1. **Phase 0** (1 hr) — must-do before any production deploy
2. **Phase 2** (3 hr) — biggest UX win for existing feature
3. **Phase 1** (6 hr) — new feature, high user-visible value
4. **Phase 4.1** (30 min) — basic CI pipeline
5. **Phase 3.2** (30 min) — Sentry, for visibility into production errors

Remaining items can be deferred until usage scales.

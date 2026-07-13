# SkillBridge — End-to-End Project Report

> **Find your gap. Bridge it.**
> A career-path advisor for CS students and early-career professionals.

SkillBridge takes a user's skills, certifications, experience level, and personality
(Big Five / OCEAN), compares them against a curated catalogue of ~30 tech career paths,
and returns a **weighted match score** for each, plus a **gap analysis** (which skills are
missing) and a **3-phase milestone roadmap** with a per-item progress tracker.

This document is the single, code-accurate reference for the whole project — concept,
stack, architecture, code structure, data models, matching engine, API surface, security,
configuration, deployment, and status. It is written directly from the source code, so
where it differs from older notes in `docs/`, this report is authoritative.

---

## 1. Executive Summary

| Aspect | Detail |
|---|---|
| **Product** | SkillBridge — personalized tech-career matcher & roadmap generator |
| **Repo directory** | `careertrack` (product name: SkillBridge) |
| **Type** | Full-stack MERN web application |
| **Target users** | CS students and early-career professionals deciding/transitioning careers |
| **Core value** | Probabilistic match scores + skill-gap analysis + a 3-phase bridging roadmap |
| **Differentiator** | Personality-aware scoring via the OCEAN (Big Five) model |
| **Dataset** | 31 curated career paths, 105 skills/knowledge/certs across many domains |

### The problem it solves
Students and juniors face an overwhelming number of tech career options and don't know
which fit their existing skills and temperament, nor what to learn next. SkillBridge turns
"what should I become?" into a ranked, evidence-based shortlist with a concrete learning
plan.

### Design philosophy
- **Value-first journey** — users see real analysis quickly; auth gates *saving* progress.
- **Config/data-driven careers** — career paths live in the database (seeded), so adding a
  path needs no code change.
- **Single-responsibility services** — the gap/scoring logic is a pure function isolated
  from web concerns.
- **Standardized API envelope** — every response uses an `ApiResponse` shape.

---

## 2. Technology Stack

### Frontend (`client/`)
| Concern | Technology |
|---|---|
| Framework | React 19 |
| Build tool | Vite 8 |
| Routing | React Router DOM 7 |
| State | Redux Toolkit 2 + React Redux 9 |
| Styling | Tailwind CSS 4 (+ PostCSS, autoprefixer) |
| Animation | framer-motion 12 |
| HTTP client | axios 1 |
| UI primitives | @headlessui/react, lucide-react icons |
| Fonts | @fontsource Inter + Sora |
| Lint | ESLint 10 + react-hooks / react-refresh plugins |

### Backend (`server/`)
| Concern | Technology |
|---|---|
| Runtime | Node.js (CommonJS) |
| Web framework | Express 4 |
| Database / ODM | MongoDB + Mongoose 8 |
| Auth | jsonwebtoken (JWT) in httpOnly cookies + bcryptjs |
| Validation | express-validator |
| Security | helmet, express-rate-limit, cors, cookie-parser, xss |
| Performance | compression (gzip) |
| Config | dotenv |
| Dev | nodemon |

### Infrastructure
- **API hosting:** Render (`render.yaml`, Node web service).
- **Client hosting:** Vercel-style SPA (`client/vercel.json` rewrite to `index.html`).

---

## 3. Repository Layout

```
careertrack/
├── client/            # React + Vite single-page app
├── server/            # Node + Express REST API
├── docs/              # Project documentation (concept, architecture, this report)
├── render.yaml        # Render deployment manifest (API service)
└── README.md          # Quick-start
```

---

## 4. Backend Architecture

SkillBridge's backend uses a **feature-module** pattern. Each domain feature is a folder
under `server/src/modules/` containing its own routes, controller, service, and (where
needed) validators.

### Request flow
```
HTTP request
   ↓
Route (modules/<feature>/*.routes.js)
   ↓
[ rate limiter ]              (auth routes add a stricter limiter)
   ↓
authenticate middleware       (JWT from cookie/header → req.user)   [protected routes]
   ↓
role middleware               (RBAC, admin routes only)
   ↓
validators + validate         (express-validator rules → 400 on failure)
   ↓
Controller (thin HTTP handler)
   ↓
Service (business logic, talks to models)
   ↓
Model (Mongoose schema → MongoDB)
   ↓
ApiResponse envelope → res.json
   ↓
error.middleware (centralized error → ApiError → JSON)
```

### Server bootstrap — `server/src/index.js`
On startup the server:
1. Loads `.env` via dotenv.
2. **Validates required env vars** (`MONGO_URI`, `JWT_SECRET`, `PORT`) and exits if any are missing.
3. Applies security/performance middleware: `helmet()`, `compression()`.
4. Installs a **global rate limiter** — 100 requests / 15 min per IP (standard `RateLimit-*` headers).
5. Connects to MongoDB (`connectDB`), exiting on failure.
6. Configures **CORS** with an origin allowlist (`CLIENT_URL` + localhost dev ports) and `credentials: true`.
7. Parses JSON, urlencoded bodies, and cookies.
8. Exposes a **health check** at `GET /api/health` returning status, uptime, Mongo connection state, and a timestamp.
9. Mounts feature routers under `/api/*`.
10. Registers the global error handler.
11. Listens on `PORT` and wires **graceful shutdown** on `SIGINT`/`SIGTERM` (closes server + Mongo connection).

### Route mount points
| Mount | Router |
|---|---|
| `/api/auth` | auth module |
| `/api/profile` | profile module |
| `/api/analyze` | analyzer module |
| `/api/careers` | careers module |
| `/api/roadmap` | roadmap module |
| `/api/admin` | admin module |
| `/api/retake-tests` | retake-tests module |
| `/api/health` | inline health check |

### Database connection — `server/src/config/db.js`
`connectDB()` connects with `serverSelectionTimeoutMS: 5000` and `socketTimeoutMS: 45000`,
and registers `disconnected` / `reconnected` connection-event logging.

### Middleware layer (`server/src/middleware/`)
| File | Responsibility |
|---|---|
| `authenticate.middleware.js` | Verifies the JWT and attaches the user to the request; 401 if missing/invalid |
| `role.middleware.js` | `requireRole('admin')` — RBAC guard for admin routes |
| `validate.middleware.js` | Wraps express-validator: collects rule failures → 400 |
| `error.middleware.js` | Global error handler — maps `ApiError`/unknown errors to the JSON envelope |

### Utilities (`server/src/utils/`)
| File | Responsibility |
|---|---|
| `ApiResponse.js` | Standard success envelope `{ statusCode, data, message }` |
| `ApiError.js` | Operational error type carrying an HTTP status code |
| `gap-engine.js` | Pure matching/gap-analysis + OCEAN modifier (see §7) |

---

## 5. Backend Code Structure (module by module)

```
server/src/
├── index.js                       # App bootstrap & route mounting
├── config/
│   └── db.js                      # Mongoose connection
├── constants/
│   └── ocean-questions.js         # OCEAN questionnaire items
├── middleware/
│   ├── authenticate.middleware.js
│   ├── role.middleware.js
│   ├── validate.middleware.js
│   └── error.middleware.js
├── models/
│   ├── user.model.js
│   ├── skill.model.js
│   ├── career-path.model.js
│   └── user-progress.model.js
├── modules/
│   ├── auth/      auth.routes.js · auth.controller.js · auth.service.js · auth.validators.js · index.js
│   ├── profile/   profile.routes.js · profile.controller.js · profile.service.js · profile.validators.js
│   ├── analyzer/  analyzer.routes.js · analyzer.controller.js · analyzer.service.js · index.js
│   ├── careers/   careers.routes.js · careers.controller.js · careers.service.js · index.js
│   ├── roadmap/   roadmap.routes.js · roadmap.controller.js · roadmap.service.js
│   ├── admin/     routes.js · controller.js · service.js · index.js
│   └── retake-tests/ retake-tests.routes.js · .controller.js · .service.js · .validators.js · index.js
├── utils/
│   ├── ApiResponse.js
│   ├── ApiError.js
│   └── gap-engine.js
└── seed/
    ├── run-seed.js                # Orchestrates seeding (with prod guard)
    ├── skills-az.seed.js          # 105 skills/knowledge/certs
    ├── skills.seed.js             # (legacy/auxiliary skill set)
    └── careers.seed.js            # 31 career paths (by skill name)
```

### Module responsibilities
- **auth** — register, login (sets httpOnly JWT cookie), logout, `me`, password change, account deletion. Adds a stricter auth rate limiter (10/15 min in prod, 1000 in dev).
- **profile** — get/update profile, update account & settings, list skills, fetch OCEAN questions, submit OCEAN answers.
- **analyzer** — `GET /api/analyze`: runs the gap engine for the logged-in user against **all** career paths, returns results sorted by match score.
- **careers** — list/filter careers, get one career detail, per-career analysis, save/unsave a career (creates/removes a `UserProgress`), list saved careers.
- **roadmap** — list the user's roadmaps, build the full **career brief** (career + analysis + annotated 3-phase roadmap + progress), and toggle roadmap-item / skill completion.
- **admin** — RBAC-guarded CRUD over careers and skills, user listing, and analytics.
- **retake-tests** — re-take the OCEAN test, re-take the skills selection, view test history, and reset all onboarding data.

---

## 6. Data Models (Mongoose)

> These reflect the actual schema files in `server/src/models/`.

### User — `user.model.js`
```js
{
  name:      String (required, trim),
  email:     String (required, unique, lowercase, trim),
  password:  String (required, bcrypt hash),
  role:      'user' | 'admin' (default 'user'),
  avatarUrl: String (default ''),
  theme:     'light' | 'dark' | 'system' (default 'system'),
  notificationPreferences: {
    emailUpdates: Boolean (default true),
    productNews:  Boolean (default false),
    weeklyDigest: Boolean (default true),
  },
  currentSkills: [ObjectId → Skill],     // skills the user already has
  certifications: [String] (default []),
  experience: 'student' | '0-1yr' | '1-3yr' | '3+yr',
  interests:  [String] (default []),
  oceanScore: {                          // Big Five, each 0–100, default 50
    O, C, E, A, N: Number (0–100, default 50)
  },
  lastOceanTestDate:  Date,
  lastSkillsTestDate: Date,
  // timestamps: createdAt, updatedAt
}
```

### Skill — `skill.model.js`
```js
{
  name:     String (required, unique, trim),
  category: 'technical-skill' | 'knowledge' | 'certification' | 'soft-skill',
  tags:     [String] (default []),
  description: String (trim),
  difficultyLevel: 'beginner' | 'intermediate' | 'advanced',
  resources: [{ title, url, type: 'course'|'book'|'tutorial'|'documentation', platform }],
  // timestamps
}
```

### CareerPath — `career-path.model.js`
```js
{
  title:       String (required, unique, trim),
  domain:      String (required),
  description: String (required),
  requiredSkills: [{
    skillId:  ObjectId → Skill (required),
    weight:   Number (1–10, required),       // importance
    priority: 'high' | 'medium' | 'low' (required),
  }],
  phases: [{                                  // EXACTLY 3 phases enforced
    phase:           Number (1–3, required),
    title:           String (required),       // e.g. Foundation / Core / Advanced
    skills:          [String] (free-text skill names),
    milestoneMonths: String (required),
  }],   // validator: phases.length === 3
  resources: [{ title, url, type: 'video'|'article'|'course'|'cert' }],
  certifications: [String] (default []),
  advantages:     [String] (default []),
  estimatedTimeToBridge: String (required),
  demand:     'low' | 'medium' | 'high' (required),
  difficulty: 'beginner' | 'intermediate' | 'advanced' (required),
  // timestamps
}
```

### UserProgress — `user-progress.model.js`
```js
{
  userId:       ObjectId → User (required),
  careerPathId: ObjectId → CareerPath (required),

  // Legacy: mastered Skill ObjectIds (written by the older skills toggle endpoint)
  completedSkills: [ObjectId → Skill],

  // Current: per-roadmap-item checklist state
  completedRoadmapItems: [{
    phase:     Number (1–3, required),
    skillName: String (required, trim),
  }],

  percentComplete: Number (0–100, default 0),
  // timestamps
}
// Unique compound index: { userId, careerPathId } → one progress doc per user per career
```

### Relationship summary
```
User ──< currentSkills >──── Skill
User ──< UserProgress >───── CareerPath
CareerPath ──< requiredSkills.skillId >── Skill
CareerPath ── phases[] (embedded; phase skills are free-text strings)
UserProgress ── completedRoadmapItems[] (embedded {phase, skillName})
```

---

## 7. The Matching / Gap Engine

The scoring logic lives in `server/src/utils/gap-engine.js` as a **pure function**
(`analyzeCareerPath`) plus an OCEAN modifier (`computeOceanModifier`). The analyzer and
careers services orchestrate it.

### Skill match (weighted)
For a given career path, each required skill carries a `weight` (1–10). The engine sums the
weights of matched vs. all required skills:

```
weightedScore = round( Σ(weight of matched skills) / Σ(weight of all required skills) × 100 )
```

Matched skills are those whose `skillId` is in the user's `currentSkills` set
(O(1) `Set` lookup). Unmatched required skills become the **missing-skills gap**.

### OCEAN personality modifier
Each career **domain** has an ideal Big Five profile in `DOMAIN_OCEAN_PROFILES`:

| Domain | O | C | E | A | N |
|---|---|---|---|---|---|
| Artificial Intelligence | 85 | 80 | 45 | 50 | 30 |
| Web Development | 70 | 70 | 65 | 60 | 35 |
| Data & Analytics | 65 | 85 | 50 | 60 | 30 |
| Healthcare Tech | 60 | 80 | 60 | 80 | 40 |
| FinTech | 55 | 90 | 55 | 45 | 35 |
| Security | 75 | 85 | 40 | 40 | 55 |
| Hardware/IoT | 70 | 85 | 35 | 45 | 30 |
| Aerospace & Defense | 75 | 95 | 40 | 50 | 25 |

The modifier is computed from the **mean absolute deviation** between the user's OCEAN
scores and the domain ideal:

```
avgDeviation = mean( |userTrait − idealTrait| ) over O,C,E,A,N
modifier     = 10 − (avgDeviation / 50) × 15      // 0 deviation → +10; ≥50 → −5
modifier     = clamp(modifier, −5, +10)            // rounded to an integer
```

If a domain has no ideal profile, the modifier is `0`.

### Final score
```
matchScore = clamp( weightedScore + oceanBonus, 0, 100 )
```

The engine also returns a **certification gap** (case-insensitive comparison of the user's
certifications against the career's required `certifications`).

### Orchestration — `analyzer.service.js`
`runAnalysis(userId)`:
1. Loads the user (populating `currentSkills`, excluding password).
2. Loads **all** career paths (populating `requiredSkills.skillId`).
3. Builds the user's skill-ID `Set`.
4. Runs `analyzeCareerPath` per career, attaching career metadata.
5. Sorts results by `matchScore` descending.
6. Returns `{ results, totalPaths, eligibleCount (matchScore ≥ 20), userSkillCount, hasCompletedProfile }`.

`careers.service.js` reuses the same engine for single-career analysis (`analyzeCareer`)
and computes `completedSkills`/`percentComplete` on save.

---

## 8. API Reference

All responses use the standard envelope:

```js
{ statusCode: Number, data: Object, message: String }
```

Errors follow the same shape with a 4xx/5xx `statusCode` and a descriptive `message`.
Auth tokens are issued as **httpOnly cookies** (7-day expiry by default).

### Auth — `/api/auth`
| Method | Path | Auth | Purpose |
|---|---|---|---|
| POST | `/register` | public (rate-limited) | Create account, set JWT cookie |
| POST | `/login` | public (rate-limited) | Authenticate, set JWT cookie |
| POST | `/logout` | public | Clear JWT cookie |
| GET | `/me` | required | Current user profile |
| PUT | `/password` | required | Change password |
| DELETE | `/account` | required | Delete account |

### Profile — `/api/profile`
| Method | Path | Auth | Purpose |
|---|---|---|---|
| GET | `/` | required | Get profile (populated skills) |
| PUT | `/` | required | Update profile (experience, skills, certs, interests) |
| PUT | `/account` | required | Update account (name/email/avatar) |
| PUT | `/settings` | required | Update theme / notification prefs |
| GET | `/skills` | public | List skills (optional category filter) |
| GET | `/ocean/questions` | public | Fetch the OCEAN questionnaire |
| POST | `/ocean` | required | Submit OCEAN answers → compute O/C/E/A/N |

### Analyzer — `/api/analyze`
| Method | Path | Auth | Purpose |
|---|---|---|---|
| GET | `/` | required | Gap analysis for the user across all career paths, sorted by match |

### Careers — `/api/careers`
| Method | Path | Auth | Purpose |
|---|---|---|---|
| GET | `/` | public | List/filter careers (`domain`, `difficulty`, `demand`) |
| GET | `/saved` | required | List the user's saved careers *(declared before `/:id`)* |
| GET | `/:id` | public | Single career detail (populated required skills) |
| GET | `/:id/analyze` | required | Gap analysis for one career |
| POST | `/:id/save` | required | Save career → upsert `UserProgress` |
| DELETE | `/:id/save` | required | Unsave career (404 if not saved) |

### Roadmap — `/api/roadmap` (all routes require auth)
| Method | Path | Purpose |
|---|---|---|
| GET | `/` | List the user's roadmaps with match score, gap count, progress |
| GET | `/:careerPathId` | Full career brief: career + analysis + annotated 3-phase roadmap + progress |
| PATCH | `/:careerPathId/roadmap-items` | Toggle a single roadmap item by `{ phase, skillName }` |
| PATCH | `/:careerPathId/skills/:skillId` | *(Legacy)* Toggle a Skill ObjectId in `completedSkills` |

### Admin — `/api/admin` (auth + `requireRole('admin')`)
| Method | Path | Purpose |
|---|---|---|
| GET / POST | `/careers` · `/careers` | List / create career paths |
| PUT / DELETE | `/careers/:id` | Update / delete a career path |
| GET / POST | `/skills` · `/skills` | List / create skills |
| PUT / DELETE | `/skills/:id` | Update / delete a skill |
| GET | `/users` | List users |
| GET | `/analytics` | Platform analytics |

### Retake-tests — `/api/retake-tests` (all require auth)
| Method | Path | Purpose |
|---|---|---|
| POST | `/ocean` | Retake the OCEAN personality test |
| POST | `/skills` | Retake the skills-selection test |
| GET | `/history` | Test history / timeline |
| POST | `/reset` | Reset all onboarding data (start over) |

### Health
| Method | Path | Purpose |
|---|---|---|
| GET | `/api/health` | Status, uptime, Mongo connection state, timestamp |

---

## 9. Frontend Architecture

### App composition — `client/src/App.jsx`
```
<Provider store>                 # Redux
  <AuthProvider>                 # auth/session context
    <ToastProvider>              # global toast notifications
      <BrowserRouter>
        <AppShell>               # header / sidebar / footer chrome
          <AnimatedRoutes/>      # framer-motion page transitions
```

### Route table
| Path | Page | Guard |
|---|---|---|
| `/` | Landing | public |
| `/login` | Login | public |
| `/register` | Register | public |
| `/setup/profile` | ProfileSetup | ProtectedRoute |
| `/setup/ocean` | OceanQuiz | ProtectedRoute |
| `/analyze` | AnalyzerResults | ProtectedRoute |
| `/dashboard` | Dashboard | ProtectedRoute |
| `/career/:id` | CareerBrief | ProtectedRoute |
| `/roadmap/:id` | CareerBrief | ProtectedRoute |
| `/retake-tests` | RetakeTestsPage | ProtectedRoute |
| `/profile` | ProfilePage | ProtectedRoute |
| `/settings` · `/settings/:tab` | SettingsPage | ProtectedRoute |
| `*` | NotFound | public |

### Folder roles (`client/src/`)
| Folder | Purpose |
|---|---|
| `pages/` | Route-level screens (Landing, Login, Register, Dashboard, CareerBrief, ProfileSetup, OceanQuiz, AnalyzerResults, Onboarding, ProfilePage, SettingsPage, NotFound) + `pages/admin/` (AdminDashboard, AdminCareers, AdminSkills, AdminUsers) |
| `features/retake-tests/` | Self-contained feature: page, components (RetakeOceanTest, RetakeSkillsTest, TestHistory), styles |
| `components/common/` | Reusable UI: Button, Card, Modal, Input, Textarea, Dropdown, Badge, Avatar, Spinner, Skeleton, Toast, ProgressBar, Switch, EmptyState, FormError, PageContainer, PasswordInput |
| `components/layout/` | AppShell, Header, Footer, Sidebar, MobileDrawer, Logo, ThemeToggle |
| `components/charts/` | MatchScoreChart |
| `components/admin/` | CareerForm, SkillForm |
| `services/` | Axios API functions per feature (auth, profile, analyzer, explorer, roadmap, admin, settings, retake-tests) |
| `store/` | Redux store + slices (authSlice, profileSlice, careerSlice) |
| `context/` | AuthContext, ThemeContext |
| `hooks/` | useAuth, useFetch |
| `constants/` | experience, ocean, theme |
| `utils/` | cx (classnames), motion (framer-motion variants) |
| `api/` | axios.js (base instance with credentials/interceptors) |

---

## 10. User Journey & Data Flow

1. **Landing** — pitch + call to action.
2. **Register / Login** — JWT issued as httpOnly cookie; `AuthContext` holds session.
3. **Profile setup** (`/setup/profile`) — select current skills, experience, certifications, interests → `PUT /api/profile`.
4. **OCEAN quiz** (`/setup/ocean`) — answer the questionnaire → `POST /api/profile/ocean` computes O/C/E/A/N (default 50 per trait).
5. **Analyze** (`/analyze`) — `GET /api/analyze` runs the gap engine across all 31 careers; results sorted by match score with eligible count (≥20%).
6. **Career brief** (`/career/:id`) — `GET /api/roadmap/:id` returns the career, analysis, and an **annotated 3-phase roadmap** (each phase skill flagged *have*/*missing*).
7. **Save roadmap** — `POST /api/careers/:id/save` upserts a `UserProgress` doc.
8. **Track progress** — `PATCH /api/roadmap/:id/roadmap-items` toggles `{ phase, skillName }`; `percentComplete` recomputes against total roadmap items.
9. **Dashboard** (`/dashboard`) — Explore vs. My Roadmaps with progress bars.
10. **Retake / reset** (`/retake-tests`) — re-run OCEAN or skills tests, view history, or reset onboarding.
11. **Admin** (`/pages/admin/*`) — admin-only CRUD of careers/skills, user list, analytics.

---

## 11. Seed Data / Dataset

Seeding is orchestrated by `server/src/seed/run-seed.js` (`npm run seed`):

1. **Production guard** — refuses to run when `NODE_ENV=production` unless `ALLOW_PROD_SEED=true`.
2. Clears existing `Skill` and `CareerPath` collections.
3. Inserts **105 skills** from `skills-az.seed.js` (categories: technical-skill, knowledge, certification, soft-skill).
4. Builds a `name → ObjectId` map, resolves each career's `requiredSkillNames` into `requiredSkills` (skipping unknown names with a warning).
5. Inserts **31 career paths** from `careers.seed.js`.

### Career paths seeded (31)
Full Stack Developer · Data Analyst · ML Engineer · Healthcare Informatics Specialist ·
Financial Systems Developer · Cybersecurity Analyst · Embedded Systems Developer ·
Aerospace Software Engineer · Frontend Engineer · Mobile App Developer · DevOps Engineer ·
Data Engineer · Cloud Solutions Architect · QA & Test Automation Engineer · Game Developer ·
Blockchain/Web3 Developer · Database Administrator · Site Reliability Engineer (SRE) ·
NLP/Generative AI Engineer · Computer Vision Engineer · Robotics Engineer · MLOps Engineer ·
Systems Programmer · Security Engineer · Graphics Programmer · AR/VR Developer ·
Network Engineer · Platform Engineer · Competitive Programmer · IoT Developer (+1 more).

Each career has exactly **3 phases** (Foundation → Core → Advanced) with milestone months,
learning resources, certifications, advantages, demand, difficulty, and an estimated
time-to-bridge.

---

## 12. Security

| Layer | Mechanism |
|---|---|
| Authentication | JWT signed with `JWT_SECRET`, delivered as **httpOnly** cookie (not JS-readable); 7-day expiry |
| Password storage | bcryptjs hashing |
| Authorization | `authenticate` middleware + `requireRole('admin')` RBAC for admin routes |
| Rate limiting | Global 100 req/15 min per IP; stricter auth limiter (10/15 min in prod) |
| HTTP hardening | helmet security headers |
| CORS | Origin allowlist (`CLIENT_URL` + dev ports), `credentials: true`, restricted methods/headers |
| Input handling | express-validator rules + `validate` middleware; `xss` available for sanitization |
| Env safety | Required-env-var check at boot; seed prod guard (`ALLOW_PROD_SEED`) |
| Transport | Compression on; intended to run behind HTTPS (Render) |

---

## 13. Configuration & Environment

### `server/.env`
```
PORT=5001
MONGO_URI=mongodb://localhost:27017/skillbridge
JWT_SECRET=<secret>
JWT_EXPIRES_IN=7d
NODE_ENV=development
CLIENT_URL=http://localhost:5173        # CORS origin in production
ALLOW_PROD_SEED=true                    # only if seeding a prod DB
```

### `client/.env`
```
VITE_API_URL=http://localhost:5001/api
```

---

## 14. Build, Run & Deploy

### Local development
```bash
# Backend
cd server && npm install
cp .env.example .env        # fill MONGO_URI, JWT_SECRET
npm run seed                # load 105 skills + 31 career paths (one-time)
npm run dev                 # nodemon → http://localhost:5001

# Frontend (second terminal)
cd client && npm install
npm run dev                 # vite → http://localhost:5173
```

### Backend npm scripts
| Script | Command |
|---|---|
| `dev` | `nodemon src/index.js` |
| `start` | `node src/index.js` |
| `seed` | `node src/seed/run-seed.js` |

### Frontend npm scripts
| Script | Command |
|---|---|
| `dev` | `vite` |
| `build` | `vite build` |
| `preview` | `vite preview` |
| `lint` | `eslint .` |

### Deployment — `render.yaml`
- **Type:** Node web service, `rootDir: server`.
- **Build:** `npm install`; **Start:** `npm start`.
- **Health check:** `/api/health`.
- **Env vars:** `NODE_ENV=production`, `MONGO_URI` (manual), `JWT_SECRET` (generated), `JWT_EXPIRES_IN=7d`, `CLIENT_URL` (manual).
- **Client:** `client/vercel.json` rewrites all routes to `index.html` for SPA routing.

---

## 15. Project Status & Roadmap

**Status: M1–M7 complete — full MERN stack functional.**

| Milestone | Scope | Status |
|---|---|---|
| M1 | MongoDB models + seed data | ✅ (grown to 31 careers / 105 skills) |
| M2 | Auth module (JWT + bcrypt) | ✅ |
| M3 | Profile setup + OCEAN scoring | ✅ |
| M4 | Gap analyzer engine | ✅ |
| M5 | Career explorer + match scoring | ✅ |
| M6 | Roadmap + career brief | ✅ |
| M7 | React frontend | ✅ |
| — | Admin panel + retake-tests + settings | ✅ (added beyond original M1–M7) |

Forward-looking work is tracked in `docs/upgrade-roadmap.md`.

> Note: older docs reference React 18 / port 5000 / 8 careers / 55 skills; the current code
> uses React 19, default API port 5001, and 31 careers / 105 skills.

---

## 16. Appendix

### Existing documentation set (`docs/`)
| Doc | Purpose |
|---|---|
| `Full project idea.md` | Master concept / scope |
| `architecture.md` | Architecture overview |
| `data-models.md` | Schemas *(partially stale — see §6)* |
| `api-contracts.md` | Endpoint reference *(partially stale — see §8)* |
| `progress.md` | Milestone tracker |
| `RETAKE-TESTS-FEATURE.md` | Retake-tests feature spec |
| `Industry_Specific_Practices.md`, `System_Requirements_Template.md` | Supporting references |
| `upgrade-roadmap.md` | Planned upgrades |
| **`PROJECT-REPORT.md`** | **This report (code-accurate, end-to-end)** |

### Code-structure manifest (tracked files)
```
client/  (React app)
  src/App.jsx · main.jsx · index.css
  src/api/axios.js
  src/components/{common,layout,charts,admin}/*.jsx  + ProtectedRoute.jsx
  src/context/{AuthContext,ThemeContext}.jsx
  src/features/retake-tests/*
  src/hooks/{useAuth,useFetch}.js
  src/pages/*.jsx + pages/admin/*.jsx
  src/routes/AdminRoute.jsx
  src/services/{auth,profile,analyzer,explorer,roadmap,admin,settings,retake-tests}/*
  src/store/{store.js, slices/*}
  src/constants/* · src/utils/{cx,motion}.js
  index.html · vite.config.js · tailwind.config.js · postcss.config.js · vercel.json

server/  (Express API)
  src/index.js
  src/config/db.js
  src/constants/ocean-questions.js
  src/middleware/{authenticate,role,validate,error}.middleware.js
  src/models/{user,skill,career-path,user-progress}.model.js
  src/modules/{auth,profile,analyzer,careers,roadmap,admin,retake-tests}/*
  src/utils/{ApiResponse,ApiError,gap-engine}.js
  src/seed/{run-seed,skills-az.seed,skills.seed,careers.seed}.js

root/  README.md · render.yaml · docs/*
```

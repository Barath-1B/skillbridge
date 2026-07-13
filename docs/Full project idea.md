# SkillBridge — Full Project Idea

**Master Document: Complete Project Concept, Architecture, Scope & Outcomes**

---

## 1. Project Identity

| Property | Value |
|----------|-------|
| **Project Name** | SkillBridge |
| **Tagline** | Find your gap. Bridge it. |
| **Type** | Full-Stack MERN Web Application |
| **Assignment** | FSD-50 (T.I.M.E. PCP-V) |
| **Unique Code** | E0423035 |
| **Program** | MERN Stack Development |
| **Status** | Fully Functional (M1-M7 Complete) |

---

## 2. Problem Statement

**The Challenge:**  
CS students and early-career professionals face a critical knowledge gap: they don't know which career path aligns with their skills, interests, and personality. Existing tools are either too generic (broad job sites), too prescriptive (single-path boot camps), or too time-consuming (1-on-1 career coaching). There's no fast, personalized, data-driven advisor that gives students **immediate insight** into their fit for multiple career paths.

**Why It Matters:**  
Wrong career choices cost time, money, and morale. A tool that matches skills to paths and shows concrete gaps upfront saves students months of exploration and pivots.

---

## 3. Solution Concept

**SkillBridge** is a **career path advisor** that:

1. Collects a user's **5-layer profile** (experience, certifications, skills, knowledge, personality)
2. **Silently scores** their Big Five personality (OCEAN) via 12 situational questions
3. Compares them against 8 curated career paths using **weighted skill matching + personality alignment**
4. Returns **probabilistic match scores** (0–100%) with detailed **gap analysis**
5. Provides a **phase-by-phase roadmap** to bridge identified gaps
6. Allows progress tracking as users complete skills

**Value Proposition:**
- **Fast:** Full analysis in 5 minutes
- **Personalized:** Skills + personality matter
- **Transparent:** See exactly why a path is a good/poor fit
- **Actionable:** Concrete roadmap to improve fit

**Design Philosophy:**  
**Value-First, Auth-Last.** Users get full analysis without creating an account. Login is optional, only to save results. This removes friction and builds trust.

---

## 4. Target Users

1. **CS Students** (undergrad/grad) — Exploring career directions before graduation
2. **Early-Career Professionals** (0–3 years) — Assessing fit in current/adjacent paths
3. **Career-Switchers** — Pivoting into CS from other fields
4. **Academic Advisors** — Using SkillBridge as a tool to guide students

---

## 5. Core Features

### Feature 1: Smart User Profiling
- Experience selector (Student / 0–1yr / 1–3yr / 3+yr)
- Multi-select skill picker (51 skills across 5 categories)
- Certification tracker (AWS, Google Cloud, CFA, etc.)
- Educational background capture

### Feature 2: Personality Assessment (OCEAN)
- 12 situational questions (Big Five assessment)
- Silent scoring — personality traits emerge without explicit labeling
- Domain-specific ideal profiles (e.g., "ML Engineers benefit from high Openness + Conscientiousness")
- Visual Big Five breakdown

### Feature 3: Smart Career Matching
- Weighted skill comparison (matching skills get points, required skills get weighted importance)
- OCEAN personality alignment modifier (–5% to +10% boost based on ideal profile match)
- Final match score (0–100%)
- Display rules: show viable paths (≥20%), cap at 10 results, sort by score descending

### Feature 4: Gap Analysis & Roadmap
- For each matched path, show:
  - Which required skills the user already has (matched)
  - Which skills are missing (gap)
  - Gap severity (how critical to career success)
  - Learning phases (3 phases per career, e.g., Foundations → Intermediate → Advanced)
  - Estimated time to completion per skill
- **Per-skill progress tracking:** every roadmap item is a click-toggleable checkbox. The "Your progress" card and percent bar update from those toggles, persist per (user, career-path), and survive reloads. Backed by `UserProgress.completedRoadmapItems[{ phase, skillName }]` and the `PATCH /roadmap/:careerPathId/roadmap-items` endpoint.

### Feature 5: Admin Panel
- Add/edit/delete career paths and skills
- View user analytics (popular paths, common gaps, skill trends)
- Manage user accounts (view, disable, delete)
- Update seed data (careers, skills) without code redeploy

---

## 6. Five-Layer User Profiling System

SkillBridge builds a comprehensive profile from 5 orthogonal dimensions:

| Layer | Purpose | Examples | Weighting |
|-------|---------|----------|-----------|
| **1. Experience** | Years in field | Student, 0–1yr, 1–3yr, 3+yr | Context for skill interpretation |
| **2. Certifications** | Formal credentials | AWS, GCP, CFA, CompTIA | High signal; counts as matched skill |
| **3. Skills** | Technical domains | ML, DevOps, Data Analysis, Security | Primary matching vector (weighted) |
| **4. Knowledge** | Tools & languages | Python, SQL, TensorFlow, C++ | Sub-category of skills; specific depth |
| **5. Personality** | Big Five traits | OCEAN scores (0–100 each) | Alignment bonus/penalty (–5% to +10%) |

**Why 5 layers?**  
No single dimension captures career fit. A person with "ML Engineer" skills but low Conscientiousness (detail-oriented) may struggle in quality-critical roles. Conversely, high Conscientiousness + average ML skills often predicts success through dedication to learning. The 5 layers work together.

---

## 7. OCEAN Personality Model

### What is OCEAN?

The Big Five personality model (psychology standard) measures:

- **Openness** — Curiosity, creativity, openness to new ideas (0–100)
- **Conscientiousness** — Discipline, organization, attention to detail (0–100)
- **Extraversion** — Social energy, communication, leadership (0–100)
- **Agreeableness** — Cooperation, empathy, team harmony (0–100)
- **Neuroticism** — Emotional stability, stress management (0–100)

### How SkillBridge Scores OCEAN

1. User answers **12 situational questions** (4 options each, scored 1–4)
2. Questions are **domain-agnostic** — they don't mention "programming" or career paths
3. Responses are **silently mapped** to the 5 traits via a coefficient matrix
4. Final scores are normalized to 0–100 per trait
5. **Default:** If a question isn't answered, trait defaults to 50 (neutral)

### Domain-Specific Ideal Profiles

Each career path has an **ideal OCEAN profile** (e.g., ML Engineer: high Openness + high Conscientiousness + moderate Extraversion). The analyzer compares the user's scores to the ideal and applies a modifier.

**Example:**
- User: O=80, C=70, E=60, A=50, N=55
- ML Engineer ideal: O≥75, C≥70, E=mid, A=low, N=low
- Match on O ✓, C ✓ → +5% bonus
- **Final score = Weighted skill score (78%) + OCEAN bonus (+5%) = 83%**

---

## 8. Match Score Formula

### Formula Breakdown

```
Step 1: Raw Score
Raw = (User Skills ∩ Required Skills) / Total Required Skills × 100

Step 2: Weighted Score
Weighted = Σ(Matched Skill Weights) / Σ(All Skill Weights) × 100

Step 3: OCEAN Modifier
Modifier = personality alignment factor (–5% to +10%)
  - Compare user OCEAN vs. career ideal OCEAN
  - Count matching traits
  - Award +2.5% per matching trait (max 5 traits = +12.5%, capped at +10%)

Step 4: Final Score
Final = Weighted Score + OCEAN Modifier
Range: 0–100%
```

### Display Rules

- **Show all paths with Final Score ≥ 20%** (minimum viability threshold)
- **Cap display at 10 results** (prevent overwhelm)
- **Sort descending** by Final Score
- **User can toggle "Show all paths"** to reveal matches < 20%
- **Color coding:**
  - Green ≥ 60% (strong fit)
  - Yellow ≥ 40% (moderate fit)
  - Orange < 40% (weak fit, not recommended)

---

## 9. Technology Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend** | React 19 + Vite | Modern SPA with fast HMR |
| | Redux Toolkit | Global state (auth, profile, careers) |
| | Axios | HTTP client with JWT interceptor |
| | Tailwind CSS v4 | Utility-first styling |
| | React Router v7 | Client-side routing |
| | framer-motion | Page + element animations |
| **Backend** | Node.js | JavaScript runtime |
| | Express.js | Minimal web framework |
| | Helmet.js | Security headers |
| | node-rate-limiter-flexible | DDoS mitigation |
| **Database** | MongoDB | NoSQL document store |
| | Mongoose | ODM with validation & relationships |
| **Authentication** | JWT (JSON Web Token) | Stateless auth |
| | bcrypt | Password hashing |
| | httpOnly cookies | Secure token storage |
| **Deployment** | Vercel | Frontend hosting (SPA routing) |
| | Render.io | Backend hosting (Node) |
| | MongoDB Atlas | Managed MongoDB |
| **DevTools** | ESLint | Code quality |
| | Nodemon | Dev server auto-reload |
| | Vite | Frontend build & dev server |

---

## 10. System Architecture Methodology

### Architecture Pattern: Feature-Based Modular

**Why this pattern?**
- **Scalability:** Adding a new feature (e.g., "mentorship") doesn't touch existing code
- **Maintainability:** All code for a feature (routes, logic, UI) lives in one folder
- **Team collaboration:** Different developers can work on different features in parallel
- **Testing:** Features can be tested in isolation

### Folder Organization

**Frontend (`client/src/`):**
```
features/
  ├── auth/          (login, register, JWT logic)
  ├── profile/       (skill selector, experience picker)
  ├── analyzer/      (gap engine, match scoring)
  ├── explorer/      (career list, filtering)
  ├── roadmap/       (progress tracking, milestones)
  └── admin/         (career CRUD, analytics)

components/        (reusable UI: Button, Card, Badge)
hooks/             (custom React hooks: useAuth, useFetch)
services/          (Axios API wrappers per feature)
store/             (Redux slices: auth, profile, career)
utils/             (pure functions, constants)
```

**Backend (`server/src/`):**
```
modules/
  ├── auth/          (register, login, logout)
  ├── profile/       (skills, experience, OCEAN)
  ├── analyzer/      (gap engine, match scoring)
  ├── careers/       (CRUD, filtering, saving)
  ├── roadmap/       (progress tracking, milestones)
  └── admin/         (user/career/skill management)

models/            (Mongoose schemas)
middleware/        (auth, validation, error handling)
utils/             (ApiResponse, ApiError, gap-engine)
seed/              (initial data: skills, careers)
```

### SOLID Principles Applied

- **S** (Single Responsibility) — `gap-engine.js` only computes gaps; `matchScore.js` only scores
- **O** (Open/Closed) — Career paths are config-driven in DB; adding a path doesn't change code
- **L** (Liskov Substitution) — All API responses use same `ApiResponse` shape
- **I** (Interface Segregation) — Controllers receive only the middleware they need
- **D** (Dependency Inversion) — Controllers depend on service abstractions, not DB directly

---

## 11. Folder Architecture

### Client Structure

```
client/src/
├── features/
│   ├── auth/               (login, register, logout)
│   ├── profile/            (skill picker, certifications)
│   ├── analyzer/           (match results, gap analysis)
│   ├── explorer/           (career list, detail view)
│   ├── roadmap/            (progress tracking)
│   └── admin/              (career, skill, user management)
│
├── components/
│   ├── common/             (Button, Card, Badge, Spinner, ProgressBar)
│   ├── layout/             (Header, Footer, Sidebar)
│   ├── charts/             (MatchScoreChart, ProgressChart)
│   └── index.js            (barrel exports)
│
├── pages/                  (full-page components)
│   ├── Landing.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── ProfileSetup.jsx
│   ├── OceanQuiz.jsx
│   ├── AnalyzerResults.jsx
│   ├── Dashboard.jsx
│   ├── CareerBrief.jsx
│   └── admin/*
│
├── services/               (Axios API wrappers)
│   ├── auth.service.js
│   ├── profile.service.js
│   ├── analyzer.service.js
│   ├── explorer.service.js
│   ├── roadmap.service.js
│   └── admin.service.js
│
├── store/                  (Redux)
│   ├── store.js
│   └── slices/
│       ├── authSlice.js
│       ├── profileSlice.js
│       └── careerSlice.js
│
├── hooks/                  (custom React hooks)
│   ├── useAuth.js
│   ├── useFetch.js
│   └── index.js
│
├── utils/                  (pure functions)
│   ├── constants.js
│   ├── matchScore.js
│   ├── oceanScorer.js
│   └── formatDate.js
│
├── routes/
│   ├── ProtectedRoute.jsx
│   ├── AdminRoute.jsx
│   └── AppRouter.jsx
│
└── App.jsx, main.jsx, index.css
```

### Server Structure

```
server/src/
├── modules/                (feature-based MVC)
│   ├── auth/
│   │   ├── auth.routes.js
│   │   ├── auth.controller.js
│   │   ├── auth.service.js
│   │   ├── auth.validators.js
│   │   └── index.js
│   │
│   ├── profile/
│   │   ├── profile.routes.js
│   │   ├── profile.controller.js
│   │   ├── profile.service.js
│   │   └── index.js
│   │
│   ├── analyzer/
│   │   ├── analyzer.routes.js
│   │   ├── analyzer.controller.js
│   │   ├── analyzer.service.js
│   │   └── index.js
│   │
│   ├── careers/
│   │   ├── careers.routes.js
│   │   ├── careers.controller.js
│   │   ├── careers.service.js
│   │   └── index.js
│   │
│   ├── roadmap/
│   │   ├── roadmap.routes.js
│   │   ├── roadmap.controller.js
│   │   ├── roadmap.service.js
│   │   └── index.js
│   │
│   └── admin/
│       ├── admin.routes.js
│       ├── admin.controller.js
│       ├── admin.service.js
│       └── index.js
│
├── models/                 (Mongoose schemas)
│   ├── user.model.js
│   ├── skill.model.js
│   ├── career-path.model.js
│   └── user-progress.model.js
│
├── middleware/
│   ├── authenticate.middleware.js
│   ├── role.middleware.js
│   ├── validate.middleware.js
│   └── error.middleware.js
│
├── utils/
│   ├── ApiResponse.js
│   ├── ApiError.js
│   ├── gap-engine.js
│   └── matchScore.js
│
├── seed/
│   ├── careers.seed.js
│   ├── skills.seed.js
│   └── run-seed.js
│
├── config/
│   └── db.js
│
└── index.js                (Express app entry point)
```

---

## 12. Three-Tier Architecture

### Tier 1: Frontend (Client Layer)

**Technology:** React 18 + Vite, Redux Toolkit, Axios, Tailwind CSS

**Responsibilities:**
- User interface (pages, components, forms)
- Client-side routing (React Router)
- Global state management (Redux)
- API communication (Axios with JWT interceptor)
- Local UI state (useState for forms, modals, etc.)

**Key Files:**
- `App.jsx` — Root component; renders BrowserRouter + routes
- `store.js` — Redux store configuration
- `api/axios.js` — Axios instance with JWT interceptor
- `routes/ProtectedRoute.jsx` — Guard for authenticated pages
- `components/` — Reusable UI components
- `pages/` — Full-page components (Landing, Dashboard, etc.)
- `services/` — API call abstractions

### Tier 2: Middleware Layer (Security & Routing)

**Technology:** Express.js middleware stack

**Responsibilities:**
- Request validation (shape, type, presence)
- Authentication (JWT verification)
- Authorization (role-based access control)
- Security headers (Helmet.js)
- Rate limiting (DDoS protection)
- Input sanitization (XSS prevention)
- Error handling (global error middleware)

**Middleware Order (top to bottom):**
1. Helmet.js (security headers)
2. CORS (cross-origin requests)
3. Cookie Parser (httpOnly cookie support)
4. Body Parser (JSON payload parsing)
5. Global Rate Limiter (100 req / 15 min)
6. Compression (gzip responses)
7. Routes (feature modules)
8. Authenticate Middleware (JWT verification)
9. Role Middleware (admin-only checks)
10. Validate Middleware (schema validation)
11. Input Sanitization (trim, escape)
12. Error Middleware (catch-all exception handler)

### Tier 3: Backend Layer (Business Logic & Data)

**Technology:** Node.js + Express, MongoDB + Mongoose, JWT, bcrypt

**Responsibilities:**
- RESTful route definitions
- Business logic (gap engine, match scoring, OCEAN computation)
- Database access (Mongoose models)
- Data validation
- Error responses

**Key Components:**

#### Routes
- Feature modules expose REST endpoints (e.g., `POST /api/auth/register`)
- Routes → Controllers → Services → Models

#### Controllers
- Thin wrappers that:
  - Extract request params/body
  - Call service layer
  - Return `ApiResponse` wrapper

#### Services
- Pure business logic:
  - Gap engine computation
  - Match score calculation
  - User profile merging
  - Roadmap generation

#### Models
- Mongoose schemas (User, Skill, CareerPath, UserProgress)
- Validation rules, indexes, relationships

#### Utils
- `ApiResponse.js` — Standardized response format
- `ApiError.js` — Custom error class
- `gap-engine.js` — Core matching algorithm
- `matchScore.js` — Score computation

---

## 13. Security Architecture

### Security Stack (In Order of Operation)

```
1. HTTP Headers (Helmet.js)
   ├── Prevent clickjacking (X-Frame-Options)
   ├── Block MIME sniffing (X-Content-Type-Options)
   ├── XSS protection (X-XSS-Protection)
   └── CSP policy (Content-Security-Policy)

2. CORS (Cross-Origin Resource Sharing)
   ├── Allow origins: localhost:5173, Vercel domain
   ├── Allow credentials: true (for httpOnly cookies)
   └── Allow methods: GET, POST, PUT, DELETE

3. Rate Limiting (node-rate-limiter-flexible)
   ├── Global: 100 requests / 15 minutes
   └── Auth routes: 10 requests / 15 minutes (stricter)

4. Authentication (JWT)
   ├── Token in httpOnly cookie (HTTP-only, Secure, SameSite=Strict)
   ├── 7-day expiry
   └── Verified on every protected request

5. Authorization (Role-Based)
   ├── User roles: student, professional, admin
   └── Admin routes require role='admin'

6. Input Validation (express-validator)
   ├── Check data types (string, email, array)
   ├── Check presence (required fields)
   └── Custom validators (e.g., experience enum)

7. Input Sanitization
   ├── Trim whitespace
   ├── Escape HTML chars (prevent XSS)
   └── Disallow shell metacharacters

8. Response Compression (gzip)
   ├── Compress payloads > 1KB
   └── Reduce bandwidth & latency

9. Error Handling (Global Middleware)
   ├── Catch all unhandled errors
   ├── Log to server.log
   ├── Return safe error response (no stack traces in prod)
   └── Never expose internal DB details
```

### Token Storage

- **Frontend:** httpOnly cookies (secure, not accessible to JavaScript)
- **Backend:** Signed with `JWT_SECRET`, 7-day expiry
- **Refresh:** No refresh token in v1; users re-login after expiry

### Password Security

- **Hashing:** bcrypt with salt rounds = 10
- **Never stored in plaintext**
- **Compared safely** (bcrypt.compare)

---

## 14. Data Architecture Overview

### Four Core Models

#### User
```javascript
{
  email: String (unique),
  password: String (bcrypted),
  name: String,
  role: String (student | professional | admin),
  experience: String (student | 0-1yr | 1-3yr | 3+yr),
  interests: [SkillRef],
  currentSkills: [{
    skillId: SkillRef,
    proficiencyLevel: String,
    yearsOfExperience: Number
  }],
  certifications: [{
    certId: SkillRef,
    certificationName: String,
    issueDate: Date,
    expiryDate: Date
  }],
  oceanScore: {
    openness: Number (0-100),
    conscientiousness: Number (0-100),
    extraversion: Number (0-100),
    agreeableness: Number (0-100),
    neuroticism: Number (0-100),
    assessedAt: Date
  },
  createdAt: Date,
  updatedAt: Date,
  lastLoginAt: Date,
  isActive: Boolean
}
```

#### Skill
```javascript
{
  name: String (unique),
  category: String (technical-skill | soft-skill | knowledge | certification),
  description: String,
  tags: [String],
  parentSkill: SkillRef (optional, for hierarchies like "SQL" ⊃ "SQL basics"),
  difficultyLevel: String (beginner | intermediate | advanced),
  resources: [{
    title: String,
    url: String,
    type: String (tutorial | documentation | course),
    platform: String (Udemy | Coursera | YouTube, etc.)
  }]
}
```

#### CareerPath
```javascript
{
  title: String (unique),
  domain: String (tag, e.g., "Data Science", "Systems"),
  requiredSkills: [{
    skillId: SkillRef,
    weight: Number (0-1, importance),
    priority: String (must-have | nice-to-have),
    minProficiency: String (beginner | intermediate | advanced)
  }],
  preferredCertifications: [SkillRef],
  minYearsExperience: Number,
  phases: [{
    phaseName: String (Foundations | Intermediate | Advanced),
    yearsInRole: Number,
    responsibilities: [String],
    skillsToLearn: [SkillRef],
    avgSalary: Number
  }],
  oceanAlignment: {
    openness: Number (-20 to +20 modifier),
    conscientiousness: Number,
    extraversion: Number,
    agreeableness: Number,
    neuroticism: Number
  },
  resources: [Object],
  advantages: [String],
  challenges: [String],
  averageSalaryRange: { min: Number, max: Number },
  jobMarketDemand: String (high | medium | low),
  growthTrendline: String (growing | stable | declining),
  isActive: Boolean
}
```

#### UserProgress
```javascript
{
  userId: UserRef,
  careerPathId: CareerPathRef,
  completedSkills: [SkillRef],            // legacy: ObjectIds of mastered Skill docs
  completedRoadmapItems: [{               // current: per-roadmap-item checkboxes
    phase: Number (1, 2, 3),
    skillName: String
  }],
  percentComplete: Number (0-100),        // recomputed from completedRoadmapItems / total roadmap items
  createdAt: Date,
  updatedAt: Date
}
```

`completedRoadmapItems` is the authoritative source for the per-skill checklist on the career-brief page. The composite `(phase, skillName)` key matches the `phase.skills[]` strings on `CareerPath`, so toggles are independent of the `Skill` collection (which still drives match-score weighting).

### Relationships

```
User
  ├── currentSkills → Skill (many)
  ├── interests → Skill (many)
  ├── certifications → Skill (many)
  └── UserProgress (many)

UserProgress
  ├── userId → User (one)
  ├── careerPathId → CareerPath (one)
  └── completedSkills → Skill (many)

CareerPath
  ├── requiredSkills → Skill (many)
  ├── preferredCertifications → Skill (many)
  └── phases.skillsToLearn → Skill (many)

Skill
  └── parentSkill → Skill (optional, self-ref)
```

### Indexing Strategy

- **users:** `email` (unique), `createdAt` (descending), `role`
- **skills:** `name` (unique), `category`, `tags`
- **careerPaths:** `title` (unique), `domain`, `isActive`
- **userProgress:** `{userId, careerPathId}` (unique compound), `userId`, `careerPathId`

---

## 15. API Design Principles

### RESTful Resource Design

| Method | Endpoint | Purpose | Auth |
|--------|----------|---------|------|
| POST | `/api/auth/register` | Create user | None |
| POST | `/api/auth/login` | User login | None |
| POST | `/api/auth/logout` | User logout | Required |
| GET | `/api/auth/me` | Current user | Required |
| GET | `/api/profile` | Get profile | Required |
| PUT | `/api/profile` | Update profile | Required |
| POST | `/api/profile/ocean-score` | Save OCEAN | Required |
| GET | `/api/skills` | List skills | None |
| GET | `/api/analyzer/analyze` | Run analyzer | None (guests OK) |
| GET | `/api/careers` | List careers | None |
| GET | `/api/careers/:id` | Career detail | None |
| POST | `/api/careers/:id/save` | Save career | Required |
| GET | `/api/careers/saved` | Saved careers | Required |
| GET | `/api/roadmap` | List roadmaps | Required |
| GET | `/api/roadmap/:id` | Roadmap detail | Required |
| PUT | `/api/roadmap/:id/progress` | Update progress | Required |

### Response Format Standardization

**Success Response:**
```json
{
  "statusCode": 200,
  "data": { /* actual data */ },
  "message": "Operation successful"
}
```

**Error Response:**
```json
{
  "statusCode": 400,
  "data": {},
  "message": "Validation failed: email is required"
}
```

**ApiResponse utility** wraps all responses, ensuring consistency across endpoints.

### Thin Controllers, Fat Services

**Controller Responsibility:**
- Extract request params/body
- Call service layer
- Return response via ApiResponse

**Service Responsibility:**
- All business logic
- Database queries
- Error handling
- Complex computations (gap engine, match scoring)

**Example:**
```javascript
// Controller
const analyzeController = async (req, res, next) => {
  const { skills, experience, oceanScore } = req.body;
  const result = await analyzeService.analyzeCareerFit(skills, experience, oceanScore);
  res.status(200).json(new ApiResponse(200, result, "Analysis complete"));
};

// Service
const analyzeCareerFit = async (userSkills, experience, oceanScore) => {
  const careers = await CareerPath.find({ isActive: true });
  const matches = careers.map(career => {
    const rawScore = calculateRawScore(userSkills, career.requiredSkills);
    const weighted = calculateWeightedScore(rawScore, career.requiredSkills);
    const oceanMod = calculateOceanModifier(oceanScore, career.oceanAlignment);
    return { ...career, finalScore: weighted + oceanMod };
  });
  return matches.sort((a, b) => b.finalScore - a.finalScore);
};
```

---

## 16. User Journey

### Linear Flow (Value-First)

```
1. LANDING PAGE
   ├── Hero section with tagline
   ├── 3-step explainer (Profile → Assess → Match)
   ├── Feature highlights
   └── CTA: "Start Analysis" (no login required)

2. ONBOARDING (6 steps, ~5 minutes)
   ├── Step 1: Experience Level (Student / 0–1yr / 1–3yr / 3+yr)
   ├── Step 2: Skills Multi-Select (pick from 51 skills)
   ├── Step 3: Certifications (optional)
   ├── Step 4: Knowledge (optional)
   ├── Step 5: Educational Background (optional)
   └── Step 6: Review Profile

3. PERSONALITY ASSESSMENT (OCEAN)
   ├── 12 situational questions
   ├── 4 options per question
   ├── Silent Big Five scoring
   └── Display trait breakdown (optional)

4. RESULTS PAGE
   ├── List all viable career paths (≥20% match)
   ├── Color-coded match % (green ≥60%, yellow ≥40%, orange <40%)
   ├── Sort by match descending
   ├── Cap at 10 results
   ├── "Show all paths" toggle for <20% results
   └── Click to view career detail + gap analysis

5. CAREER BRIEF
   ├── Full career overview (title, domain, salary range, demand, growth)
   ├── Match score breakdown (skills, personality)
   ├── Gap analysis (missing skills, severity, learning time)
   ├── 3-phase roadmap (Foundations → Intermediate → Advanced)
   ├── Resources per phase
   ├── Advantages & challenges
   └── **CTA: "Save this path to roadmap"** (prompts login if guest)

6. [OPTIONAL] REGISTER / LOGIN
   ├── Email + password (register) or email + password (login)
   ├── JWT token set in httpOnly cookie
   └── Redirect to Dashboard

7. DASHBOARD
   ├── Profile Summary Tab (current skills, experience, OCEAN)
   ├── My Roadmaps Tab
   │  ├── Each saved career path
   │  ├── Progress bar (% complete)
   │  ├── Current phase indicator
   │  ├── Skills to learn in current phase
   │  └── Mark skill complete
   ├── Suggested Paths Tab (paths ≥40%, not yet saved)
   └── Account Settings (logout, delete account)

8. ADMIN PANEL (admin role only)
   ├── Career Management (CRUD)
   ├── Skill Management (CRUD)
   ├── User Analytics (popular paths, skill trends)
   └── User Management (view, disable, delete)
```

### Key UX Principles

- **No forced login:** Guests can analyze careers; login optional
- **Value upfront:** See match scores immediately
- **Progressive disclosure:** Detail (gap analysis, roadmap) only when clicked
- **Clear CTAs:** "Save path," "Mark skill complete," "View roadmap"
- **Visual feedback:** Color coding, progress bars, status badges

---

## 17. Eight Career Paths

SkillBridge matches users against these 8 curated career paths:

| # | Career Path | Domain | Required Skills (Sample) | Ideal OCEAN |
|---|---|---|---|---|
| 1 | **Full Stack Developer** | Web Development | JavaScript, React, Node.js, SQL, REST APIs, Git | High O, High C |
| 2 | **Data Analyst** | Data Science | SQL, Python, Excel, Tableau, Statistics, Business Analysis | High C, Moderate O |
| 3 | **ML Engineer** | AI/ML | Python, TensorFlow, Statistics, Linear Algebra, Data Analysis | High O, High C |
| 4 | **Healthcare Informatics** | Healthcare Tech | SQL, HIPAA, Healthcare Systems, Data Privacy, Python | High C, High A |
| 5 | **Financial Systems Developer** | FinTech | Java, C++, SQL, Financial Systems, Trading Systems, Linux | High C, Moderate O |
| 6 | **Cybersecurity Analyst** | Security | Linux, Networking, Cryptography, Penetration Testing, Risk Analysis | High C, Moderate A |
| 7 | **Embedded Systems Engineer** | Hardware/IoT | C, Assembly, Microcontrollers, Real-time OS, Circuit Design | High C, Low E |
| 8 | **Aerospace Software Engineer** | Aerospace/Defense | C++, Real-time systems, Signal Processing, MATLAB, Safety-Critical Code | Very High C, Moderate O |

Each path has:
- 10 weighted required skills
- 3 learning phases (Foundations, Intermediate, Advanced)
- 5–7 learning resources per phase
- Salary range (e.g., $80K–$150K)
- Job market demand (high/medium/low)
- Growth trajectory (growing/stable/declining)
- OCEAN ideal profile (trait modifiers)

---

## 17b. Visual Design System

**Palette: Slate + Teal (duo-tone, professional)**

| Token | Hex | Use |
|---|---|---|
| `slate-900` | `#0F172A` | Headings, dark surfaces, chrome |
| `teal-600` | `#0D9488` | Accent, primary CTA, focus rings, progress fill |
| `teal-500` | `#14B8A6` | Hover, decorative tints |
| `zinc-50` → `zinc-950` | — | Neutral surfaces and borders |
| `emerald-600` | `#059669` | Success states (skill matched) |
| `amber-500` | `#F59E0B` | Warning states |
| `red-500` | `#EF4444` | Errors, destructive actions |

**Principles**
- Duo-tone: only slate and teal carry brand meaning. No purple, violet, or pink.
- Solid fills over gradients. Gradient utilities (`.gradient-text`, `.gradient-bg`) are kept for backwards compatibility but render as solid teal.
- Motion stays — framer-motion entrance animations and the blob keyframe remain. The animated tri-color shimmer is retired.
- Status colors (emerald / amber / red) are not part of the brand palette; they are reserved strictly for state.

Theme tokens live in `client/src/index.css` under `@theme`. Component variants in `client/src/components/common/` consume the tokens; per-page palette overrides are not allowed.

---

## 18. Project Scope

### What IS In Scope (v1 Deliverables)

✅ **User Profiling**
- Experience level selection
- Skills multi-select (51 skills)
- Basic certifications tracker
- OCEAN personality assessment (12 questions)

✅ **Career Matching**
- Weighted skill comparison algorithm
- OCEAN personality alignment modifier
- Final match score (0–100%)
- Display rules (≥20%, cap 10, sorted)

✅ **Gap Analysis**
- Show matched vs. missing skills
- Gap severity classification
- Estimated learning time per skill
- Learning phase roadmap (3 phases)

✅ **Progress Tracking**
- Save careers to roadmap
- Mark skills as completed
- Progress percentage calculation
- Phase navigation

✅ **Admin Panel**
- Career CRUD (create, read, update, delete)
- Skill CRUD
- User analytics (popular paths, common gaps)
- User account management

✅ **Authentication**
- Email/password registration
- JWT login (httpOnly cookies)
- Role-based access control (student/professional/admin)
- Logout

✅ **Deployment**
- Frontend on Vercel (SPA routing)
- Backend on Render.io (Node.js)
- Database on MongoDB Atlas
- HTTPS everywhere
- Environment variables (.env)

### What is Explicitly OUT of Scope (Not in v1)

❌ **Social/Collaboration Features**
- User profiles, messaging, mentorship matching
- Networking, job board, referrals

❌ **Real-Time Features**
- Live chat, notifications, live skill assessments
- WebSocket-based progress sync

❌ **Advanced Analytics**
- User cohort analysis, ML-based recommendation engine
- Predictive modeling of career success

❌ **Content Management**
- SkillBridge does not teach; it advises. No video courses, tutorials, or learning platform.
- Does not track external course progress (e.g., Udemy, Coursera)

❌ **Mobile Apps**
- React Native or native iOS/Android apps
- Mobile-first responsive design beyond basic mobile web support

❌ **Gamification**
- Badges, leaderboards, streaks, points
- Competitive career matching

❌ **Third-Party Integrations**
- LinkedIn import (auto-fetch skills)
- GitHub profile analysis
- Job posting aggregation

❌ **Advanced OCEAN Customization**
- User-selected question sets
- Trait-by-trait custom weightings
- Longitudinal personality tracking

---

## 19. Expected Outcomes & Deliverables

### What Users Will Have

1. **Instant Career Fit Analysis**
   - See 8 career paths ranked by personal fit (0–100% match)
   - Understand exactly why each path is a good/poor fit
   - Color-coded visual guide (green/yellow/orange)

2. **Personalized Gap Analysis**
   - For each matched path, see which skills you have vs. need
   - Understand gap severity (critical/important/nice-to-have)
   - Estimated time to close each gap

3. **Phase-by-Phase Roadmap**
   - 3-phase learning plan (Foundations → Intermediate → Advanced)
   - Skills to learn per phase
   - Recommended resources (tutorials, courses, documentation)
   - Progress tracking (% complete, estimated completion date)

4. **Optional Account & History**
   - Create account to save careers and track progress
   - Update profile and retake personality assessment
   - View completed milestones and achievements

### What the Organization Will Have

1. **Working MVP (Minimum Viable Product)**
   - Fully functional MERN app
   - 8 career paths, 51+ skills, seeded to production
   - All features tested and documented

2. **Reusable Codebase**
   - Feature-based modular architecture
   - Service/controller separation of concerns
   - Comprehensive API contracts
   - Ready for feature extensions (mentorship, job board, etc.)

3. **Admin Tools**
   - Manage career paths, skills, users without code redeploy
   - View analytics (popular paths, skill trends, user growth)
   - Support user accounts (disable, delete, audit)

4. **Deployment Infrastructure**
   - Vercel + Render + MongoDB Atlas setup
   - Environment variable management
   - HTTPS, security headers, rate limiting in place
   - Ready for production traffic

5. **Comprehensive Documentation**
   - Architecture deep-dive (`docs/architecture.md`)
   - API contracts (`docs/api-contracts.md`)
   - Data models (`docs/data-models.md`)
   - Folder structure guide
   - Quick start & demo script
   - This master document (Full project idea.md)

---

## 20. Milestone Build Order

| Milestone | Focus | Status | Notes |
|-----------|-------|--------|-------|
| **M1** | Database Models & Seed Data | ✅ Complete | User, Skill, CareerPath, UserProgress schemas; 51 skills, 8 career paths seeded |
| **M2** | Authentication Module | ✅ Complete | Register, login, logout, JWT (httpOnly cookies), role-based access control |
| **M3** | Profile Setup Module | ✅ Complete | Experience selector, skill multi-select, certifications, OCEAN assessment |
| **M4** | Gap Analysis Engine | ✅ Complete | `gap-engine.js` pure function, weighted scoring, OCEAN modifier, final match score |
| **M5** | Career Explorer Module | ✅ Complete | List careers, filter by domain/score, detail view, save/unsave, saved careers list |
| **M6** | Roadmap & Progress | ✅ Complete | Dashboard, phase-by-phase roadmap, skill completion tracking, progress calculation |
| **M7** | React Frontend | ✅ Complete | Vite + React 18, Redux store, Auth/Profile/Analyzer/Explorer/Roadmap/Admin pages, all routes wired |
| **M8** | Admin Panel & Polish | ✅ Complete | Career/skill/user CRUD, analytics, security (Helmet, rate-limiting, sanitization), deployment |

**Overall Status:** All milestones complete. SkillBridge is **fully functional** and ready for production deployment.

---

## 21. Deployment Architecture

### Frontend (Client)

**Platform:** Vercel  
**Type:** Static SPA (Single Page Application)  
**Environment:** Production  

**Configuration:**
- `vercel.json`: SPA routing (all routes → `index.html`)
- Build: `npm run build` → `dist/`
- Auto-deploy on push to `main` branch
- HTTPS enabled by default
- Environment variables: `VITE_API_URL=<backend-url>`

**URL:** `https://skillbridge.vercel.app` (example)

### Backend (Server)

**Platform:** Render.io  
**Type:** Node.js Web Service  
**Environment:** Production  

**Configuration:**
- Runtime: Node 18+
- Build: `npm install`
- Start: `npm run dev` (uses Nodemon for auto-reload)
- Port: 5000 (exposed)
- Environment variables: `MONGO_URI`, `JWT_SECRET`, `NODE_ENV`, etc.

**URL:** `https://skillbridge-api.onrender.com` (example)

### Database

**Platform:** MongoDB Atlas  
**Type:** Managed NoSQL Cloud Database  
**Tier:** Free M0 (starter) or M2 (production-ready)  

**Configuration:**
- Cluster: `skillbridge-prod`
- Database: `skillbridge`
- Collections: `users`, `skills`, `careerpaths`, `userprogresses`
- Authentication: Username + password (stored in `.env`)
- Network: IP whitelist (all IPs allowed in dev; restrict in prod)

**Backup:** Atlas automatic daily backups (free tier)

### API Gateway & CORS

**Configuration:**
- Frontend origin: `https://skillbridge.vercel.app`
- Allowed methods: GET, POST, PUT, DELETE
- Credentials: true (httpOnly cookies)

### Environment Variables

**Backend (.env):**
```
PORT=5000
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/skillbridge
JWT_SECRET=your-secret-key-here
JWT_EXPIRES_IN=7d
NODE_ENV=production
```

**Frontend (.env):**
```
VITE_API_URL=https://skillbridge-api.onrender.com/api
```

### Deployment Workflow

```
1. Push code to GitHub (main branch)
   ↓
2. Vercel auto-deploys frontend (SPA routing)
   ↓
3. Render auto-deploys backend (Node.js)
   ↓
4. MongoDB Atlas syncs seed data (if needed)
   ↓
5. Test: https://skillbridge.vercel.app
```

---

## 22. Key Commands

### Installation

```bash
# Clone repository
git clone <repo-url>
cd careertrack

# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

### Database

```bash
# Seed database (from server/)
cd server
npm run seed
```

### Development Servers

```bash
# Terminal 1: Backend (port 5000)
cd server
npm run dev

# Terminal 2: Frontend (port 5173 default, 5174 configured in this project)
cd client
npm run dev
```

### Build & Deploy

```bash
# Build frontend
cd client
npm run build

# Build backend (Node.js doesn't need build, but verify syntax)
cd server
npm start  # Production mode (no hot-reload)
```

### Linting & Testing

```bash
# Run ESLint on frontend
cd client
npm run lint

# Run ESLint on backend
cd server
npm run lint
```

### Environment Variables

Create `.env` files in both `server/` and `client/`:

**server/.env:**
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/skillbridge
JWT_SECRET=your-secret
JWT_EXPIRES_IN=7d
NODE_ENV=development
```

**client/.env:**
```
VITE_API_URL=http://localhost:5000/api
```

---

## Summary

**SkillBridge** is a **full-stack MERN career advisor** that uses **5-layer profiling** (experience, certifications, skills, knowledge, personality), **weighted skill matching**, and **OCEAN personality alignment** to provide students with instant, personalized career fit analysis.

**Core Promise:** In 5 minutes, users understand which career paths fit them, exactly what skills they're missing, and a concrete roadmap to close gaps.

**Architecture:** Feature-based modular design with thin controllers, fat services, and security-first middleware. Deployed on Vercel (frontend), Render (backend), and MongoDB Atlas (database).

**Status:** ✅ **Fully Functional MVP** — All 8 milestones complete. Ready for production deployment and user testing.

---

**For detailed technical information, see:**
- `docs/architecture.md` — System design deep-dive
- `docs/data-models.md` — MongoDB schemas & relationships
- `docs/api-contracts.md` — Complete REST API specification
- `docs/QUICK_START.md` — Getting started & demo flow
- `CLAUDE.md` — AI operating manual & coding standards

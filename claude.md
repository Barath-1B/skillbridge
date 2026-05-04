# SkillBridge — CLAUDE.md
> AI Onboarding + Operating Manual for Claude Code

---

## Project Identity

**Name:** SkillBridge  
**Tagline:** Find your gap. Bridge it.  
**Type:** Full-Stack MERN Web Application  
**Assignment:** FSD-50 | Unique Code: E0423035  
**Program:** T.I.M.E. PCP-V (MERN Stack)

**What this project does:**  
SkillBridge is a career path advisor for CS students and professionals.  
It takes a user's skills, experience, certifications, and personality (OCEAN model),  
compares them against curated career profiles, and returns probabilistic match scores  
with a detailed gap analysis, milestone roadmap, and advantages — for every viable career path.

---

## Stack

| Layer     | Technology                              |
|-----------|-----------------------------------------|
| Frontend  | React 18 + Vite, Redux Toolkit, Axios   |
| Backend   | Node.js, Express.js                     |
| Database  | MongoDB + Mongoose                      |
| Auth      | JWT (httpOnly cookies) + bcrypt         |
| Styling   | Tailwind CSS                            |

---

## Architecture

Feature-based modular architecture on both client and server.

```
skillbridge/
├── client/src/
│   ├── features/        # One folder per feature (auth, profile, analyzer, explorer, roadmap, admin)
│   ├── components/      # Shared UI: common/, layout/, charts/
│   ├── hooks/           # Custom React hooks
│   ├── services/        # Axios API call functions per feature
│   ├── store/           # Redux store + slices
│   ├── routes/          # ProtectedRoute, AdminRoute, AppRouter
│   └── utils/           # Pure functions: matchScore, formatDate, oceanScorer
│
└── server/src/
    ├── modules/         # One folder per feature: auth/, careers/, analyzer/, admin/
    │   └── each has:    # routes.js → controller.js → service.js
    ├── models/          # Mongoose schemas
    ├── middleware/       # auth, role, error, validate
    ├── utils/           # gapEngine.js, matchScore.js, ApiResponse.js
    └── seed/            # careers.seed.js, skills.seed.js
```

For detailed structure see: `@docs/architecture.md`

---

## Data Models (Summary)

- **User** — name, email, password, role, currentSkills[], certifications[], experience, interests[], oceanScore{}
- **Skill** — name, category (skill/knowledge/certification/softSkill), tags[]
- **CareerPath** — title, domain, requiredSkills[{skillId, weight, priority}], phases[], resources[], advantages[]
- **UserProgress** — userId, careerPathId, completedSkills[], percentComplete *(v1: binary have/don't have)*

For schemas see: `@docs/data-models.md`

---

## Core Business Logic

### 5-Layer User Profile
1. **Experience** — Student / 0-1yr / 1-3yr / 3+yr
2. **Certifications** — AWS, Google ML, CFA, CompTIA, etc.
3. **Skills** — ML, DL, Data Analysis, DevOps, etc.
4. **Knowledge** — Python, SQL, TensorFlow, C++, etc.
5. **Personality** — Big Five OCEAN model (scored silently via 12 situational questions)

### Match Score Formula
```
Raw Score     = (user skills ∩ required skills) / total required skills
Weighted Score = Σ(matched skill weights) / Σ(all skill weights)
OCEAN Modifier = personality alignment bonus (-5% to +10%)
Final Score   = weighted score + OCEAN modifier
```

### Display Rules
- Show all career paths with score ≥ 20%
- Cap display at 10 results
- Sort by match % descending
- User can toggle "Show all paths" to reveal < 20% results

### User Journey (Value-First)
```
Landing → Onboarding (6 steps) → Results → [Optional] Register/Login → Dashboard
```
Auth is the LAST step. Guest users get full analysis. Login only to save results.

---

## Coding Standards

### Naming Conventions
- Files: `kebab-case` (e.g., `gap-engine.js`, `career-card.jsx`)
- Components: `PascalCase` (e.g., `CareerCard`, `GapReport`)
- Functions/variables: `camelCase`
- Constants: `UPPER_SNAKE_CASE`
- DB collections: `snake_case`

### JavaScript/React Rules
- Use `async/await` — never raw `.then()` chains
- No implicit `any` or loose equality (`==`) — always use `===`
- Functional components only — no class components
- Custom hooks for all reusable stateful logic
- All API calls live in `services/` — never inline in components
- Redux for global state; `useState` for local UI state only

### Express/Node Rules
- All routes go through middleware: `authenticate → validate → controller`
- Controllers are thin — business logic lives in `service.js`
- All responses use `ApiResponse` utility for consistency
- Always handle errors with `next(err)` — global error middleware catches all

### Git Conventions
- Branch: `feature/<name>` or `fix/<name>`
- Commits: conventional commits (`feat:`, `fix:`, `chore:`, `docs:`)
- PR required before merge to `main`

---

## Environment Variables

```
# server/.env
PORT=5000
MONGO_URI=mongodb://localhost:27017/skillbridge
JWT_SECRET=<secret>
JWT_EXPIRES_IN=7d
NODE_ENV=development

# client/.env
VITE_API_BASE_URL=http://localhost:5000/api
```

---

## Key Commands

```bash
# Install all dependencies
cd server && npm install
cd client && npm install

# Run dev (from root)
cd server && npm run dev      # nodemon on port 5000
cd client && npm run dev      # Vite on port 5173

# Seed database
cd server && npm run seed

# Run linter
npm run lint
```

---

## SOLID Principles Applied

- **S** — Each service has one responsibility (gapEngine only computes gaps)
- **O** — Career path data is config-driven; adding paths doesn't change engine code
- **L** — All API responses follow the same `ApiResponse` shape
- **I** — Route handlers only receive the middleware they need
- **D** — Controllers depend on service abstractions, not DB directly

---

## What NOT to Do

- Do NOT put business logic in controllers
- Do NOT put API calls directly in React components
- Do NOT use `var` — always `const` or `let`
- Do NOT use hardcoded strings for error messages — use constants
- Do NOT skip input validation on any API route
- Do NOT build a "classroom" — SkillBridge names skills/resources, it does not teach them

---

## Build Order (Incremental — Aligned with FSD-50 Sessions)

| Milestone | Focus                                      |
|-----------|--------------------------------------------|
| M1        | MongoDB models + seed data                 |
| M2        | Auth module (register, login, JWT)         |
| M3        | Profile setup + skill selection            |
| M4        | Gap analyzer engine (core logic)           |
| M5        | Career explorer + match scoring            |
| M6        | Roadmap + career brief view                |
| M7        | React frontend + Redux integration         |
| M8        | Admin panel + polish + deployment          |

---

## Reference Docs

- Architecture deep-dive: `@docs/architecture.md`
- Data models: `@docs/data-models.md`
- API contracts: `@docs/api-contracts.md`
- Seed data reference: `@server/seed/`
# SkillBridge Project Progress

## Completed ✅

### M1: MongoDB Models + Seed Data (DONE)
- ✅ User model with OCEAN score, skills, certifications
- ✅ Skill model with categories (skill, knowledge, cert, softSkill)
- ✅ CareerPath model with phases, resources, advantages
- ✅ UserProgress model for tracking
- ✅ Database connection (db.js)
- ✅ 55 seed skills (15 skills, 20 knowledge, 10 certs, 5 softSkills)
- ✅ 8 seed career paths (Full Stack, Data Analyst, ML Engineer, etc.)

### M2: Auth Module (DONE) ✅
- ✅ Server entry point (src/index.js)
- ✅ Middleware layer:
  - ✅ ApiError & ApiResponse utilities
  - ✅ Error handler middleware
  - ✅ Validate middleware (express-validator wrapper)
  - ✅ Authenticate middleware (JWT from cookies)
  - ✅ Role middleware (RBAC)
- ✅ Auth module:
  - ✅ Auth routes (register, login, logout, /me)
  - ✅ Auth controller (thin layer)
  - ✅ Auth service (business logic)
  - ✅ Auth validators (input validation)
- ✅ JWT stored in httpOnly cookies
- ✅ All endpoints tested and working:
  - ✅ POST /api/auth/register (201, creates user)
  - ✅ POST /api/auth/login (200, sets cookie)
  - ✅ GET /api/auth/me (200 with auth, 401 without)
  - ✅ POST /api/auth/logout (200, clears cookie)
- ✅ Error handling:
  - ✅ Duplicate email (409)
  - ✅ Validation errors (400)
  - ✅ Missing auth (401)

### MCP Setup (DEFERRED)
- ✅ Custom MongoDB MCP server created at server/mcp-server.mjs
- ✅ .mcp.json configured to use local MCP server
- ✅ .claude/settings.json has enabledMcpjsonServers: ["mongodb"]
- ⏳ SDK integration deferred (non-blocking enhancement)
- ℹ️ API is fully functional without MCP - all auth endpoints work perfectly

### M3: Profile Setup + Skill Selection (DONE) ✅
- ✅ Profile module with 5 endpoints
- ✅ GET /api/profile (authenticated, populated skills)
- ✅ PUT /api/profile (update experience, skillIds, certifications, interests)
- ✅ GET /api/profile/skills (public, optional category filter)
- ✅ GET /api/profile/ocean/questions (12 situational OCEAN questions)
- ✅ POST /api/profile/ocean (submit 12 answers, compute OCEAN scores 0-100)
- ✅ OCEAN scoring: Big Five traits (O,C,E,A,N) with default 50 if no answers
- ✅ All endpoints tested and working

### M4: Gap Analyzer Engine (DONE) ✅
- ✅ `server/src/utils/gap-engine.js` — pure gap analysis engine
  - OCEAN modifier: domain-specific ideal profiles, maps deviation → -5% to +10% pts
  - `analyzeCareerPath(userSkillIdSet, certifications, oceanScore, careerData)` — pure function
  - Returns: matchScore, weightedScore, oceanBonus, matchedSkills[], missingSkills[], gapCount, certificationGap[]
- ✅ Match score formula: weighted score (Σ matched weights / Σ total weights × 100) + OCEAN modifier, clamped 0-100
- ✅ Analyzer module (service, controller, routes)
- ✅ GET /api/analyze (authenticated) — runs full gap analysis for the user against all 8 career paths
- ✅ Response: sorted results by matchScore desc, eligibleCount (≥20%), userSkillCount, hasCompletedProfile
- ✅ Tested: user with 7 skills (JS, React, Node.js, Python, SQL, ML, Problem Solving)
  - Full Stack Dev: 61% (5 matched, 5 gap)
  - ML Engineer: 50% (4 matched, 6 gap)
  - 6 of 8 paths eligible (≥20%)
  - Sorted correctly, OCEAN bonus applied

### M5: Career Explorer + Match Scoring (DONE) ✅
- ✅ Careers module (service, controller, routes)
- ✅ GET /api/careers — list all career paths, optional filters: domain, difficulty, demand (public)
- ✅ GET /api/careers/:id — single career path detail with populated requiredSkills (public)
- ✅ GET /api/careers/:id/analyze — per-career gap analysis for authenticated user
- ✅ POST /api/careers/:id/save — save career to UserProgress (upsert, computes completedSkills + percentComplete)
- ✅ DELETE /api/careers/:id/save — unsave (404 if not found)
- ✅ GET /api/careers/saved — list user's saved careers with populated career path info
- ✅ Route ordering: /saved before /:id to avoid ObjectId cast error
- ✅ All endpoints tested and working

### M6: Roadmap + Career Brief View (DONE) ✅
- ✅ Roadmap module (service, controller, routes)
- ✅ GET /api/roadmap — user's active roadmaps with match score + gap count + progress
- ✅ GET /api/roadmap/:careerPathId — full career brief with:
  - Career details (title, domain, description, difficulty, demand, advantages, resources)
  - Gap analysis (matchScore, matchedSkills, missingSkills, certificationGap, OCEAN bonus)
  - Annotated phases (each skill marked have/missing based on user's current skills)
  - Progress tracking (isSaved, percentComplete, completedSkillCount)
- ✅ PATCH /api/roadmap/:careerPathId/skills/:skillId — toggle skill completion
- ✅ Phase annotation with smart substring matching (e.g., "SQL" matches "SQL basics")

### M7: React Frontend (DONE) ✅
- ✅ Frontend initialized with Vite + React 18
- ✅ Reusable components (AuthContext, axios interceptor, ProtectedRoute)
- ✅ Pages: Login, Register, Dashboard, CareerBrief
- ✅ Dashboard: two tabs (Explore Paths, My Roadmaps) with career cards and progress bars
- ✅ CareerBrief: full view with roadmap phases, match score, advantages, save button
- ✅ Routes: /login, /register, /dashboard, /career/:id, /roadmap/:id
- ✅ Environment: .env configured, vercel.json for SPA routing
- ✅ Frontend running on port 5173, backend on port 5000

## API Endpoints Summary

### Auth (Public)
- POST `/api/auth/register` — create account
- POST `/api/auth/login` — get JWT token (sets httpOnly cookie)
- POST `/api/auth/logout` — clear token
- GET `/api/auth/me` — current user profile (authenticated)

### Profile (Authenticated)
- GET `/api/profile` — get user profile with current skills
- PUT `/api/profile` — update experience, skillIds, certifications, interests
- GET `/api/profile/skills?category=` — list all skills (public, filterable)
- GET `/api/profile/ocean/questions` — get 12 OCEAN questions (public)
- POST `/api/profile/ocean` — submit OCEAN answers, compute scores

### Analyze (Authenticated)
- GET `/api/analyze` — gap analysis across all 8 career paths

### Careers (Mixed)
- GET `/api/careers?domain=&difficulty=&demand=` — list career paths (public, filterable)
- GET `/api/careers/:id` — single career detail (public)
- GET `/api/careers/:id/analyze` — gap analysis for one path (authenticated)
- POST `/api/careers/:id/save` — save career to UserProgress (authenticated, upsert)
- DELETE `/api/careers/:id/save` — unsave (authenticated)
- GET `/api/careers/saved` — user's saved careers (authenticated)

### Roadmap (Authenticated)
- GET `/api/roadmap` — user's active roadmaps with scores
- GET `/api/roadmap/:careerPathId` — career brief with annotated roadmap
- PATCH `/api/roadmap/:careerPathId/skills/:skillId` — toggle skill completion

## Tech Stack Status

| Layer | Tech | Status |
|-------|------|--------|
| Backend | Express.js | ✅ Running on port 5000 |
| Database | MongoDB | ✅ Connected (localhost:27017) |
| Auth | JWT + bcryptjs | ✅ Implemented |
| Validation | express-validator | ✅ In use |
| MCP | Custom server | ⏳ Deferred |
| Frontend | React 18 + Vite | ✅ Running on port 5173 |

## Current Status
**M1–M7 COMPLETE. Full MERN stack ready for testing and deployment.**

### Completed Milestones
- M1 ✅ MongoDB models + seed data (8 career paths, 55 skills)
- M2 ✅ Auth module (JWT + bcryptjs)
- M3 ✅ Profile setup (OCEAN personality scoring)
- M4 ✅ Gap analyzer engine (weighted match scoring)
- M5 ✅ Career explorer (list, filter, detail, save)
- M6 ✅ Roadmap + career brief (annotated phases, progress tracking)
- M7 ✅ React frontend (Login, Register, Dashboard, CareerBrief views)

# SkillBridge - Career Path Advisor

A full-stack MERN application that helps CS professionals find their ideal career path by analyzing their skills, experience, and personality profile (OCEAN model) against 8 curated career paths with detailed gap analysis and learning roadmaps.

## What It Does

1. **User Onboarding** — Register, build profile with skills/experience, take OCEAN personality assessment
2. **Career Matching** — Get ranked list of career paths (0-100% match score) based on weighted skill comparison + OCEAN personality alignment
3. **Gap Analysis** — See exactly which skills you have vs. need for each path
4. **Roadmap View** — Phase-by-phase learning plan for each career with progress tracking

## Tech Stack

| Layer | Tech |
|-------|------|
| Backend | Node.js + Express.js |
| Database | MongoDB (local: localhost:27017) |
| Frontend | React 18 + Vite |
| Auth | JWT (httpOnly cookies) + bcryptjs |
| Validation | express-validator |

## Getting Started

### Prerequisites
- Node.js + npm installed
- MongoDB running locally on `localhost:27017`

### Start Development Servers

```bash
# Terminal 1: Backend (port 5000)
cd server
npm install
npm run dev

# Terminal 2: Frontend (port 5173)
cd client
npm install
npm run dev
```

Visit http://localhost:5173 in your browser.

## Architecture

```
skillbridge/
├── server/src/
│   ├── models/              # MongoDB schemas (User, Skill, CareerPath, UserProgress)
│   ├── modules/             # Feature modules:
│   │   ├── auth/            # Register, login, JWT
│   │   ├── profile/         # Skills, OCEAN scoring
│   │   ├── analyzer/        # Gap engine, match scoring
│   │   ├── careers/         # Career list, detail, save
│   │   └── roadmap/         # Career brief, roadmap phases
│   ├── middleware/          # Auth, error handling
│   ├── utils/               # Gap engine, API response helpers
│   └── index.js             # Express entry point
│
└── client/src/
    ├── pages/               # Login, Register, Dashboard, CareerBrief
    ├── context/             # AuthContext (global auth state)
    ├── api/                 # Axios instance with JWT interceptor
    ├── components/          # ProtectedRoute guard
    └── App.jsx              # React Router setup
```

## Key Features

### 1. Smart Skill Matching (Gap Engine)
- Weighted scoring: `(matched_skill_weights / total_weights) × 100`
- OCEAN personality bonus: -5% to +10% based on career alignment
- Intelligent phase annotation: phase skills matched to user skills (e.g., "SQL basics" matches "SQL")

### 2. OCEAN Personality Profiling
- 12 situational questions → 5 trait scores (O, C, E, A, N)
- Domain-specific ideal profiles (e.g., AI Engineer ≠ Data Analyst)
- Default score 50 if trait not answered (neutral midpoint)

### 3. Career Data (8 Paths, 55 Skills)
- Full Stack Developer, Data Analyst, ML Engineer
- Healthcare Informatics, Financial Systems Developer
- Cybersecurity Analyst, Embedded Systems, Aerospace Software

Each path includes:
- 10 weighted required skills
- 3 learning phases with milestones
- Resources (courses, articles, videos)
- Career advantages

### 4. Progress Tracking
- Save career paths → creates UserProgress record
- Track completed skills vs. required
- Phase-by-phase skill annotations (have / missing)
- Percentage completion calculation

## API Endpoints

### Auth (POST)
- `/api/auth/register` → Create account
- `/api/auth/login` → Get JWT token
- `/api/auth/logout` → Clear token

### Profile (Authenticated)
- `GET /api/profile` — User profile + skills
- `PUT /api/profile` — Update skills, experience, certifications
- `POST /api/profile/ocean` — Submit OCEAN answers

### Analyze (Authenticated)
- `GET /api/analyze` — Gap analysis vs. all 8 career paths

### Careers (Public + Auth)
- `GET /api/careers` — List all paths (filterable by domain, difficulty, demand)
- `GET /api/careers/:id` — Career detail
- `POST /api/careers/:id/save` — Save career (auth)
- `GET /api/careers/saved` — User's saved careers (auth)

### Roadmap (Authenticated)
- `GET /api/roadmap` — Dashboard: saved careers with scores
- `GET /api/roadmap/:id` — Full career brief with annotated phases

## Testing Workflow

1. **Register** at `/register`
2. **Complete profile** at `/dashboard` → add skills, experience
3. **Take OCEAN assessment** in profile settings
4. **Explore careers** → see ranked list by match score
5. **View career detail** → see your match %, matched skills, missing skills
6. **Save paths** → track progress
7. **Check roadmap** → see phase breakdown with your skill status

## Deployment

### Backend → Render
1. Create `render.yaml` with MongoDB URI
2. Connect GitHub repo
3. Deploy

### Frontend → Vercel
1. Import GitHub repo
2. Set root to `client/`
3. Add env var: `VITE_API_URL = https://your-render-backend.onrender.com/api`

## Data Models

### User
```
name, email, password, role
currentSkills[Skill._id], certifications[], experience
interests[], oceanScore { O, C, E, A, N }
```

### Skill
```
name, category (skill/knowledge/certification/softSkill)
tags[]
```

### CareerPath
```
title, domain, description
requiredSkills[{ skillId, weight, priority }]
phases[{ phase, title, skills[], milestoneMonths }]
resources[{ title, url, type }]
advantages[], certifications[], difficulty, demand
estimatedTimeToBridge
```

### UserProgress
```
userId, careerPathId
completedSkills[Skill._id] — skills user has learned for this path
percentComplete — (completedSkills.length / requiredSkills.length) × 100
```

## Development Notes

- **Frontend state**: AuthContext for global auth, useState for local UI state
- **Backend validation**: express-validator on all POST/PUT routes
- **Error handling**: Centralized error middleware, all errors throw ApiError
- **JWT**: 7-day expiration, stored in httpOnly cookies for security
- **CORS**: Configured for localhost:5173 and production Vercel URL

## Next Steps (Future Enhancements)

- [ ] User progress tracking (mark skills as learned)
- [ ] Resource recommendations based on matched + missing skills
- [ ] Multi-step onboarding wizard
- [ ] Analytics dashboard for admins
- [ ] Email notifications
- [ ] Career path comparison tool
- [ ] Community discussion forums

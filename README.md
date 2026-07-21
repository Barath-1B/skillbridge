# SkillBridge

> **Find your gap. Bridge it.** — A career path advisor for CS students and early-career professionals.

SkillBridge takes a user's skills, experience, certifications, and personality (Big Five / OCEAN, plus a display-only MBTI type), compares them against curated career profiles, and returns probabilistic match scores with gap analysis, milestone roadmap, and a per-skill progress tracker.

---

## Stack

- **Frontend:** React 19 + Vite, Tailwind CSS, React Context, framer-motion
- **Backend:** Node.js + Express, MongoDB + Mongoose
- **Auth:** JWT in httpOnly cookies + bcrypt

## Layout

```
careertrack/
├── client/      React + Vite app
├── server/      Node + Express API
├── docs/        Project documentation
├── CLAUDE.md    AI onboarding & operating manual
└── README.md
```

`docs/Full project idea.md` is the master concept doc.

---

## Prerequisites

- Node.js 18+
- MongoDB 6+ (local or hosted)

## Install & run

```bash
# Backend
cd server && npm install
cp .env.example .env   # fill MONGO_URI, JWT_SECRET
npm run seed           # one-time: load skills + career paths
npm run dev            # http://localhost:5001
npm test               # node --test over tests/

# Frontend (in a second terminal)
cd client && npm install
npm run dev            # http://localhost:5173
npm run lint           # eslint .
npm run build           # production build
```

CI ([.github/workflows/ci.yml](.github/workflows/ci.yml)) runs server tests and client lint/build on push/PR. A pre-commit hook lives in [.githooks/](.githooks/) — activate it per clone with `git config core.hooksPath .githooks`.

## Environment variables

**`server/.env`**
```
PORT=5001
MONGO_URI=mongodb://localhost:27017/skillbridge
JWT_SECRET=<secret>
JWT_EXPIRES_IN=1h
REFRESH_EXPIRES_IN=30d
CLIENT_URL=http://localhost:5173
LOG_LEVEL=info
NODE_ENV=development
SENTRY_DSN=            # optional — error tracking is a no-op without it
```

**`client/.env`**
```
VITE_API_URL=http://localhost:5001/api
VITE_SENTRY_DSN=       # optional
```

---

## Documentation

| Doc | Purpose |
|---|---|
| [Project report](docs/PROJECT-REPORT.md) | Code-accurate end-to-end reference — wins where older docs disagree |
| [Full project idea](docs/Full%20project%20idea.md) | Original master concept doc (historical) |
| [Architecture](docs/architecture.md) | System architecture deep-dive |
| [Data models](docs/data-models.md) | Mongoose schemas |
| [API contracts](docs/api-contracts.md) | Endpoint reference |
| [Progress](docs/progress.md) | Milestone tracker |
| [Upgrade roadmap](docs/upgrade-roadmap.md) | Planned upgrades |
| [Retake tests feature](docs/RETAKE-TESTS-FEATURE.md) | Active feature spec |

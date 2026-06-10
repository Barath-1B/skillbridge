# SkillBridge

> **Find your gap. Bridge it.** — A career path advisor for CS students and early-career professionals.

SkillBridge takes a user's skills, experience, certifications, and personality (Big Five / OCEAN), compares them against curated career profiles, and returns probabilistic match scores with gap analysis, milestone roadmap, and a per-skill progress tracker.

---

## Stack

- **Frontend:** React 19 + Vite, Tailwind CSS, Redux Toolkit, framer-motion
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

# Frontend (in a second terminal)
cd client && npm install
npm run dev            # http://localhost:5173
```

## Environment variables

**`server/.env`**
```
PORT=5001
MONGO_URI=mongodb://localhost:27017/skillbridge
JWT_SECRET=<secret>
JWT_EXPIRES_IN=7d
NODE_ENV=development
```

**`client/.env`**
```
VITE_API_URL=http://localhost:5001/api
```

---

## Documentation

| Doc | Purpose |
|---|---|
| [Full project idea](docs/Full%20project%20idea.md) | Master concept, scope, features, design |
| [Architecture](docs/architecture.md) | System architecture deep-dive |
| [Data models](docs/data-models.md) | Mongoose schemas |
| [API contracts](docs/api-contracts.md) | Endpoint reference |
| [Progress](docs/progress.md) | Milestone tracker |
| [Retake tests feature](docs/RETAKE-TESTS-FEATURE.md) | Active feature spec |

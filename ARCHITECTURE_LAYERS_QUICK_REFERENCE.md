# SkillBridge — Three-Tier Architecture Quick Reference

## 🎯 Layer Overview

```
FRONTEND          MIDDLEWARE          BACKEND
(React Vite)      (Express Security)  (Node.js + MongoDB)
```

---

## 🎨 FRONTEND LAYER STRUCTURE

```
client/src/
│
├── store/                    ← Redux state management
│   ├── store.js             
│   └── slices/
│       ├── authSlice.js       (user, token, loading, error)
│       ├── profileSlice.js    (skills, certs, oceanScore)
│       └── careerSlice.js     (results, savedCareers)
│
├── services/                 ← API abstraction layer
│   ├── auth/auth.service.js
│   ├── profile/profile.service.js
│   ├── analyzer/analyzer.service.js
│   ├── careers/careers.service.js
│   ├── roadmap/roadmap.service.js
│   ├── admin/admin.service.js
│   └── explorer/explorer.service.js
│
├── api/                      ← HTTP client
│   └── axios.js             (withCredentials: true for cookies)
│
├── hooks/                    ← Custom React hooks
│   ├── useAuth.js           (returns user, token, auth state)
│   └── useFetch.js          (generic data fetching)
│
├── components/
│   ├── ProtectedRoute.jsx    (guards authenticated routes)
│   ├── common/
│   │   ├── Button.jsx        (primary/secondary/danger/success)
│   │   ├── Card.jsx
│   │   ├── Badge.jsx         (success/warning/danger/info)
│   │   ├── Spinner.jsx       (loading indicator)
│   │   └── ProgressBar.jsx
│   ├── layout/               (Header, Footer, Sidebar)
│   └── charts/               (MatchScoreChart, etc.)
│
├── pages/
│   ├── Landing.jsx           (public home page)
│   ├── Login.jsx             (authentication)
│   ├── Register.jsx          (signup)
│   ├── ProfileSetup.jsx      (skill selection)
│   ├── OceanQuiz.jsx         (personality assessment)
│   ├── AnalyzerResults.jsx   (career matches)
│   ├── Dashboard.jsx         (user dashboard)
│   ├── CareerBrief.jsx       (career details + roadmap)
│   └── admin/
│       ├── AdminDashboard.jsx
│       ├── AdminCareers.jsx
│       ├── AdminSkills.jsx
│       └── AdminUsers.jsx
│
└── utils/                    ← Helper functions
    ├── formatDate.js
    ├── constants.js
    ├── oceanScorer.js
    └── matchScore.js
```

**Key Files:**
- `App.jsx` — Routes definition
- `main.jsx` — Vite entry point
- `index.css` — Tailwind directives

---

## 🔐 MIDDLEWARE LAYER STRUCTURE

All middleware lives in `server/src/middleware/` and is applied in `server/src/index.js`.

```
server/src/index.js

  1. helmet()                    ← Security headers
  2. cors()                      ← Cross-origin
  3. cookieParser()              ← Parse cookies
  4. compression()               ← Gzip responses
  5. globalRateLimiter           ← 100 req/15min
  6. (route-specific middleware below)
     ├── authenticate()          ← Verify JWT
     ├── requireRole('admin')    ← Check role
     ├── validate()              ← Input validation + sanitization
     └── errorHandler()          ← Global error handler
```

**Middleware Files:**
- `authenticate.middleware.js` — JWT verification
- `role.middleware.js` — Role-based authorization  
- `validate.middleware.js` — Input validation + .trim() + .escape()
- `error.middleware.js` — Error handling

**Security Features:**
- Helmet: CSP, HSTS, X-Frame-Options, X-Content-Type-Options
- Rate Limiting: Global (100/15min) + Auth strict (10/15min)
- Input Sanitization: XSS prevention via .escape()
- Compression: gzip responses
- Env Validation: Check MONGO_URI, JWT_SECRET, PORT on startup

---

## 🔧 BACKEND LAYER STRUCTURE

```
server/src/
│
├── middleware/               ← Request interceptors (above)
│
├── config/
│   └── db.js                (MongoDB connection)
│
├── constants/
│   └── ocean-questions.js   (12 OCEAN survey questions)
│
├── models/                  ← MongoDB schemas
│   ├── user.model.js
│   ├── skill.model.js
│   ├── career-path.model.js
│   └── user-progress.model.js
│
├── utils/                   ← Pure functions
│   ├── ApiResponse.js       (standardized responses)
│   ├── ApiError.js          (standardized errors)
│   └── gap-engine.js        (career scoring algorithm)
│
├── modules/                 ← Feature modules (MVC)
│   ├── auth/
│   │   ├── auth.routes.js
│   │   ├── auth.controller.js
│   │   ├── auth.service.js
│   │   ├── auth.validators.js
│   │   └── index.js (barrel)
│   ├── profile/
│   │   ├── profile.routes.js
│   │   ├── profile.controller.js
│   │   ├── profile.service.js
│   │   ├── profile.validators.js
│   │   └── index.js
│   ├── analyzer/
│   │   ├── analyzer.routes.js
│   │   ├── analyzer.controller.js
│   │   ├── analyzer.service.js
│   │   └── index.js
│   ├── careers/
│   │   ├── careers.routes.js
│   │   ├── careers.controller.js
│   │   ├── careers.service.js
│   │   └── index.js
│   ├── roadmap/
│   │   ├── roadmap.routes.js
│   │   ├── roadmap.controller.js
│   │   ├── roadmap.service.js
│   │   └── index.js
│   └── admin/               ← NEW
│       ├── admin.routes.js   (10 endpoints)
│       ├── admin.controller.js
│       ├── admin.service.js
│       └── index.js
│
└── seed/                    ← Database initialization
    ├── skills.seed.js       (55 skills)
    ├── careers.seed.js      (8 career paths)
    └── run-seed.js
```

**Request Flow (per endpoint):**
```
POST /api/auth/register
  ↓
Middleware (validate input)
  ↓
Controller (extract data)
  ↓
Service (business logic)
  ↓
Model (database operations)
  ↓
ApiResponse.created({ data: user })
  ↓
Return to client
```

---

## 📊 REQUEST/RESPONSE JOURNEY

### Public Route (e.g., POST /auth/register)
```
CLIENT
  ↓ (axios.post with credentials)
FRONTEND SERVICE
  ↓
MIDDLEWARE:
  helmet() → cors() → cookieParser() → compression() → globalRateLimiter
  ↓
ROUTE MIDDLEWARE:
  validate(email, password, name) → .trim() + .escape()
  ↓
CONTROLLER:
  extract { email, password, name }
  ↓
SERVICE:
  hash password → create user in DB
  ↓
DATABASE:
  save user
  ↓
RESPONSE:
  ApiResponse.created({ user })
  ↓
COMPRESSION:
  gzip response
  ↓
CLIENT (receives response + httpOnly cookie)
```

### Protected Route (e.g., GET /api/profile)
```
CLIENT
  ↓ (axios.get - cookie sent automatically)
FRONTEND SERVICE
  ↓
MIDDLEWARE:
  helmet() → cors() → cookieParser() → compression() → globalRateLimiter
  ↓
ROUTE MIDDLEWARE:
  authenticate() → extract JWT from cookie/header → verify signature
  ↓
CONTROLLER:
  fetch user profile
  ↓
SERVICE:
  query database for user skills, certifications, oceanScore
  ↓
DATABASE:
  return user document
  ↓
RESPONSE:
  ApiResponse.ok({ profile: { skills, certs, ocean } })
  ↓
COMPRESSION:
  gzip response
  ↓
CLIENT (receives profile data)
```

### Admin Route (e.g., DELETE /api/admin/careers/:id)
```
CLIENT
  ↓ (axios.delete - admin user only)
FRONTEND SERVICE
  ↓
MIDDLEWARE:
  helmet() → cors() → cookieParser() → compression() → globalRateLimiter (100/15min check)
  ↓
ROUTE MIDDLEWARE:
  authenticate() → verify JWT
  requireRole('admin') → check user.role === 'admin'
  validate() → check path params
  ↓
CONTROLLER:
  extract careerPathId
  ↓
SERVICE:
  check if career exists
  check if career in use (referential integrity)
  delete career from DB
  ↓
DATABASE:
  delete document from career_paths
  ↓
RESPONSE:
  ApiResponse.ok({ deleted career })
  ↓
COMPRESSION:
  gzip response
  ↓
CLIENT (receives success message)
```

---

## 🔐 SECURITY STACK (In Order)

| Layer | What | How | File |
|-------|------|-----|------|
| 1 | HTTP Headers | helmet() | index.js:28 |
| 2 | CORS | cors() | index.js:26 |
| 3 | Rate Limiting (Global) | 100/15min | index.js:31-39 |
| 4 | Authentication | JWT verify | authenticate.middleware.js |
| 5 | Authorization | requireRole() | role.middleware.js |
| 6 | Input Validation | schema check | validate.middleware.js |
| 7 | Input Sanitization | .trim() + .escape() | auth.validators.js |
| 8 | Compression | gzip | index.js:29 |
| 9 | Error Handling | Global handler | error.middleware.js |

---

## 📱 COMPONENT HIERARCHY

```
<App> (Redux Provider + Auth Provider)
  ↓
<BrowserRouter>
  ↓
<Routes>
  ├─ <Route path="/">
  │   └─ <Landing />
  ├─ <Route path="/login">
  │   └─ <Login />
  ├─ <Route path="/dashboard">
  │   └─ <ProtectedRoute element={<Dashboard />} />
  │       └─ <Card>
  │           └─ <Button onClick={() => ...} />
  └─ <Route path="/admin">
      └─ <AdminRoute element={<AdminDashboard />} />
```

**Component Composition Pattern:**
```
<Page>
  ├─ useAuth() hook
  ├─ useFetch() hook
  ├─ <Card>
  │   ├─ <Button />
  │   ├─ <Badge />
  │   └─ <ProgressBar />
  └─ <Spinner /> (conditional)
```

---

## 🗂️ SUMMARIZED FILE COUNTS

| Layer | Category | Count | Status |
|-------|----------|-------|--------|
| **Frontend** | Pages | 9 | ✅ |
| | Components | 5 | ✅ |
| | Hooks | 2 | ✅ |
| | Services | 6 | ✅ |
| | Redux | 4 | ✅ |
| **Backend** | Modules | 6 | ✅ |
| | Models | 4 | ✅ |
| | Utilities | 3 | ✅ |
| **Middleware** | Middleware | 4 | ✅ |
| | Security | 5 | ✅ |
| **Total** | | **48+** | ✅ |

---

## 🚀 DEPLOYMENT

**Frontend:** Vercel  
**Backend:** Render.io  
**Database:** MongoDB Atlas  
**All:** HTTPS + httpOnly cookies

---

## ✅ DEMO CHECKLIST

- [x] Backend API live (port 5001)
- [x] Admin endpoints functional (10 routes)
- [x] Frontend landing page
- [x] Admin dashboard + pages
- [x] Redux store ready
- [x] Tailwind styling active
- [x] Security hardening complete
- [x] httpOnly cookies (no localStorage)
- [x] Rate limiting active
- [x] Input sanitization on all forms
- [x] All routes protected/guarded

**Ready to demo! 🎉**

# SkillBridge — Folder Structure Organized by Layer

## 📁 Complete Project Architecture

```
skillbridge/
│
├── 📋 ROOT CONFIG FILES
│   ├── package.json (root workspace - if monorepo)
│   ├── CLAUDE.md (AI operating manual)
│   ├── IMPROVEMENTS_SUMMARY.md (this session's work)
│   ├── FOLDER_STRUCTURE_BY_LAYER.md (this file)
│   └── template.md (MERN methodology reference)
│
│
├── 📚 DOCUMENTATION
│   └── docs/
│       ├── architecture.md
│       ├── api-contracts.md
│       ├── data-models.md
│       ├── progress.md
│       ├── QUICK_START.md
│       ├── README.md
│       └── DEMO.md
│
│
│ ═══════════════════════════════════════════════════════════════
│ 🔧 BACKEND (Node.js + Express + MongoDB)
│ ═══════════════════════════════════════════════════════════════
│
├── server/
│   ├── package.json
│   ├── .env
│   ├── nodemon.json
│   │
│   └── src/
│       ├── index.js (Entry point - all middleware, routes, error handling)
│       │
│       ├── 🔐 MIDDLEWARE LAYER (Request interceptors & protections)
│       │   └── middleware/
│       │       ├── authenticate.middleware.js (JWT verification)
│       │       ├── role.middleware.js (requireRole authorization)
│       │       ├── validate.middleware.js (Input validation + sanitization)
│       │       └── error.middleware.js (Global error handler)
│       │
│       ├── 🔧 SECURITY & CONFIG
│       │   ├── config/
│       │   │   └── db.js (MongoDB connection)
│       │   └── constants/
│       │       └── ocean-questions.js (12 OCEAN survey questions)
│       │
│       ├── 📊 DATA LAYER (MongoDB Schemas)
│       │   └── models/
│       │       ├── user.model.js
│       │       ├── skill.model.js
│       │       ├── career-path.model.js
│       │       └── user-progress.model.js
│       │
│       ├── 🔧 UTILITIES
│       │   └── utils/
│       │       ├── ApiResponse.js (Standardized response format)
│       │       ├── ApiError.js (Standardized error format)
│       │       └── gap-engine.js (Core business logic - scoring algorithm)
│       │
│       ├── 📡 FEATURE MODULES (Service Layer)
│       │   └── modules/
│       │       │
│       │       ├── auth/
│       │       │   ├── auth.routes.js
│       │       │   ├── auth.controller.js
│       │       │   ├── auth.service.js
│       │       │   ├── auth.validators.js
│       │       │   └── index.js (barrel export)
│       │       │
│       │       ├── profile/
│       │       │   ├── profile.routes.js
│       │       │   ├── profile.controller.js
│       │       │   ├── profile.service.js
│       │       │   ├── profile.validators.js
│       │       │   └── index.js
│       │       │
│       │       ├── analyzer/
│       │       │   ├── analyzer.routes.js
│       │       │   ├── analyzer.controller.js
│       │       │   ├── analyzer.service.js
│       │       │   └── index.js
│       │       │
│       │       ├── careers/
│       │       │   ├── careers.routes.js
│       │       │   ├── careers.controller.js
│       │       │   ├── careers.service.js
│       │       │   └── index.js
│       │       │
│       │       ├── roadmap/
│       │       │   ├── roadmap.routes.js
│       │       │   ├── roadmap.controller.js
│       │       │   ├── roadmap.service.js
│       │       │   └── index.js
│       │       │
│       │       └── admin/ ⭐ NEW (M8)
│       │           ├── admin.routes.js (10 endpoints)
│       │           ├── admin.controller.js
│       │           ├── admin.service.js
│       │           └── index.js
│       │
│       └── 🌱 SEED DATA
│           └── seed/
│               ├── skills.seed.js (55 skills)
│               ├── careers.seed.js (8 career paths)
│               └── run-seed.js
│
│
│ ═══════════════════════════════════════════════════════════════
│ 🎨 FRONTEND (React + Vite + Redux)
│ ═══════════════════════════════════════════════════════════════
│
├── client/
│   ├── package.json (React 18, react-router-dom v7, Redux Toolkit, Tailwind)
│   ├── .env
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js ⭐ NEW
│   ├── postcss.config.js ⭐ NEW
│   ├── vercel.json (Deployment config)
│   │
│   └── src/
│       ├── main.jsx (Vite entry point)
│       ├── App.jsx (Route definitions)
│       ├── index.css ⭐ (Tailwind directives + utilities)
│       │
│       ├── 🔐 AUTHENTICATION & CONTEXT
│       │   ├── context/
│       │   │   └── AuthContext.jsx (Auth provider - localStorage removed ⭐)
│       │   └── routes/
│       │       ├── ProtectedRoute.jsx (Guard protected routes)
│       │       └── AdminRoute.jsx ⭐ NEW (Guard /admin routes)
│       │
│       ├── 🛠️ STATE MANAGEMENT (Redux Toolkit)
│       │   └── store/
│       │       ├── store.js ⭐ NEW (configureStore)
│       │       └── slices/ ⭐ NEW
│       │           ├── authSlice.js (user, token, loading, error)
│       │           ├── profileSlice.js (skills, certs, oceanScore, etc.)
│       │           └── careerSlice.js (results, savedCareers)
│       │
│       ├── 📡 API INTEGRATION
│       │   ├── api/
│       │   │   └── axios.js (Axios instance with credentials ⭐)
│       │   └── services/
│       │       ├── index.js (barrel - all service exports)
│       │       ├── auth/
│       │       │   ├── auth.service.js ⭐ NEW
│       │       │   └── index.js
│       │       ├── profile/
│       │       │   ├── profile.service.js ⭐ NEW
│       │       │   └── index.js
│       │       ├── analyzer/
│       │       │   ├── analyzer.service.js ⭐ NEW
│       │       │   └── index.js
│       │       ├── explorer/
│       │       │   ├── explorer.service.js ⭐ NEW
│       │       │   └── index.js
│       │       ├── roadmap/
│       │       │   ├── roadmap.service.js ⭐ NEW
│       │       │   └── index.js
│       │       └── admin/
│       │           ├── admin.service.js ⭐ NEW
│       │           └── index.js
│       │
│       ├── 🪝 CUSTOM HOOKS
│       │   └── hooks/ ⭐ NEW
│       │       ├── useAuth.js (Redux/Context auth state)
│       │       ├── useFetch.js (Generic data fetching)
│       │       └── index.js (barrel export)
│       │
│       ├── 🧩 SHARED UI COMPONENTS
│       │   └── components/
│       │       ├── ProtectedRoute.jsx
│       │       ├── common/ ⭐ NEW
│       │       │   ├── Button.jsx (primary/secondary/danger/success)
│       │       │   ├── Card.jsx
│       │       │   ├── Badge.jsx
│       │       │   ├── Spinner.jsx
│       │       │   ├── ProgressBar.jsx
│       │       │   └── index.js (barrel export)
│       │       ├── layout/ (empty - ready for Header, Footer, Sidebar)
│       │       └── charts/ (empty - ready for MatchScoreChart, etc.)
│       │
│       ├── 📄 PAGE COMPONENTS
│       │   └── pages/
│       │       ├── Landing.jsx ⭐ NEW (Hero + CTA)
│       │       ├── Login.jsx
│       │       ├── Register.jsx
│       │       ├── ProfileSetup.jsx
│       │       ├── OceanQuiz.jsx
│       │       ├── AnalyzerResults.jsx ⭐ (Fixed data shape)
│       │       ├── Dashboard.jsx
│       │       ├── CareerBrief.jsx
│       │       ├── Onboarding.jsx
│       │       └── admin/ ⭐ NEW
│       │           ├── AdminDashboard.jsx
│       │           ├── AdminCareers.jsx
│       │           ├── AdminSkills.jsx
│       │           └── AdminUsers.jsx
│       │
│       ├── 🎯 FEATURE SLICES (Optional restructure)
│       │   └── features/ (Currently empty - ready for expansion)
│       │       ├── auth/
│       │       ├── profile/
│       │       ├── analyzer/
│       │       ├── explorer/
│       │       ├── roadmap/
│       │       └── admin/
│       │
│       └── 🛠️ UTILITIES
│           └── utils/ ⭐ NEW (Ready for expansion)
│               ├── formatDate.js
│               ├── constants.js
│               ├── oceanScorer.js
│               ├── matchScore.js
│               └── index.js
│
│
│ ═══════════════════════════════════════════════════════════════
│ 🔐 MIDDLEWARE LAYER (Cross-cutting concerns)
│ ═══════════════════════════════════════════════════════════════
│
│ Location: server/src/middleware/
│ Integrated in: server/src/index.js
│
│ Stack Order:
│ 1. helmet() — Security headers
│ 2. cors() — Cross-origin requests
│ 3. cookieParser() — Parse cookies
│ 4. compression() — Gzip responses
│ 5. globalRateLimiter — 100 req/15min
│ 6. authenticate — JWT verification
│ 7. requireRole() — Role-based access
│ 8. validate() — Input validation + sanitization
│ 9. error() — Global error handler
│
└── .mcp.json (MCP server config)
```

---

## 🎯 Layer-by-Layer Organization

### **BACKEND STRUCTURE**
```
server/
├── Models (Data Layer)
│   └── models/*.model.js
├── Middleware (Request Interceptors)
│   └── middleware/*.middleware.js
├── Config (Environment & Connections)
│   └── config/db.js
├── Constants
│   └── constants/ocean-questions.js
├── Utilities (Pure Functions)
│   └── utils/{ApiResponse, ApiError, gap-engine}
├── Feature Modules (MVC Pattern)
│   └── modules/
│       └── {auth, profile, analyzer, careers, roadmap, admin}/
│           ├── routes.js
│           ├── controller.js
│           ├── service.js
│           └── validators.js
└── Seed Data
    └── seed/{skills, careers, run-seed}
```

**Request Flow:**
```
HTTP Request
    ↓
Middleware (helmet, cors, cookieParser, compression, rateLimit)
    ↓
Route Handler (authenticate, requireRole, validate)
    ↓
Controller (Extract & validate request)
    ↓
Service (Business Logic)
    ↓
Model (Database)
    ↓
ApiResponse (Format response)
    ↓
Error Handler (if error)
    ↓
HTTP Response
```

---

### **FRONTEND STRUCTURE**
```
client/
├── State Management (Redux)
│   └── store/
│       ├── store.js
│       └── slices/{authSlice, profileSlice, careerSlice}
├── HTTP Client
│   └── api/axios.js
├── API Layer (Service Abstraction)
│   └── services/
│       └── {auth, profile, analyzer, explorer, roadmap, admin}/
│           └── *.service.js
├── Authentication & Routing
│   ├── context/AuthContext.jsx
│   └── routes/{ProtectedRoute, AdminRoute}
├── Custom Hooks
│   └── hooks/{useAuth, useFetch}
├── Reusable Components
│   └── components/
│       ├── common/{Button, Card, Badge, Spinner, ProgressBar}
│       ├── layout/(Header, Footer, Sidebar)
│       └── charts/(MatchScoreChart, etc.)
├── Pages (Smart Components)
│   └── pages/
│       ├── {Landing, Login, Register, ...}
│       └── admin/{AdminDashboard, AdminCareers, ...}
└── Utilities
    └── utils/{formatDate, constants, oceanScorer, matchScore}
```

**Component Hierarchy:**
```
<App> (Redux Provider + Auth Provider)
    ↓
<BrowserRouter>
    ↓
<Routes>
    ├── <ProtectedRoute /> (guards user routes)
    └── <AdminRoute /> (guards admin routes)
        ↓
    <Pages>
        ↓
    <Components>
        ├── <common/Button />
        ├── <common/Card />
        └── <common/Badge />
```

---

### **MIDDLEWARE LAYER**
```
Global Middleware (Applied to ALL routes)
├── helmet() — HTTP security headers
├── cors() — Cross-origin requests
├── cookieParser() — Parse httpOnly cookies
├── compression() — Gzip responses
└── rateLimit() — Global rate limiting (100/15min)

Route-Specific Middleware (Applied per route)
├── authenticate() — Verify JWT from cookie/header
├── requireRole() — Check user role (admin, student, etc.)
├── validate() — Input validation + sanitization
└── <controller>() — Route handler

Error Handling
└── errorHandler() — Global error middleware
```

**Protection Layers:**
```
LAYER 1: HTTP Headers (helmet)
  ├── CSP (Content-Security-Policy)
  ├── HSTS (HTTP Strict Transport Security)
  ├── X-Frame-Options (Prevent clickjacking)
  └── X-Content-Type-Options (Prevent MIME sniffing)

LAYER 2: Rate Limiting
  ├── Global: 100 req/15min
  └── Auth: 10 req/15min (brute-force prevention)

LAYER 3: Authentication
  └── JWT verification (httpOnly cookie or Bearer header)

LAYER 4: Authorization
  └── Role-based access (requireRole('admin'))

LAYER 5: Input Validation
  ├── Format validation (email, URL, etc.)
  └── Sanitization (.trim(), .escape() - XSS prevention)

LAYER 6: Compression
  └── gzip response bodies
```

---

## 📊 Summary Table

| Layer | Purpose | Location | Key Files |
|-------|---------|----------|-----------|
| **Backend** | Server logic, APIs, Database | `server/src/` | modules/, models/, middleware/ |
| **Frontend** | UI, State, Routing, Components | `client/src/` | pages/, components/, hooks/, store/ |
| **Middleware** | Req interceptors, Security, Auth | `server/src/middleware/` + `server/src/index.js` | authenticate.js, role.js, validate.js, error.js |
| **Database** | MongoDB Schemas | `server/src/models/` | *.model.js |
| **Config** | Environment, Dependencies | Root + `server/` + `client/` | .env, package.json, vite.config.js |
| **Utilities** | Pure functions, Helpers | `server/src/utils/` + `client/src/utils/` | gap-engine.js, ApiResponse.js |

---

## ⭐ NEW IN THIS SESSION

**Backend (🔧):**
- ✅ `server/src/modules/admin/` — Complete admin module
- ✅ Security middleware enhancements in `server/src/index.js`

**Frontend (🎨):**
- ✅ `client/src/store/` — Redux store + 3 slices
- ✅ `client/src/components/common/` — 5 reusable components
- ✅ `client/src/hooks/` — 2 custom hooks
- ✅ `client/src/pages/admin/` — 4 admin pages
- ✅ `client/src/pages/Landing.jsx` — Landing page
- ✅ `client/src/routes/AdminRoute.jsx` — Route guard
- ✅ `client/src/services/*/` — 6 service files

**Middleware (🔐):**
- ✅ Helmet, rate limiting, compression in `server/src/index.js`
- ✅ Input sanitization in validators

---

## 🚀 Next Steps for Perfect Organization

1. **Migrate feature folders** — Move page logic into `client/src/features/{auth,profile,analyzer,etc.}`
2. **Add layout components** — Header, Footer, Sidebar in `client/src/components/layout/`
3. **Add chart components** — MatchScoreChart in `client/src/components/charts/`
4. **Complete utils** — Add formatDate, oceanScorer, matchScore to `client/src/utils/`
5. **Add tests** — `server/__tests__/` and `client/__tests__/` directories

---

**This structure maintains clean separation of concerns across all three layers!**

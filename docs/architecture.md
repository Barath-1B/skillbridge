# SkillBridge Architecture

## Overview
SkillBridge uses a **feature-based modular architecture** across both frontend and backend. This approach ensures clear separation of concerns, scalability, and ease of maintenance.

## Frontend Architecture (client/src/)

```
client/src/
├── features/              # Feature-specific UI logic
│   ├── auth/             # Login, Register flows
│   ├── profile/          # Profile setup, skill selection
│   ├── analyzer/         # Gap analysis, results
│   ├── explorer/         # Career path browsing
│   ├── roadmap/          # Milestone tracking
│   └── admin/            # Admin panel
│
├── components/           # Shared UI components
│   ├── common/           # Buttons, modals, cards, inputs
│   ├── layout/           # Header, Footer, Sidebar
│   └── charts/           # Visualizations, graphs
│
├── hooks/                # Custom React hooks
│   ├── useAuth.js        # Auth state & logic
│   ├── useFetch.js       # API calls with loading/error
│   └── ...
│
├── services/             # Axios API functions per feature
│   ├── auth/            # login(), register(), logout()
│   ├── profile/         # getProfile(), updateSkills()
│   ├── analyzer/        # analyzeProfile()
│   └── ...
│
├── store/               # Redux state management
│   ├── store.js         # Redux store configuration
│   └── slices/          # Redux slices (auth, profile, etc.)
│
├── routes/              # Route definitions & guards
│   ├── AppRouter.jsx    # Main router
│   ├── ProtectedRoute.jsx
│   └── AdminRoute.jsx
│
├── utils/               # Pure utility functions
│   ├── matchScore.js
│   ├── formatDate.js
│   ├── oceanScorer.js
│   └── constants.js
│
├── App.jsx              # Root component
└── main.jsx             # Entry point
```

### Component Guidelines
- **Functional components only** — no class components
- Keep components focused and single-responsibility
- Local state with `useState`, global state with Redux
- All API calls through `services/`, never inline

---

## Backend Architecture (server/src/)

```
server/src/
├── modules/              # Feature modules
│   ├── auth/
│   │   ├── routes.js     # Route definitions
│   │   ├── controller.js # Request handlers
│   │   └── service.js    # Business logic
│   ├── careers/
│   ├── analyzer/
│   └── admin/
│
├── models/               # Mongoose schemas
│   ├── user.model.js
│   ├── career-path.model.js
│   ├── skill.model.js
│   └── user-progress.model.js
│
├── middleware/           # Express middleware
│   ├── authenticate.middleware.js  # JWT verification
│   ├── role.middleware.js          # Role-based access
│   ├── validate.middleware.js      # Input validation
│   └── error.middleware.js         # Global error handler
│
├── config/               # Configuration files
│   └── db.js            # MongoDB connection
│
├── utils/                # Helper functions
│   ├── ApiResponse.js    # Standardized response format
│   ├── ApiError.js       # Standardized error handling
│   ├── gap-engine.js     # Gap analysis logic
│   └── matchScore.js     # Score calculation
│
├── seed/                 # Database seeding
│   ├── careers.seed.js
│   ├── skills.seed.js
│   └── run-seed.js
│
└── index.js              # Server entry point
```

### Request Flow
```
Request
  ↓
Route (routes.js)
  ↓
Authenticate Middleware
  ↓
Validate Middleware
  ↓
Controller (thin handler)
  ↓
Service (business logic)
  ↓
Model (database)
  ↓
Response (ApiResponse utility)
```

---

## Data Flow

### User Analysis Flow
1. User completes profile setup (skills, certifications, experience)
2. User answers OCEAN questionnaire
3. Frontend sends POST /analyzer/analyze
4. Backend:
   - Retrieves all career paths
   - Runs gap-engine.js (computes matching skills)
   - Calculates match scores
   - Applies OCEAN modifier
   - Returns results with gap analysis
5. Frontend displays results sorted by match %

---

## Key Design Decisions

### 1. Value-First User Journey
Authentication is the **last step**, not the first. Guest users get full analysis, can optionally register/login to save results.

### 2. Config-Driven Career Data
Career paths are stored in the database, not hardcoded. Adding new paths requires no code changes.

### 3. Single Responsibility Services
- `gap-engine.js` — only gap analysis
- `matchScore.js` — only score calculation
- Each service does one thing well

### 4. Redux for Global State Only
- Redux: auth, user profile, career results
- Local state: UI toggles, form inputs, loading states

### 5. API Response Standardization
All responses use `ApiResponse` utility:
```js
res.json(new ApiResponse(200, data, "Success message"))
```

---

## Performance Considerations

- **Caching**: Career paths cached on frontend after first load
- **Pagination**: Results capped at 10, "Show all" option available
- **Lazy Loading**: Feature components loaded on demand
- **Debouncing**: Search/filter inputs debounced

---

## Testing Strategy

- **Unit**: Services, utils, pure functions
- **Integration**: API endpoints with real DB
- **E2E**: User journeys (onboarding → analysis → results)


# SkillBridge Folder Structure

Complete project layout with all folders and key files.

```
skillbridge/
│
├── client/                           # Frontend (React + Vite)
│   ├── src/
│   │   ├── features/                 # Feature-specific UI
│   │   │   ├── auth/                 # Login, Register
│   │   │   ├── profile/              # Profile setup
│   │   │   ├── analyzer/             # Gap analysis results
│   │   │   ├── explorer/             # Career browsing
│   │   │   ├── roadmap/              # Learning milestones
│   │   │   └── admin/                # Admin panel
│   │   │
│   │   ├── components/               # Shared UI components
│   │   │   ├── common/               # Buttons, cards, inputs, modals
│   │   │   ├── layout/               # Header, Footer, Sidebar
│   │   │   └── charts/               # Visualizations, graphs
│   │   │
│   │   ├── hooks/                    # Custom React hooks
│   │   │   ├── useAuth.js
│   │   │   ├── useFetch.js
│   │   │   └── ...
│   │   │
│   │   ├── services/                 # Axios API functions
│   │   │   ├── auth/
│   │   │   │   ├── auth.service.js
│   │   │   │   └── index.js
│   │   │   ├── profile/
│   │   │   ├── analyzer/
│   │   │   ├── explorer/
│   │   │   ├── roadmap/
│   │   │   ├── admin/
│   │   │   └── index.js
│   │   │
│   │   ├── store/                    # Redux state management
│   │   │   ├── store.js
│   │   │   └── slices/
│   │   │       ├── authSlice.js
│   │   │       ├── profileSlice.js
│   │   │       ├── careerSlice.js
│   │   │       └── ...
│   │   │
│   │   ├── routes/                   # Route definitions
│   │   │   ├── AppRouter.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   └── AdminRoute.jsx
│   │   │
│   │   ├── utils/                    # Pure utility functions
│   │   │   ├── matchScore.js
│   │   │   ├── formatDate.js
│   │   │   ├── oceanScorer.js
│   │   │   ├── constants.js
│   │   │   └── validators.js
│   │   │
│   │   ├── api/                      # Axios instance
│   │   │   └── axios.js
│   │   │
│   │   ├── context/                  # (Legacy) Context API
│   │   │   └── AuthContext.jsx
│   │   │
│   │   ├── pages/                    # (Legacy) Page components
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   └── ...
│   │   │
│   │   ├── App.jsx                   # Root component
│   │   ├── main.jsx                  # Entry point
│   │   ├── index.css                 # Global styles
│   │   └── ...
│   │
│   ├── public/                       # Static assets
│   ├── package.json
│   ├── vite.config.js
│   ├── eslint.config.js
│   ├── index.html
│   └── .env                          # VITE_API_BASE_URL=http://localhost:5000/api
│
│
├── server/                           # Backend (Node + Express)
│   ├── src/
│   │   ├── modules/                  # Feature modules
│   │   │   ├── auth/
│   │   │   │   ├── routes.js         # Route definitions
│   │   │   │   ├── controller.js     # Request handlers
│   │   │   │   ├── service.js        # Business logic
│   │   │   │   └── index.js
│   │   │   ├── careers/              # Career path endpoints
│   │   │   │   ├── routes.js
│   │   │   │   ├── controller.js
│   │   │   │   ├── service.js
│   │   │   │   └── index.js
│   │   │   ├── analyzer/             # Gap analysis logic
│   │   │   │   ├── routes.js
│   │   │   │   ├── controller.js
│   │   │   │   ├── service.js
│   │   │   │   └── index.js
│   │   │   ├── admin/                # Admin endpoints
│   │   │   │   ├── routes.js
│   │   │   │   ├── controller.js
│   │   │   │   ├── service.js
│   │   │   │   └── index.js
│   │   │   └── profile/              # User profile management
│   │   │       ├── routes.js
│   │   │       ├── controller.js
│   │   │       ├── service.js
│   │   │       └── index.js
│   │   │
│   │   ├── models/                   # Mongoose schemas
│   │   │   ├── user.model.js
│   │   │   ├── career-path.model.js
│   │   │   ├── skill.model.js
│   │   │   ├── user-progress.model.js
│   │   │   └── ...
│   │   │
│   │   ├── middleware/               # Express middleware
│   │   │   ├── authenticate.middleware.js
│   │   │   ├── role.middleware.js
│   │   │   ├── validate.middleware.js
│   │   │   ├── error.middleware.js
│   │   │   └── ...
│   │   │
│   │   ├── config/                   # Configuration
│   │   │   └── db.js                 # MongoDB connection
│   │   │
│   │   ├── utils/                    # Helper functions
│   │   │   ├── ApiResponse.js        # Standardized response
│   │   │   ├── ApiError.js           # Standardized errors
│   │   │   ├── gap-engine.js         # Gap analysis logic
│   │   │   ├── matchScore.js         # Score calculation
│   │   │   └── ...
│   │   │
│   │   ├── constants/                # Constants
│   │   │   └── ocean-questions.js    # OCEAN quiz questions
│   │   │
│   │   ├── seed/                     # Database seeding
│   │   │   ├── careers.seed.js       # Career path data
│   │   │   ├── skills.seed.js        # Skill definitions
│   │   │   └── run-seed.js           # Seed runner
│   │   │
│   │   └── index.js                  # Server entry point
│   │
│   ├── package.json
│   ├── .env                          # PORT, MONGO_URI, JWT_SECRET, etc.
│   ├── mcp-server.mjs                # MCP server integration
│   └── ...
│
│
├── docs/                             # Documentation
│   ├── README.md                     # Docs index
│   ├── architecture.md               # System design & folder structure
│   ├── data-models.md                # MongoDB schemas & relationships
│   └── api-contracts.md              # API endpoint specifications
│
│
├── CLAUDE.md                         # Project instructions & conventions
├── README.md                         # Project overview
├── QUICK_START.md                    # Getting started guide
├── progress.md                       # Development progress tracking
├── FOLDER_STRUCTURE.md               # This file
└── ...
```

## Key Conventions

### Frontend (client/)
- **Files**: kebab-case (`career-card.jsx`, `gap-engine.js`)
- **Components**: PascalCase (`CareerCard`, `GapReport`)
- **Functions/vars**: camelCase
- **All API calls**: in `services/`, never inline in components
- **State management**: Redux for global, `useState` for local UI

### Backend (server/)
- **Routing**: Module-based, thin controllers, fat services
- **Responses**: Use `ApiResponse` utility for consistency
- **Errors**: Global error middleware catches all via `next(err)`
- **Models**: Mongoose schemas in `models/` folder

### Database
- **Collections**: snake_case
- **Fields**: camelCase
- **Relationships**: Use Mongoose refs and indexes

## File Creation Workflow

When adding new features:

1. **Backend**: Create `modules/<feature>/{routes.js, controller.js, service.js}`
2. **Frontend**: Create `features/<feature>/` for UI logic
3. **API Service**: Create `services/<feature>/<feature>.service.js`
4. **Components**: Create in `components/` and reference in features
5. **Redux**: Add slice in `store/slices/` if global state needed

## Next Steps

- Review [architecture.md](docs/architecture.md) for design patterns
- Check [api-contracts.md](docs/api-contracts.md) for API specs
- Review [data-models.md](docs/data-models.md) for data layer
- Start building features in the milestones defined in CLAUDE.md


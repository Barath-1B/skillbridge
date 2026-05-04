# MERN Stack Project Template
## How to Build a Full-Stack App Using This Methodology

This template documents the exact structure and step-by-step process used to build FSD-50.
Use this as a blueprint to create any MERN project with the same architecture.

---

## Step 1: Define Your Project Idea

Before writing any code, answer these questions:

| Question | FSD-50 Example | Your Project |
|---|---|---|
| **What does this app do?** | Manages data retention policies and auto-archives expired records | ? |
| **Who are the users?** | USER (creates records), ADMIN (manages policies) | ? |
| **What are the core entities?** | Users, RetentionPolicies, Records | ? |
| **What are the business rules?** | Records expire, cron auto-archives, immutable once archived | ? |
| **What is the access control?** | USER vs ADMIN roles with different permissions | ? |

---

## Step 2: Folder Structure

Create this exact folder skeleton every time:

```
your-project/
├── backend/
│   ├── models/          ← Mongoose schemas (one file per entity)
│   ├── routes/          ← Express route handlers (one file per resource)
│   ├── middleware/      ← Auth + role guard middleware
│   ├── jobs/            ← Cron jobs / background tasks
│   ├── .env             ← Environment variables (never commit)
│   ├── server.js        ← Entry point: DB connect, CORS, routes, jobs
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── axios.js         ← Axios instance with JWT interceptor
│   │   ├── context/
│   │   │   └── AuthContext.jsx  ← Global auth state
│   │   ├── components/
│   │   │   └── ProtectedRoute.jsx ← Route guard by role
│   │   ├── pages/               ← One .jsx file per page/view
│   │   ├── App.jsx              ← Routes defined here
│   │   └── main.jsx             ← React DOM render entry
│   ├── index.html
│   ├── vite.config.js
│   ├── vercel.json              ← SPA routing fix for Vercel
│   ├── .env
│   └── package.json
├── docs/                ← All documentation lives here
│   ├── README.md
│   ├── SETUP.md
│   └── template.md
├── render.yaml          ← Render deployment config (stays at root)
└── .gitignore
```

---

## Step 3: Database Design

Design your MongoDB collections before writing any code.

### Pattern: One Mongoose model per collection

```javascript
// Template structure for any model
const mongoose = require('mongoose');

const yourSchema = new mongoose.Schema({
  name:      { type: String, required: true, unique: true },
  status:    { type: String, enum: ['ACTIVE', 'OTHER'], default: 'ACTIVE' },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('YourModel', yourSchema);
```

### FSD-50's Three Collections

| Collection | Purpose | Key Fields |
|---|---|---|
| `users` | Auth accounts | username, email, password (hashed), role |
| `retentionpolicies` | Rules linking category → expiry days | name, category (unique), retentionDays |
| `records` | The main data entities | title, content, category, status, policyId, expiresAt, archivedAt |

### Rules When Designing Collections
1. Every collection needs a `createdAt` timestamp
2. Cross-collection references use `ObjectId` ref (like a foreign key)
3. Put computed fields on the schema (e.g., `expiresAt`) not in business logic
4. Enum fields for status values prevent invalid states
5. Unique constraints where needed (e.g., category must be unique per policy)

---

## Step 4: Backend Setup

### 4a. Initialize the Backend

```bash
mkdir backend && cd backend
npm init -y
npm install express mongoose bcryptjs jsonwebtoken dotenv cors node-cron
npm install --save-dev nodemon
```

**package.json scripts:**
```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}
```

### 4b. Create server.js (Entry Point)

This is always the same skeleton:

```javascript
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: [process.env.CORS_ORIGIN, 'http://localhost:5173'],
  credentials: true,
}));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/resource1', require('./routes/resource1'));
app.use('/api/resource2', require('./routes/resource2'));

// Connect DB, then start server + jobs
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    require('./jobs/yourCronJob').start();  // Only if you have a cron job
    app.listen(process.env.PORT || 5000, () => console.log('Server running'));
  })
  .catch(err => { console.error(err); process.exit(1); });
```

### 4c. Auth Middleware (Reuse Every Time)

**middleware/auth.js** — Verifies JWT and attaches user to request:
```javascript
const jwt = require('jsonwebtoken');

module.exports = function authenticateToken(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token' });
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
};
```

**middleware/roleCheck.js** — Guards routes by role:
```javascript
module.exports = function requireRole(role) {
  return (req, res, next) => {
    if (req.user.role !== role) return res.status(403).json({ message: 'Forbidden' });
    next();
  };
};
```

### 4d. Auth Routes (Register + Login — Reuse Every Time)

**routes/auth.js:**
```javascript
const router = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Register
router.post('/register', async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    const user = new User({ username, email, password, role });
    await user.save();
    const token = jwt.sign({ id: user._id, username, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({ token, user: { id: user._id, username, role: user.role } });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || !(await user.comparePassword(password)))
      return res.status(401).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ id: user._id, username, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user._id, username, role: user.role } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
```

### 4e. Resource Routes Pattern

Each resource route follows this CRUD pattern:

```javascript
const router = require('express').Router();
const authenticateToken = require('../middleware/auth');
const requireRole = require('../middleware/roleCheck');
const YourModel = require('../models/YourModel');

// Public or auth-only
router.get('/', authenticateToken, async (req, res) => { ... });

// Admin-only
router.post('/', authenticateToken, requireRole('ADMIN'), async (req, res) => { ... });
router.put('/:id', authenticateToken, requireRole('ADMIN'), async (req, res) => { ... });
router.delete('/:id', authenticateToken, requireRole('ADMIN'), async (req, res) => { ... });

// User-only
router.get('/my', authenticateToken, requireRole('USER'), async (req, res) => { ... });

module.exports = router;
```

### 4f. Cron Job Pattern (If Needed)

Use `node-cron` for any scheduled background task:

```javascript
const cron = require('node-cron');
const YourModel = require('../models/YourModel');

function startJob() {
  cron.schedule('* * * * *', async () => {  // Runs every minute
    try {
      const now = new Date();
      const result = await YourModel.updateMany(
        { status: 'ACTIVE', expiresAt: { $lte: now } },
        { $set: { status: 'DONE', completedAt: now } }
      );
      if (result.modifiedCount > 0) console.log(`Processed ${result.modifiedCount} items`);
    } catch (err) {
      console.error('Cron job error:', err);
    }
  });
}

module.exports = { start: startJob };
```

---

## Step 5: Frontend Setup

### 5a. Initialize the Frontend

```bash
mkdir frontend && cd frontend
npm create vite@latest . -- --template react
npm install react-router-dom axios
```

### 5b. vercel.json (Required for SPA Routing on Vercel)

Always create this file in the frontend root:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/" }]
}
```

### 5c. AuthContext (Reuse Every Time)

**src/context/AuthContext.jsx:**
```jsx
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (token && userData) setUser(JSON.parse(userData));
    setLoading(false);
  }, []);

  const login = (token, userData) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
```

### 5d. Axios Instance (Reuse Every Time)

**src/api/axios.js:**
```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
```

### 5e. ProtectedRoute (Reuse Every Time)

**src/components/ProtectedRoute.jsx:**
```jsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ element, requiredRole }) {
  const { user, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  if (requiredRole && user.role !== requiredRole) return <Navigate to="/login" />;
  return element;
}
```

### 5f. App.jsx Route Structure

```jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/user-dashboard" element={<ProtectedRoute element={<UserDashboard />} requiredRole="USER" />} />
          <Route path="/admin-dashboard" element={<ProtectedRoute element={<AdminDashboard />} requiredRole="ADMIN" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
```

### 5g. Page Structure Pattern

Each page follows the same pattern:

```jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';

export default function YourPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      const res = await api.get('/your-resource');
      setData(res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch');
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleLogout = () => { logout(); navigate('/login'); };

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {/* Your UI here */}
    </div>
  );
}
```

---

## Step 6: Environment Variables

### Backend `.env`
```
MONGO_URI=mongodb+srv://user:password@cluster.mongodb.net/your-db-name
JWT_SECRET=generate-a-64-char-random-hex-string
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
```

### Frontend `.env`
```
VITE_API_URL=http://localhost:5000/api
```

**For production**, update these with:
- Backend: MongoDB Atlas URI, `NODE_ENV=production`, Vercel frontend URL as CORS_ORIGIN
- Frontend: Render backend URL as VITE_API_URL

---

## Step 7: Deployment

### 7a. MongoDB Atlas (Database)
1. Go to cloud.mongodb.com → Create free M0 cluster
2. Create a database user (username + password)
3. Set IP access: `0.0.0.0/0` (allow all)
4. Get the connection string → paste into backend `.env`

### 7b. GitHub (Version Control)
```bash
git init
git add .
git commit -m "Initial commit"
gh repo create your-repo-name --private
git push -u origin main
```

### 7c. Render (Backend Hosting)
Create `render.yaml` at the **project root**:

```yaml
services:
  - type: web
    name: your-app-backend
    runtime: node
    buildCommand: cd backend && npm install
    startCommand: cd backend && npm start
    envVars:
      - key: MONGO_URI
        value: your-atlas-uri
      - key: JWT_SECRET
        value: your-jwt-secret
      - key: NODE_ENV
        value: production
      - key: PORT
        value: "5000"
      - key: CORS_ORIGIN
        value: https://your-vercel-url.vercel.app
```

Then on Render: New → Web Service → Connect GitHub repo → Deploy.

### 7d. Vercel (Frontend Hosting)
```bash
cd frontend
npx vercel --prod --yes
```
Or: Import GitHub repo on Vercel dashboard, set root to `frontend`.

Set environment variable in Vercel dashboard:
```
VITE_API_URL = https://your-render-backend.onrender.com/api
```

---

## Step 8: Build Order (The Sequence to Follow)

Always build in this order:

```
1. Plan → Define entities, roles, business rules
2. DB Schema → Write Mongoose models
3. Backend → server.js → middleware → auth routes → resource routes → cron job
4. Test Backend → Use Postman/Thunder Client to verify all routes
5. Frontend → AuthContext → axios → ProtectedRoute → App.jsx routes → Pages
6. Test Frontend → Verify all flows end-to-end in browser
7. Database → Set up MongoDB Atlas
8. Deploy Backend → Render with env vars
9. Deploy Frontend → Vercel with VITE_API_URL pointing to Render
10. Verify live system → Test all critical paths on production URLs
```

---

## Customization Points (What You Change Per Project)

These are the parts that **change with each new project**. Everything else is reusable boilerplate.

| Part | What to Customize |
|---|---|
| **Models** | Fields, relationships, enum values specific to your domain |
| **Business Rules** | What triggers state changes, what's immutable, expiry logic |
| **Role Names** | USER/ADMIN or whatever roles fit your domain |
| **Route Resources** | /api/policies → /api/your-resources |
| **Cron Job Logic** | What it checks, what it updates, how often |
| **Dashboard Tabs** | What sections each role sees and can do |
| **DB Name** | Change in MONGO_URI and your Atlas cluster |
| **App Name** | Render service name, Vercel project name, GitHub repo name |

---

## Checklist Before Submission

- [ ] All routes protected with `authenticateToken`
- [ ] Admin routes protected with `requireRole('ADMIN')`
- [ ] Password hashed before storage (bcryptjs pre-save hook)
- [ ] JWT issued on login and register
- [ ] Frontend stores token in localStorage
- [ ] Axios sends `Authorization: Bearer <token>` on every request
- [ ] Cron job starts after DB connects (not before)
- [ ] Server-side time used in all date logic (never client-side)
- [ ] Archived/immutable records return 403 on edit attempts
- [ ] Environment variables set in Render and Vercel dashboards
- [ ] `vercel.json` in frontend root for SPA routing
- [ ] CORS_ORIGIN in backend matches actual Vercel URL

---

## Quick Reference: Reusable Files (Copy-Paste These)

| File | Reuse Level | Change Required |
|---|---|---|
| `backend/middleware/auth.js` | 100% reusable | None |
| `backend/middleware/roleCheck.js` | 100% reusable | None |
| `frontend/src/api/axios.js` | 100% reusable | None |
| `frontend/src/context/AuthContext.jsx` | 100% reusable | None |
| `frontend/src/components/ProtectedRoute.jsx` | 100% reusable | None |
| `backend/routes/auth.js` | 95% reusable | Adjust role enum if needed |
| `backend/server.js` | 80% reusable | Update route names and imports |
| `frontend/src/App.jsx` | 80% reusable | Update route paths and page imports |
| `render.yaml` | 80% reusable | Update service name and env values |
| `frontend/vercel.json` | 100% reusable | None |
| `backend/models/User.js` | 80% reusable | Add/remove fields as needed |
| `backend/jobs/archivalJob.js` | 70% reusable | Update model and field names |

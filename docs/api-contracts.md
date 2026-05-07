# SkillBridge API Contracts

Base URL: `http://localhost:5000/api`

## Authentication Endpoints

### POST /auth/register
Register a new user.

**Request:**
```js
{
  email: String,
  password: String,
  name: String
}
```

**Response (201):**
```js
{
  statusCode: 201,
  data: {
    _id: ObjectId,
    email: String,
    name: String,
    role: 'student',
    token: String (JWT in httpOnly cookie)
  },
  message: "User registered successfully"
}
```

---

### POST /auth/login
Login existing user.

**Request:**
```js
{
  email: String,
  password: String
}
```

**Response (200):**
```js
{
  statusCode: 200,
  data: {
    _id: ObjectId,
    email: String,
    name: String,
    role: String,
    token: String (JWT in httpOnly cookie)
  },
  message: "Logged in successfully"
}
```

---

### POST /auth/logout
Logout user (clears httpOnly cookie).

**Response (200):**
```js
{
  statusCode: 200,
  data: {},
  message: "Logged out successfully"
}
```

---

### GET /auth/me
Get current authenticated user.

**Headers:** `Authorization: Bearer <token>`

**Response (200):**
```js
{
  statusCode: 200,
  data: {
    _id: ObjectId,
    email: String,
    name: String,
    role: String,
    experience: String,
    currentSkills: [],
    certifications: [],
    oceanScore: {},
    createdAt: Date
  },
  message: "User fetched successfully"
}
```

---

## Profile Endpoints

### GET /profile
Get user's profile.

**Headers:** `Authorization: Bearer <token>`

**Response (200):**
```js
{
  statusCode: 200,
  data: {
    _id: ObjectId,
    email: String,
    name: String,
    experience: String,
    currentSkills: [],
    certifications: [],
    interests: [],
    oceanScore: {}
  },
  message: "Profile fetched successfully"
}
```

---

### PUT /profile
Update user profile.

**Headers:** `Authorization: Bearer <token>`

**Request:**
```js
{
  name: String (optional),
  experience: String (optional),
  currentSkills: [{ skillId, proficiencyLevel, yearsOfExperience }] (optional),
  certifications: [{ certId, certificationName }] (optional),
  interests: [skillId] (optional)
}
```

**Response (200):**
```js
{
  statusCode: 200,
  data: { /* updated user object */ },
  message: "Profile updated successfully"
}
```

---

### POST /profile/ocean-score
Save OCEAN personality assessment.

**Headers:** `Authorization: Bearer <token>`

**Request:**
```js
{
  openness: Number (0-100),
  conscientiousness: Number (0-100),
  extraversion: Number (0-100),
  agreeableness: Number (0-100),
  neuroticism: Number (0-100)
}
```

**Response (200):**
```js
{
  statusCode: 200,
  data: { oceanScore: { /* scores */ } },
  message: "OCEAN score saved successfully"
}
```

---

## Analyzer Endpoints

### POST /analyzer/analyze
Analyze user profile against all career paths.

**Headers:** `Authorization: Bearer <token>` (optional - guest users allowed)

**Request:**
```js
{
  userId: ObjectId (optional, for guests use body.skills directly),
  currentSkills: [ObjectId] (if guest),
  certifications: [ObjectId] (if guest),
  experience: String (if guest),
  oceanScore: { /* scores */ } (if guest)
}
```

**Response (200):**
```js
{
  statusCode: 200,
  data: {
    results: [
      {
        careerPathId: ObjectId,
        careerTitle: String,
        matchPercentage: Number,
        gapAnalysis: {
          missingSkills: [
            { skillId, skillName, priority, daysToLearn }
          ],
          matchedSkills: [{ skillId, skillName, weight }],
          gapSeverity: String (enum: ['critical', 'moderate', 'minor'])
        },
        oceanAlignment: Number (-20 to +20),
        finalScore: Number (0-100),
        advantages: [String],
        phase: String,
        avgSalary: String
      }
    ],
    totalResults: Number,
    showAllThreshold: Number (default 20)
  },
  message: "Analysis completed"
}
```

---

## Career Endpoints

### GET /careers
Get all career paths (paginated, filtered).

**Query Parameters:**
- `domain=String` (filter by domain)
- `minMatch=Number` (default: 20)
- `limit=Number` (default: 10)
- `skip=Number` (default: 0)

**Response (200):**
```js
{
  statusCode: 200,
  data: {
    careers: [
      {
        _id: ObjectId,
        title: String,
        domain: String,
        phases: [],
        advantages: [],
        averageSalaryRange: String,
        jobMarketDemand: String,
        growthTrendline: String
      }
    ],
    total: Number,
    pages: Number,
    currentPage: Number
  },
  message: "Careers fetched successfully"
}
```

---

### GET /careers/:careerPathId
Get single career path details.

**Response (200):**
```js
{
  statusCode: 200,
  data: {
    _id: ObjectId,
    title: String,
    domain: String,
    requiredSkills: [],
    phases: [],
    resources: [],
    advantages: [],
    challenges: [],
    oceanAlignment: {},
    averageSalaryRange: String,
    jobMarketDemand: String,
    growthTrendline: String
  },
  message: "Career details fetched"
}
```

---

### GET /careers/:careerPathId/gap-analysis
Get gap analysis for user vs specific career.

**Headers:** `Authorization: Bearer <token>`

**Response (200):**
```js
{
  statusCode: 200,
  data: {
    careerPathTitle: String,
    userMatchPercentage: Number,
    missingSkills: [
      {
        skillId: ObjectId,
        skillName: String,
        category: String,
        priority: String,
        proficiencyNeeded: String,
        estimatedDaysToLearn: Number,
        resources: []
      }
    ],
    matchedSkills: [
      {
        skillId: ObjectId,
        skillName: String,
        userProficiency: String,
        weight: Number
      }
    ],
    gapSeverity: String,
    recommendedPhase: String,
    milestoneSuggestions: []
  },
  message: "Gap analysis computed"
}
```

---

## Roadmap Endpoints

All roadmap endpoints require authentication via the JWT cookie.

### GET /roadmap
List the current user's saved career-path roadmaps (those they've saved via `POST /careers/:id/save`), with match score and progress for each.

**Response (200):**
```js
{
  statusCode: 200,
  data: [
    {
      career: { _id, title, domain, difficulty, demand, estimatedTimeToBridge },
      matchScore: Number,
      gapCount: Number,
      progress: {
        percentComplete: Number,
        completedSkillCount: Number,
        totalRequiredSkillCount: Number
      },
      savedAt: Date,
      updatedAt: Date
    }
  ],
  message: "Roadmaps retrieved"
}
```

---

### GET /roadmap/:careerPathId
Full career-brief payload: career details, gap-analysis, annotated phase-by-phase roadmap, and the user's progress on it.

**Response (200):**
```js
{
  statusCode: 200,
  data: {
    career: { _id, title, domain, description, difficulty, demand, estimatedTimeToBridge, advantages, resources, certifications },
    analysis: { matchScore, weightedScore, oceanBonus, gapCount, /* ... */ },
    roadmap: [
      {
        phase: 1 | 2 | 3,
        title: String,
        milestoneMonths: String,
        skills: [
          {
            name: String,        // skill text from the career path's phases[].skills
            status: 'have' | 'missing',  // does the user already possess this skill?
            completed: Boolean             // has the user checked it off on the roadmap?
          }
        ]
      }
    ],
    progress: {
      isSaved: Boolean,
      percentComplete: Number,           // (completed roadmap items) / (total roadmap items) × 100
      completedSkillCount: Number,
      totalRequiredSkillCount: Number    // total roadmap items across all phases
    }
  },
  message: "Career brief retrieved"
}
```

---

### PATCH /roadmap/:careerPathId/roadmap-items
Toggle a single roadmap item on or off for the current user. Server treats absence/presence as a toggle — no `completed` flag in the request.

**Request:**
```js
{
  phase: 1 | 2 | 3,    // which phase the item belongs to
  skillName: String    // the skill text exactly as it appears in career.phases[phase-1].skills
}
```

**Response (200):**
```js
{
  statusCode: 200,
  data: {
    completedRoadmapItems: [ { phase: Number, skillName: String } ],
    percentComplete: Number,
    completedSkillCount: Number,        // = completedRoadmapItems.length
    totalRequiredSkillCount: Number     // total roadmap items across all phases
  },
  message: "Roadmap item toggled"
}
```

**Errors:**
- `400` — `phase` not 1/2/3, `skillName` empty, or `(phase, skillName)` not present on this career
- `404` — career path not found

---

### PATCH /roadmap/:careerPathId/skills/:skillId
**(Legacy)** Toggle a `Skill` ObjectId in `UserProgress.completedSkills`. Kept for backwards compatibility; the per-skill checklist UI uses `roadmap-items` instead. Validates `:skillId` is in `career.requiredSkills`.

**Response (200):**
```js
{
  statusCode: 200,
  data: { /* full UserProgress doc */ },
  message: "Skill progress updated"
}
```

---

## Skills Endpoint

### GET /skills
Get all available skills.

**Query Parameters:**
- `category=String` (filter: 'technical-skill', 'soft-skill', 'knowledge', 'certification')
- `tags=String` (comma-separated)
- `search=String` (search by name)

**Response (200):**
```js
{
  statusCode: 200,
  data: {
    skills: [
      {
        _id: ObjectId,
        name: String,
        category: String,
        description: String,
        tags: [String],
        difficultyLevel: String,
        resources: []
      }
    ],
    total: Number
  },
  message: "Skills fetched successfully"
}
```

---

## Error Responses

All errors follow this format:

```js
{
  statusCode: Number (4xx or 5xx),
  data: {},
  message: String (error description)
}
```

**Common Status Codes:**
- `400` — Bad Request (validation error)
- `401` — Unauthorized (missing/invalid token)
- `403` — Forbidden (insufficient permissions)
- `404` — Not Found
- `500` — Internal Server Error

---

## Authentication Notes

- JWT tokens are issued as **httpOnly cookies** (secure, not accessible via JS)
- Token expiry: 7 days
- Refresh token flow not implemented in v1
- Guest users can access `/analyzer/analyze` and `/careers` endpoints
- Protected endpoints require `Authorization: Bearer <token>` header


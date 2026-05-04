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

### POST /roadmap
Create a learning roadmap for a career path.

**Headers:** `Authorization: Bearer <token>`

**Request:**
```js
{
  careerPathId: ObjectId,
  targetCompletionMonths: Number (optional, default: 12)
}
```

**Response (201):**
```js
{
  statusCode: 201,
  data: {
    _id: ObjectId,
    userId: ObjectId,
    careerPathId: ObjectId,
    currentPhase: String,
    percentComplete: Number,
    milestones: [
      {
        month: Number,
        skillsToLearn: [ObjectId],
        learningResources: [{ title, url, type }],
        estimatedHoursPerWeek: Number
      }
    ],
    startDate: Date,
    targetCompletionDate: Date
  },
  message: "Roadmap created successfully"
}
```

---

### GET /roadmap/:roadmapId
Get user's roadmap for a career path.

**Headers:** `Authorization: Bearer <token>`

**Response (200):**
```js
{
  statusCode: 200,
  data: { /* roadmap object */ },
  message: "Roadmap fetched successfully"
}
```

---

### PUT /roadmap/:roadmapId/progress
Update progress on a roadmap.

**Headers:** `Authorization: Bearer <token>`

**Request:**
```js
{
  completedSkills: [ObjectId],
  personalNotes: String (optional),
  currentPhase: String (optional)
}
```

**Response (200):**
```js
{
  statusCode: 200,
  data: {
    percentComplete: Number,
    completedSkills: [ObjectId],
    remainingSkills: [ObjectId],
    estimatedCompletionDate: Date
  },
  message: "Progress updated"
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


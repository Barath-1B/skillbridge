# SkillBridge Data Models

> **Note:** this file predates several schema changes and drifts from the code
> in places (e.g. `certifications` is `[String]`, `oceanScore` keys are
> `O/C/E/A/N`, `role` is `user|admin`). For the code-accurate reference see
> [PROJECT-REPORT.md](PROJECT-REPORT.md) §6 and the schemas in
> `server/src/models/`.

## User Schema

```js
{
  _id: ObjectId,
  email: String (unique, required),
  password: String (bcrypted, required),
  name: String (required),

  // Auth — rotating refresh-token records (sha256 hashes only, max 5,
  // select: false so they never leave the DB by default)
  refreshTokens: [{ tokenHash: String, expiresAt: Date }],
  
  // Profile
  role: String (enum: ['student', 'professional', 'admin'], default: 'student'),
  experience: String (enum: ['student', '0-1yr', '1-3yr', '3+yr']),
  interests: [ObjectId] (refs: Skill),
  
  // Skills & Knowledge
  currentSkills: [
    {
      skillId: ObjectId (ref: Skill),
      proficiencyLevel: String (enum: ['beginner', 'intermediate', 'advanced']),
      yearsOfExperience: Number,
      lastUpdated: Date
    }
  ],
  certifications: [
    {
      certId: ObjectId (ref: Skill),
      certificationName: String,
      issueDate: Date,
      expiryDate: Date
    }
  ],
  
  // Personality (OCEAN Model - Big Five)
  oceanScore: {
    openness: Number (0-100),
    conscientiousness: Number (0-100),
    extraversion: Number (0-100),
    agreeableness: Number (0-100),
    neuroticism: Number (0-100),
    assessedAt: Date
  },
  
  // Metadata
  createdAt: Date,
  updatedAt: Date,
  lastLoginAt: Date,
  isActive: Boolean (default: true)
}
```

---

## Skill Schema

```js
{
  _id: ObjectId,
  name: String (required, unique),
  category: String (enum: [
    'technical-skill',
    'soft-skill',
    'knowledge',
    'certification'
  ]),
  description: String,
  tags: [String] (e.g., ['backend', 'database', 'linux']),
  parentSkill: ObjectId (ref: Skill, optional for skill hierarchies),
  difficultyLevel: String (enum: ['beginner', 'intermediate', 'advanced']),
  
  // Resource links (learning paths)
  resources: [
    {
      title: String,
      url: String,
      type: String (enum: ['course', 'tutorial', 'book', 'documentation']),
      platform: String (e.g., 'Coursera', 'Udemy')
    }
  ],
  
  createdAt: Date,
  updatedAt: Date
}
```

---

## CareerPath Schema

```js
{
  _id: ObjectId,
  title: String (required, e.g., 'Machine Learning Engineer'),
  domain: String (e.g., 'AI/ML', 'DevOps', 'Frontend'),
  
  // Required qualifications
  requiredSkills: [
    {
      skillId: ObjectId (ref: Skill),
      weight: Number (0-1, importance),
      priority: String (enum: ['must-have', 'nice-to-have']),
      minProficiency: String (enum: ['beginner', 'intermediate', 'advanced'])
    }
  ],
  
  preferredCertifications: [ObjectId] (refs: Skill),
  minYearsExperience: Number,
  
  // Career progression
  phases: [
    {
      phaseName: String (e.g., 'Junior', 'Senior'),
      yearsInRole: Number,
      responsibilities: [String],
      skillsToLearn: [ObjectId] (refs: Skill),
      avgSalary: String
    }
  ],
  
  // Personality alignment (OCEAN model)
  oceanAlignment: {
    openness: Number (-20 to +20, modifier),
    conscientiousness: Number,
    extraversion: Number,
    agreeableness: Number,
    neuroticism: Number
  },
  
  // Additional resources
  resources: [
    {
      title: String,
      url: String,
      type: String
    }
  ],
  
  advantages: [String] (e.g., 'High salary growth', 'Remote opportunities'),
  challenges: [String],
  averageSalaryRange: String (e.g., '$80k - $150k'),
  jobMarketDemand: String (enum: ['high', 'medium', 'low']),
  growthTrendline: String (enum: ['growing', 'stable', 'declining']),
  
  createdAt: Date,
  updatedAt: Date,
  isActive: Boolean (default: true)
}
```

---

## UserProgress Schema

```js
{
  _id: ObjectId,
  userId: ObjectId (ref: User, required),
  careerPathId: ObjectId (ref: CareerPath, required),

  // Legacy: ObjectIds of mastered Skill documents.
  // Still written by the older PATCH /roadmap/:careerPathId/skills/:skillId endpoint.
  completedSkills: [ObjectId (ref: Skill)],

  // Current: per-roadmap-item check state, keyed on (phase, skillName).
  // Drives the toggleable checklist on the career-brief page.
  completedRoadmapItems: [
    {
      phase: Number (1 | 2 | 3, required),
      skillName: String (required, trimmed)
    }
  ],

  // Recomputed on every toggle:
  //   completedRoadmapItems.length / sum(career.phases[].skills.length) * 100
  percentComplete: Number (0-100),

  createdAt: Date,
  updatedAt: Date
}
```

**Indexes:** unique compound on `(userId, careerPathId)` — one progress doc per user per career.

---

## Relationships Summary

```
User
├── currentSkills → Skill (many)
├── certifications → Skill (many)
├── interests → Skill (many)
└── userProgresses → UserProgress (many)

UserProgress
├── userId → User (one)
├── careerPathId → CareerPath (one)
└── completedSkills → Skill (many)

CareerPath
├── requiredSkills → Skill (many)
├── preferredCertifications → Skill (many)
└── phases (embedded array)

Skill
├── parentSkill → Skill (optional, self-referential)
└── resources (embedded array)
```

---

## Indexing Strategy

```js
// User collection
db.users.createIndex({ email: 1 }, { unique: true })
db.users.createIndex({ createdAt: -1 })
db.users.createIndex({ role: 1 })

// Skill collection
db.skills.createIndex({ name: 1 }, { unique: true })
db.skills.createIndex({ category: 1 })
db.skills.createIndex({ tags: 1 })

// CareerPath collection
db.careerPaths.createIndex({ title: 1 }, { unique: true })
db.careerPaths.createIndex({ domain: 1 })
db.careerPaths.createIndex({ isActive: 1 })

// UserProgress collection
db.userProgress.createIndex({ userId: 1, careerPathId: 1 }, { unique: true })
db.userProgress.createIndex({ userId: 1 })
db.userProgress.createIndex({ careerPathId: 1 })
```

---

## Notes

- **OCEAN Score**: Calculated silently during onboarding from 12 situational questions
- **Match Score Formula**: 
  - Raw = (matched skills / required skills) × 100
  - Weighted = Σ(matched skill weights) / Σ(all weights) × 100
  - Final = Weighted + OCEAN modifier
- **Proficiency Levels**: beginner (0-2 yrs), intermediate (2-5 yrs), advanced (5+ yrs)
- **Salary Ranges**: Text fields for flexibility (e.g., "$80k - $150k" or "competitive")


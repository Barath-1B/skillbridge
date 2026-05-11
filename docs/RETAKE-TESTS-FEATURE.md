# Retake Tests Feature

## Overview
The Retake Tests feature allows users to update their profile by retaking any onboarding tests without losing their career analysis history.

## Features

### 1. **Retake OCEAN Personality Test** 🧠
- Users can retake the 12-question Big Five personality assessment
- Questions are presented one at a time for better focus
- Progress bar shows completion status
- Results immediately update the user's OCEAN score
- Used to refine career path matching

### 2. **Retake Skills & Experience Test** 💼
- Re-select technical skills, knowledge areas, certifications, and soft skills
- Skills organized by category for easy navigation
- Track how many skills are selected
- Updates user's current skills in real-time
- Affects career path recommendations

### 3. **Test History & Timeline** 📋
- View when each test was last taken
- See profile creation date
- Option to reset all onboarding data and start fresh
- Useful for tracking profile updates

## API Endpoints

### POST `/api/retake-tests/ocean`
Retake the OCEAN personality test
```json
{
  "answers": [
    { "questionId": 1, "answer": "A" },
    { "questionId": 2, "answer": "B" },
    ...
  ]
}
```

### POST `/api/retake-tests/skills`
Retake the skills selection test
```json
{
  "skillIds": ["skill_id_1", "skill_id_2", ...]
}
```

### GET `/api/retake-tests/history`
Get test history/timestamps
```json
{
  "profileCreatedAt": "2024-05-05T10:30:00Z",
  "lastOceanTestDate": "2024-05-05T12:00:00Z",
  "lastSkillsTestDate": "2024-05-05T11:45:00Z"
}
```

### POST `/api/retake-tests/reset`
Reset all onboarding data (requires confirmation)
- Clears experience, skills, certifications, interests
- Resets OCEAN score
- User must retake all tests

## Database Changes

### User Model Updates
Added two new fields to track test history:
- `lastOceanTestDate`: Date when OCEAN test was last taken
- `lastSkillsTestDate`: Date when skills test was last taken

## Frontend Components

### Pages
- **RetakeTestsPage** — Main container with tabbed interface

### Components
- **RetakeOceanTest** — Single-question OCEAN quiz interface
- **RetakeSkillsTest** — Multi-select skills picker with categories
- **TestHistory** — Timeline view and reset functionality

### Styling
- **retake-tests.css** — Responsive design with mobile support
- Features smooth animations and transitions
- Color-coded UI elements for visual hierarchy

## User Flow

1. User navigates to `/retake-tests` from dashboard
2. Selects which test to retake (tabs: Personality, Skills, History)
3. **For Personality Test:**
   - Questions presented one at a time
   - Previous/Next navigation
   - Submit button on last question
   - Results update immediately
4. **For Skills Test:**
   - Browse skills by category
   - Toggle skills with checkboxes
   - Clear all or submit selection
5. **For History:**
   - View test dates
   - Optionally reset all data

## Integration Points

### Connected to Existing Features
- Uses same OCEAN questions from onboarding
- Uses same skill database
- Updates profile used by analyzer for career matching
- Test results refresh career recommendations

### Where to Access
- Dashboard profile settings (add link: "Retake Tests")
- Direct URL: `/retake-tests` (protected route)

## Technical Details

### Backend
- Modular design: `/server/src/modules/retake-tests/`
- Controllers, Services, Routes, Validators pattern
- Reuses OCEAN computation logic from profile module
- Input validation on all endpoints

### Frontend
- Service layer: `/client/src/services/retake-tests.service.js`
- Separation of concerns: components, services, styling
- Uses existing axios API client
- Protected route integration

## Future Enhancements
- Email notification on profile updates
- Test score comparison (before/after)
- Repeat test recommendations based on time elapsed
- Analytics on how often users retake tests

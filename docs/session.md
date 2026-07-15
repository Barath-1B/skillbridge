# Session Log

A running, dated log of work sessions on SkillBridge. Newest entry on top.
Each entry: what was audited/changed, why, and how it was verified.

---

## 2026-07-15 — Completion pass (hardening, tests, CI, admin skill picker)

### Why
"Complete it": finish everything the upgrade roadmap left open — Phase 3
(production hardening), Phase 4 (CI/CD + testing) — plus the known gaps from
earlier session notes (orphaned InterestsEditor, admin careers without
requiredSkills) and doc drift.

### Changes
- **In-flight work landed:** wired `InterestsEditor` into the Profile page
  (was built but rendered nowhere) and committed the shared `RetakeQuiz`
  refactor.
- **Refresh tokens:** 1h access token + 30d rotating refresh JWT in an
  httpOnly cookie scoped to `/api/auth`. Only sha256 hashes are stored
  (`user.refreshTokens`, capped at 5, `select: false`); `POST /auth/refresh`
  rotates and rejects replays; logout/account-delete revoke. A `jti` claim
  keeps same-second tokens unique. Client: single-flight axios 401
  interceptor retries the original request once after refreshing.
- **Rate limiting:** extracted to `middleware/rate-limit.middleware.js`;
  added per-user limiter (200/15min by userId) after `authenticate` on
  analyzer + retake-tests, and a refresh limiter (30/15min).
- **Logging/bootstrap:** pino (`utils/logger.js`, JSON in prod, pretty in
  dev); split `app.js` (Express app) from `index.js` (bootstrap);
  unhandledRejection/uncaughtException fatal-log handlers.
- **Sentry (env-gated):** `@sentry/node` + `@sentry/react`, strict no-ops
  without `SENTRY_DSN`/`VITE_SENTRY_DSN`; client loads via dynamic import.
- **Tests:** `npm test` = `node --test` over `server/tests/`. Gap-engine
  invariants (ported from the deleted selfcheck), personality-scoring units,
  and an auth API integration test (supertest + mongodb-memory-server)
  covering register→login→me→refresh(rotation/replay)→logout.
- **CI:** `.github/workflows/ci.yml` — server tests + client lint/build.
- **Pre-commit:** committed `.githooks/pre-commit` (client lint / server
  tests when staged); activate with `git config core.hooksPath .githooks`.
- **Admin:** `CareerForm` gained a required-skills editor (skill select
  grouped by category, weight 1-10, priority) — admin-created careers can
  finally rank in the analyzer.
- **Docs:** PROJECT-REPORT/architecture/api-contracts/data-models corrected
  (Redux→Context, ports, limits, refresh flow); CLAUDE.md rewritten where
  behavior changed.

### Verification
- `npm test` (server) → 31/31 pass, including the full auth flow against
  in-memory Mongo (rotation + replay rejection observed).
- `npm run lint` (client) → 0 errors (3 pre-existing warnings);
  `npm run build` → clean.
- Prod-mode boot emits JSON logs; dev emits pretty logs; app loads with and
  without a Sentry DSN; entry chunk contains no sentry code when unset.
- Pre-commit hook observed running eslint on a real commit.

### Not done / notes
- Ship server+client together: 1h tokens without the client interceptor log
  users out hourly.
- Render free-tier keep-alive remains external (UptimeRobot or paid tier).
- `docs/Full project idea.md` / `progress.md` left as historical records.

---

## 2026-06-04 — Pass 2 (certifications UI, admin members view, icons, polish)

### Why
User reviewed the running app and named concrete gaps: certifications had no
add/remove UI; emojis should be icons; footer had a "T.I.M.E. PCP-V program"
credit; admin panel was a "show-off" that should show all members and their
progress. Also asked whether the OCEAN test works.

### OCEAN test — verified working (no change)
Live API returns 12 questions; `computeAndSaveOcean` maps each answer→trait,
averages per trait, saves `oceanScore`, which feeds the gap-engine modifier.
Confirmed via `GET /api/profile/ocean/questions` and code trace. Scoring is
simple but correct.

### Changes
- **Footer:** removed "Built for the T.I.M.E. PCP-V program" ([Footer.jsx](../client/src/components/layout/Footer.jsx)); kept `© {year} SkillBridge.`
- **Emojis → lucide icons:** replaced every emoji (🧠💼📋📅✅✓ + `←`/`→`) in
  RetakeTestsPage, TestHistory, RetakeOceanTest, RetakeSkillsTest, ThemeToggle.
  Refactored the `message.includes('✅')` success/error detection into an explicit
  `messageType` state with a status icon. CSS updated for SVG alignment.
- **Certifications:** new [CertificationsManager](../client/src/components/profile/CertificationsManager.jsx)
  inline editor on the Profile page — add via input, remove via chip, dedup +
  validation, persists through existing `PUT /profile`, syncs AuthContext, toasts.
  Removed the dead `addCertification` client method (pointed at a non-existent
  endpoint).
- **Admin members view:** enriched `listUsers` ([admin/service.js](../server/src/modules/admin/service.js)) with a
  one-query `UserProgress` aggregation → per-member `progress` summary
  (savedCareers, avgProgress, profileComplete, oceanCompleted, skills/cert counts).
  Rewrote [AdminUsers.jsx](../client/src/pages/admin/AdminUsers.jsx) as a "Members" view: summary stat cards +
  table columns (Experience, Profile, OCEAN date, #skills, #certs, #saved,
  roadmap progress bar) plus existing role-change/delete.
- **Polish:** profile-completeness indicator on the Profile page (4-factor
  checklist + bar). Fixed a pre-existing latent crash — `ProfilePage` used
  `<Skeleton>` without importing it. Converted retake-test effects to the
  async-IIFE pattern (clears use-before-declare / unused-var lint errors).

### Verification
- `npm run build` (client) → clean, 2457 modules, no errors.
- `eslint` on all 9 authored files → 0 errors (1 stylistic `toast` dep warning).
- Admin login via curl → `GET /admin/users` returns the `progress` summary per
  member (confirmed keys + values).
- Emoji grep across `client/src` → none remain.

### Not done (deferred, "production hardening" tier not selected)
OCEAN 30-Q expansion, refresh tokens, error tracking, automated tests;
notifications/email; per-member admin drill-in.

---

## 2026-06-04 — Audit + completion pass (soft skills, taxonomy, admin CRUD, cleanup)

### Why
Parts of the app felt incomplete ("soft skills — and etc"). Ran a full audit
(3 Explore agents + direct file verification) to find every stubbed/mismatched/
dead feature, then patched the confirmed gaps. Notifications were intentionally
left as preference-only (out of scope this pass).

### Audit findings (confirmed against source)
- **Skill-category taxonomy mismatch**: frontend used `skill`/`softSkill`; the
  backend enum is `technical-skill`/`knowledge`/`certification`/`soft-skill`. The
  Retake-Skills tabs filtered to nothing as a result.
- **Soft skills barely seeded**: only 1 `soft-skill` in ~104 skills; careers had
  no soft-skill requirements, so gap analysis never surfaced them.
- **Admin CRUD UI dead**: Add/Edit/Delete buttons had no handlers; `CareerForm`/
  `SkillForm` existed but were never imported; `AdminUsers` was read-only.
- **Backend gap**: admin had no user role-update/delete endpoints at all (client
  `adminService` referenced routes that didn't exist).
- **Dead code**: orphaned `Onboarding.jsx`, unused Redux store/slices, empty
  `features/*` dirs.

### Changes
- **Taxonomy fix**: added `client/src/constants/skillCategories.js` (canonical
  list + label map). Updated `RetakeSkillsTest.jsx`, `SkillForm.jsx`,
  `ProfileSetup.jsx`, `ProfilePage.jsx` to use real enum values + friendly labels.
- **Soft skills**: added 12 soft-skill entries to `skills-az.seed.js`
  (Communication, Teamwork & Collaboration, Leadership, Problem Solving,
  Adaptability, Time Management, Critical Thinking, Emotional Intelligence,
  Conflict Resolution, Creativity, Work Ethic, Attention to Detail). Added a
  tailored, weighted soft-skill requirement set to **all 30 careers** in
  `careers.seed.js` via a baseline + per-title map (modest weights so technical
  skills still dominate the score).
- **Admin CRUD**: rewrote `SkillForm`/`CareerForm` with the Tailwind `common/`
  kit + `Modal`, correct schema fields (`difficultyLevel`, lowercase enums,
  3-phase editor). Wired `AdminSkills`/`AdminCareers`/`AdminUsers` to
  `adminService` with create/edit/delete, confirm-before-delete, toasts, and
  high-limit list fetches. Added backend `updateUserRole` + `deleteUser`
  (service/controller/routes) with self-delete guard.
- **Cleanup**: removed `Onboarding.jsx`, `store/` (Redux), empty `features/*`
  dirs, and the `@reduxjs/toolkit`/`react-redux` deps + `<Provider>` in `App.jsx`.

### Verification
- `npm run seed` → 117 skills, 30 careers, **no "skill not found" warnings**.
- MongoDB check: 13 `soft-skill` docs; Cybersecurity Analyst now carries 13
  weighted requirements (technical + soft).
- `npm run build` (client) → clean, 2455 modules, no errors (confirms Redux
  removal didn't break imports).
- `eslint` on authored files → 0 errors (only pre-existing-style `toast`
  exhaustive-deps warnings; the repo's lint baseline was already not clean).
- Backend `require()` smoke check of admin routes + seeds → loads OK.

### Not done / deferred
- Notifications/email delivery (left as preference-only by request).
- Doc drift in `architecture.md`/`data-models.md`/`api-contracts.md` (still cite
  old counts/ports) — low priority.
- Admin-created careers start with no `requiredSkills` (the create form covers
  metadata + phases, not the skill-weight picker).

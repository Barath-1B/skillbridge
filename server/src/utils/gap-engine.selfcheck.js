// Runnable self-check for the gap engine. No test framework — `node gap-engine.selfcheck.js`.
// Exits 0 on success, throws (non-zero) on the first broken invariant.
const assert = require('assert');
const { analyzeCareerPath, ELIGIBILITY_THRESHOLD } = require('./gap-engine');

const skill = (id, name, weight, priority, relatedSkills = []) =>
  ({ id, name, category: 'technical-skill', weight, priority, relatedSkills });

const baseCareer = {
  domain: 'Web Development',
  title: 'Frontend Engineer',
  difficulty: 'intermediate',
  demand: 'high',
  requiredCerts: [],
  requiredSkills: [
    skill('s1', 'React', 8, 'high', [{ name: 'Vue', similarity: 0.7 }]),
    skill('s2', 'CSS', 5, 'medium'),
    skill('s3', 'Testing', 3, 'low'),
  ],
};

const profile = (over = {}) => ({
  skillIdSet: new Set(over.skillIds || []),
  skillNameSet: new Set((over.skillNames || []).map(n => n.toLowerCase())),
  certifications: over.certifications || [],
  ocean: over.ocean || {},
  experience: over.experience,
  interests: over.interests || [],
});

// 1. Exact match → full weight credit.
let r = analyzeCareerPath(profile({ skillIds: ['s1', 's2', 's3'] }), baseCareer);
assert.strictEqual(r.weightedScore, 100, 'all skills held → 100');
assert.strictEqual(r.gapCount, 0, 'no gaps when all held');

// 2. Adjacency partial credit: holds Vue (0.7 sim to React weight 8), plus CSS.
r = analyzeCareerPath(profile({ skillIds: ['s2'], skillNames: ['Vue'] }), baseCareer);
// credited = 0.7*8 (React via Vue) + 5 (CSS) = 10.6 ; total = 16 → round(66.25) = 66
assert.strictEqual(r.weightedScore, 66, `adjacency partial credit, got ${r.weightedScore}`);
assert.strictEqual(r.partialSkills.length, 1, 'React counted as partial');
assert.strictEqual(r.partialSkills[0].via, 'Vue', 'credit attributed to Vue');
assert.ok(r.explanation.some(e => e.includes('Vue')), 'explanation names the adjacency source');

// 3. Missing skills bucket by priority.
r = analyzeCareerPath(profile({ skillIds: [] }), baseCareer);
assert.deepStrictEqual(r.gapsBySeverity.critical, ['React'], 'high priority → critical');
assert.deepStrictEqual(r.gapsBySeverity.important, ['CSS'], 'medium priority → important');
assert.deepStrictEqual(r.gapsBySeverity.niceToHave, ['Testing'], 'low priority → niceToHave');

// 4. Certification bonus is proportional (matched / required * 5).
const certCareer = { ...baseCareer, requiredCerts: ['AWS SA', 'CKA'] };
r = analyzeCareerPath(profile({ skillIds: ['s1', 's2', 's3'], certifications: ['aws sa'] }), certCareer);
assert.strictEqual(r.breakdown.certBonus, 3, `1/2 certs → +3, got ${r.breakdown.certBonus}`);

// 5. Eligibility keys off skill fit, NOT personality.
// Zero skills but a perfect OCEAN match must stay ineligible.
const perfectOcean = { O: 70, C: 70, E: 65, A: 60, N: 35 }; // == Web Development ideal
r = analyzeCareerPath(profile({ skillIds: [], ocean: perfectOcean }), baseCareer);
assert.ok(r.breakdown.oceanBonus > 0, 'perfect ocean gives a positive bonus');
assert.strictEqual(r.weightedScore, 0, 'no skills → 0 fit');
assert.strictEqual(r.isEligible, false, 'personality alone must not confer eligibility');
assert.ok(r.matchScore <= 10, 'matchScore is just the small ocean bonus');

// 6. Experience stretch penalty applies (student → advanced career).
r = analyzeCareerPath(
  profile({ skillIds: ['s1', 's2', 's3'], experience: 'student' }),
  { ...baseCareer, difficulty: 'advanced' }
);
assert.strictEqual(r.breakdown.experienceFit, -3, 'student vs advanced → -3 stretch');

// 7. Interest boost when interests intersect domain/title.
r = analyzeCareerPath(
  profile({ skillIds: ['s1'], interests: ['Web Development'] }),
  baseCareer
);
assert.ok(r.breakdown.interestBoost > 0, 'matching interest boosts score');

// 8. matchScore is clamped to [0, 100].
r = analyzeCareerPath(profile({ skillIds: ['s1', 's2', 's3'], ocean: perfectOcean, interests: ['Web Development'], certifications: [] }), baseCareer);
assert.ok(r.matchScore <= 100 && r.matchScore >= 0, 'matchScore clamped');

// 9. Confidence degrades with missing signals.
const thin = analyzeCareerPath(profile({ skillIds: ['s1'] }), baseCareer);
assert.ok(['low', 'medium'].includes(thin.confidence), 'sparse profile → not high confidence');
assert.ok(thin.confidenceReasons.length > 0, 'reasons listed when confidence is reduced');

console.log(`gap-engine self-check passed (threshold=${ELIGIBILITY_THRESHOLD}).`);

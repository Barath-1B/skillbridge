const { test } = require('node:test');
const assert = require('node:assert');
const {
  analyzeCareerPath,
  computeOceanModifier,
  ELIGIBILITY_THRESHOLD,
  DIFFICULTY_HOURS,
} = require('../src/utils/gap-engine');

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

// == Web Development ideal profile
const perfectOcean = { O: 70, C: 70, E: 65, A: 60, N: 35 };

test('exact match earns full weight credit and zero gaps', () => {
  const r = analyzeCareerPath(profile({ skillIds: ['s1', 's2', 's3'] }), baseCareer);
  assert.strictEqual(r.weightedScore, 100);
  assert.strictEqual(r.gapCount, 0);
});

test('adjacent skill earns similarity-scaled partial credit', () => {
  // credited = 0.7*8 (React via Vue) + 5 (CSS) = 10.6 ; total = 16 → round(66.25) = 66
  const r = analyzeCareerPath(profile({ skillIds: ['s2'], skillNames: ['Vue'] }), baseCareer);
  assert.strictEqual(r.weightedScore, 66);
  assert.strictEqual(r.partialSkills.length, 1);
  assert.strictEqual(r.partialSkills[0].via, 'Vue');
  assert.ok(r.explanation.some(e => e.includes('Vue')), 'explanation names the adjacency source');
});

test('missing skills bucket by priority severity', () => {
  const r = analyzeCareerPath(profile({ skillIds: [] }), baseCareer);
  assert.deepStrictEqual(r.gapsBySeverity.critical, ['React']);
  assert.deepStrictEqual(r.gapsBySeverity.important, ['CSS']);
  assert.deepStrictEqual(r.gapsBySeverity.niceToHave, ['Testing']);
});

test('certification bonus is proportional to matched certs', () => {
  const certCareer = { ...baseCareer, requiredCerts: ['AWS SA', 'CKA'] };
  const r = analyzeCareerPath(
    profile({ skillIds: ['s1', 's2', 's3'], certifications: ['aws sa'] }),
    certCareer
  );
  assert.strictEqual(r.breakdown.certBonus, 3, '1/2 certs → +3');
});

test('eligibility keys off skill fit, not personality', () => {
  const r = analyzeCareerPath(profile({ skillIds: [], ocean: perfectOcean }), baseCareer);
  assert.ok(r.breakdown.oceanBonus > 0, 'perfect ocean gives a positive bonus');
  assert.strictEqual(r.weightedScore, 0);
  assert.strictEqual(r.isEligible, false, 'personality alone must not confer eligibility');
  assert.ok(r.matchScore <= 10, 'matchScore is just the small ocean bonus');
});

test('experience stretch penalty applies (student vs advanced)', () => {
  const r = analyzeCareerPath(
    profile({ skillIds: ['s1', 's2', 's3'], experience: 'student' }),
    { ...baseCareer, difficulty: 'advanced' }
  );
  assert.strictEqual(r.breakdown.experienceFit, -3);
});

test('matching interest boosts score', () => {
  const r = analyzeCareerPath(
    profile({ skillIds: ['s1'], interests: ['Web Development'] }),
    baseCareer
  );
  assert.ok(r.breakdown.interestBoost > 0);
});

test('matchScore is clamped to [0, 100]', () => {
  const r = analyzeCareerPath(
    profile({ skillIds: ['s1', 's2', 's3'], ocean: perfectOcean, interests: ['Web Development'] }),
    baseCareer
  );
  assert.ok(r.matchScore >= 0 && r.matchScore <= 100);
});

test('confidence degrades with missing signals', () => {
  const thin = analyzeCareerPath(profile({ skillIds: ['s1'] }), baseCareer);
  assert.ok(['low', 'medium'].includes(thin.confidence), 'sparse profile → not high confidence');
  assert.ok(thin.confidenceReasons.length > 0, 'reasons listed when confidence is reduced');
});

test('computeOceanModifier: perfect domain match → +10', () => {
  assert.strictEqual(computeOceanModifier(perfectOcean, 'Web Development'), 10);
});

test('computeOceanModifier: unknown domain → 0', () => {
  assert.strictEqual(computeOceanModifier(perfectOcean, 'Underwater Basket Weaving'), 0);
});

test('computeOceanModifier: extreme deviation clamps at -5', () => {
  // Note: trait values must be truthy — the engine reads 0 as "missing" (→ 50).
  const opposite = { O: 100, C: 1, E: 1, A: 1, N: 100 };
  assert.strictEqual(computeOceanModifier(opposite, 'Web Development'), -5);
});

test('exported constants hold their contract values', () => {
  assert.strictEqual(ELIGIBILITY_THRESHOLD, 20);
  assert.ok(DIFFICULTY_HOURS && typeof DIFFICULTY_HOURS === 'object');
});

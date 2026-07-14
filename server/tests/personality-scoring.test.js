const { test } = require('node:test');
const assert = require('node:assert');
const { computeOceanScores, computeMbtiResult } = require('../src/utils/personality-scoring');
const ApiError = require('../src/utils/ApiError');
const oceanQuestions = require('../src/constants/ocean-questions');
const mbtiQuestions = require('../src/constants/mbti-questions');

// —— synthetic banks for precise arithmetic ——

const syntheticOceanBank = [
  { id: 1, options: [{ value: 'A', trait: 'O', score: 80 }, { value: 'B', trait: 'C', score: 40 }] },
  { id: 2, options: [{ value: 'A', trait: 'O', score: 60 }, { value: 'B', trait: 'E', score: 90 }] },
];

test('OCEAN: averages selected option scores per trait', () => {
  const scores = computeOceanScores(syntheticOceanBank, [
    { questionId: 1, answer: 'A' },
    { questionId: 2, answer: 'A' },
  ]);
  assert.strictEqual(scores.O, 70, '(80 + 60) / 2');
});

test('OCEAN: traits with no samples default to neutral 50', () => {
  const scores = computeOceanScores(syntheticOceanBank, [{ questionId: 1, answer: 'A' }]);
  assert.strictEqual(scores.C, 50);
  assert.strictEqual(scores.E, 50);
  assert.strictEqual(scores.A, 50);
  assert.strictEqual(scores.N, 50);
});

test('OCEAN: invalid question id throws ApiError 400', () => {
  assert.throws(
    () => computeOceanScores(syntheticOceanBank, [{ questionId: 999, answer: 'A' }]),
    (err) => err instanceof ApiError && err.statusCode === 400
  );
});

test('OCEAN: invalid answer value throws ApiError 400', () => {
  assert.throws(
    () => computeOceanScores(syntheticOceanBank, [{ questionId: 1, answer: 'Z' }]),
    (err) => err instanceof ApiError && err.statusCode === 400
  );
});

test('OCEAN: full 32-answer run over the real bank yields valid trait scores', () => {
  const answers = oceanQuestions.map(q => ({ questionId: q.id, answer: q.options[0].value }));
  assert.strictEqual(oceanQuestions.length, 32, 'bank holds 32 questions');
  const scores = computeOceanScores(oceanQuestions, answers);
  for (const trait of ['O', 'C', 'E', 'A', 'N']) {
    assert.ok(Number.isInteger(scores[trait]), `${trait} is an integer`);
    assert.ok(scores[trait] >= 0 && scores[trait] <= 100, `${trait} within 0-100`);
  }
});

const syntheticMbtiBank = [
  { id: 1, options: [{ value: 'A', dimension: 'E' }, { value: 'B', dimension: 'I' }] },
  { id: 2, options: [{ value: 'A', dimension: 'E' }, { value: 'B', dimension: 'I' }] },
  { id: 3, options: [{ value: 'A', dimension: 'S' }, { value: 'B', dimension: 'N' }] },
  { id: 4, options: [{ value: 'A', dimension: 'T' }, { value: 'B', dimension: 'F' }] },
  { id: 5, options: [{ value: 'A', dimension: 'J' }, { value: 'B', dimension: 'P' }] },
];

test('MBTI: counts derive the four-letter type', () => {
  const { mbtiType, mbtiScores } = computeMbtiResult(syntheticMbtiBank, [
    { questionId: 1, answer: 'B' },
    { questionId: 2, answer: 'B' },
    { questionId: 3, answer: 'B' },
    { questionId: 4, answer: 'B' },
    { questionId: 5, answer: 'B' },
  ]);
  assert.strictEqual(mbtiType, 'INFP');
  assert.strictEqual(mbtiScores.I, 100);
  assert.strictEqual(mbtiScores.E, 0);
});

test('MBTI: pair ties resolve to the first letter (E, S, T, J)', () => {
  const { mbtiType, mbtiScores } = computeMbtiResult(syntheticMbtiBank, [
    { questionId: 1, answer: 'A' }, // E
    { questionId: 2, answer: 'B' }, // I → 1-1 tie
    { questionId: 3, answer: 'A' },
    { questionId: 4, answer: 'A' },
    { questionId: 5, answer: 'A' },
  ]);
  assert.strictEqual(mbtiType, 'ESTJ');
  assert.strictEqual(mbtiScores.E, 50);
  assert.strictEqual(mbtiScores.I, 50);
});

test('MBTI: unanswered pair defaults to 50/50 and first letter', () => {
  const { mbtiType, mbtiScores } = computeMbtiResult(syntheticMbtiBank, [
    { questionId: 1, answer: 'A' },
  ]);
  assert.strictEqual(mbtiType, 'ESTJ');
  assert.strictEqual(mbtiScores.S, 50);
  assert.strictEqual(mbtiScores.N, 50);
});

test('MBTI: full 32-answer run over the real bank yields a coherent result', () => {
  assert.strictEqual(mbtiQuestions.length, 32, 'bank holds 32 questions');
  const answers = mbtiQuestions.map(q => ({ questionId: q.id, answer: 'A' }));
  const { mbtiType, mbtiScores } = computeMbtiResult(mbtiQuestions, answers);
  assert.match(mbtiType, /^[EI][SN][TF][JP]$/);
  for (const [a, b] of [['E', 'I'], ['S', 'N'], ['T', 'F'], ['J', 'P']]) {
    assert.strictEqual(mbtiScores[a] + mbtiScores[b], 100, `${a}/${b} percentages sum to 100`);
  }
});

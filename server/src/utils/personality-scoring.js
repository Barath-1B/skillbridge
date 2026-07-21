const ApiError = require('./ApiError');

// Pure scoring helpers shared by the profile and retake-tests modules.
// Callers pass the question bank in so these stay constant-free and testable.

const buildQuestionMap = (questions) => {
  const map = {};
  questions.forEach(q => { map[q.id] = q.options; });
  return map;
};

const resolveOption = (questionMap, questionId, answer) => {
  const options = questionMap[questionId];
  if (!options) {
    throw new ApiError(400, 'One or more question IDs are invalid');
  }
  const selected = options.find(opt => opt.value === answer);
  if (!selected) {
    throw new ApiError(400, `Invalid answer for question ${questionId}`);
  }
  return selected;
};

/**
 * OCEAN: average the selected option scores per trait.
 * Traits with no samples default to 50 (neutral).
 *
 * @param {Array}  questions - OCEAN question bank ({id, options:[{value, trait, score}]})
 * @param {Array}  answers   - [{ questionId, answer }]
 * @returns {object} { O, C, E, A, N } each 0-100
 */
const computeOceanScores = (questions, answers) => {
  const questionMap = buildQuestionMap(questions);
  const traitScores = { O: [], C: [], E: [], A: [], N: [] };

  answers.forEach(({ questionId, answer }) => {
    const selected = resolveOption(questionMap, questionId, answer);
    traitScores[selected.trait].push(selected.score);
  });

  const oceanScore = {};
  Object.keys(traitScores).forEach(trait => {
    const scores = traitScores[trait];
    const average = scores.length > 0
      ? scores.reduce((a, b) => a + b, 0) / scores.length
      : 50;
    oceanScore[trait] = Math.round(average);
  });

  return oceanScore;
};

const MBTI_PAIRS = [['E', 'I'], ['S', 'N'], ['T', 'F'], ['J', 'P']];

/**
 * MBTI: count selected option dimensions, derive the 4-letter type
 * (ties favor the first letter of each pair: E, S, T, J) and a
 * per-letter percentage within its pair.
 *
 * @param {Array}  questions - MBTI question bank ({id, options:[{value, dimension}]})
 * @param {Array}  answers   - [{ questionId, answer }]
 * @returns {object} { mbtiType: 'ENFP', mbtiScores: {E,I,S,N,T,F,J,P} }
 */
const computeMbtiResult = (questions, answers) => {
  const questionMap = buildQuestionMap(questions);
  const counts = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };

  answers.forEach(({ questionId, answer }) => {
    const selected = resolveOption(questionMap, questionId, answer);
    counts[selected.dimension] += 1;
  });

  const mbtiType = MBTI_PAIRS
    .map(([first, second]) => (counts[first] >= counts[second] ? first : second))
    .join('');

  const mbtiScores = {};
  MBTI_PAIRS.forEach(([first, second]) => {
    const total = counts[first] + counts[second];
    const firstPct = total > 0 ? Math.round((counts[first] / total) * 100) : 50;
    mbtiScores[first] = firstPct;
    mbtiScores[second] = 100 - firstPct;
  });

  return { mbtiType, mbtiScores };
};

module.exports = { computeOceanScores, computeMbtiResult };

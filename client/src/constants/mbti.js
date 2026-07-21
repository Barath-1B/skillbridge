// MBTI type metadata for display. Personality result is display-only —
// it does not affect career match scores.

export const MBTI_TYPES = {
  INTJ: { code: 'INTJ', epithet: 'The Architect', description: 'Strategic, independent, and driven by long-term vision.' },
  INTP: { code: 'INTP', epithet: 'The Logician', description: 'Curious analysts who love ideas, systems, and theory.' },
  ENTJ: { code: 'ENTJ', epithet: 'The Commander', description: 'Decisive leaders who organize people toward a goal.' },
  ENTP: { code: 'ENTP', epithet: 'The Debater', description: 'Inventive thinkers energized by new possibilities.' },
  INFJ: { code: 'INFJ', epithet: 'The Advocate', description: 'Insightful and principled, guided by a clear inner vision.' },
  INFP: { code: 'INFP', epithet: 'The Mediator', description: 'Idealistic and empathetic, driven by personal values.' },
  ENFJ: { code: 'ENFJ', epithet: 'The Protagonist', description: 'Warm organizers who bring out the best in others.' },
  ENFP: { code: 'ENFP', epithet: 'The Campaigner', description: 'Enthusiastic and creative, drawn to people and ideas.' },
  ISTJ: { code: 'ISTJ', epithet: 'The Logistician', description: 'Practical and dependable, valuing structure and facts.' },
  ISFJ: { code: 'ISFJ', epithet: 'The Defender', description: 'Caring and meticulous, quietly supporting those around them.' },
  ESTJ: { code: 'ESTJ', epithet: 'The Executive', description: 'Organized realists who get things done efficiently.' },
  ESFJ: { code: 'ESFJ', epithet: 'The Consul', description: 'Sociable and loyal, attentive to the needs of the group.' },
  ISTP: { code: 'ISTP', epithet: 'The Virtuoso', description: 'Hands-on problem-solvers who thrive on how things work.' },
  ISFP: { code: 'ISFP', epithet: 'The Adventurer', description: 'Flexible and creative, living in the present moment.' },
  ESTP: { code: 'ESTP', epithet: 'The Entrepreneur', description: 'Bold and pragmatic, energized by action and results.' },
  ESFP: { code: 'ESFP', epithet: 'The Entertainer', description: 'Spontaneous and lively, drawn to people and experiences.' },
};

// Each dichotomy pair with the labels for its two letters.
export const MBTI_DIMENSIONS = [
  { pair: ['E', 'I'], labels: { E: 'Extraversion', I: 'Introversion' } },
  { pair: ['S', 'N'], labels: { S: 'Sensing', N: 'Intuition' } },
  { pair: ['T', 'F'], labels: { T: 'Thinking', F: 'Feeling' } },
  { pair: ['J', 'P'], labels: { J: 'Judging', P: 'Perceiving' } },
];

export const OCEAN_TRAITS = [
  { key: 'O', label: 'Openness', description: 'Curiosity, imagination, and openness to new ideas.' },
  { key: 'C', label: 'Conscientiousness', description: 'Organization, discipline, and follow-through.' },
  { key: 'E', label: 'Extraversion', description: 'Energy drawn from people and social interaction.' },
  { key: 'A', label: 'Agreeableness', description: 'Compassion, cooperation, and trust in others.' },
  { key: 'N', label: 'Neuroticism', description: 'Sensitivity to stress and negative emotion.' },
];

// Map a 0-100 trait score to a plain-language tier for display.
export function oceanTier(score) {
  if (score <= 29) return 'Low';
  if (score <= 44) return 'Below average';
  if (score <= 55) return 'Average';
  if (score <= 70) return 'Above average';
  return 'High';
}

// Canonical skill categories — must match the backend enum in
// server/src/models/skill.model.js (category field).
export const SKILL_CATEGORIES = [
  'technical-skill',
  'knowledge',
  'certification',
  'soft-skill',
];

export const SKILL_CATEGORY_LABELS = {
  'technical-skill': 'Technical Skills',
  knowledge: 'Knowledge Areas',
  certification: 'Certifications',
  'soft-skill': 'Soft Skills',
};

// Human-friendly label for a category value, with a sensible fallback.
export const skillCategoryLabel = (category) =>
  SKILL_CATEGORY_LABELS[category] ||
  (category ? category.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()) : 'Other');

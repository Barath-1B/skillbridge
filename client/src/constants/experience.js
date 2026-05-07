export const EXPERIENCE_OPTIONS = [
  { id: 'student', label: 'Student', desc: 'Currently learning, internships welcome.' },
  { id: '0-1yr', label: '0–1 year', desc: 'Just started in industry.' },
  { id: '1-3yr', label: '1–3 years', desc: 'Comfortable shipping features.' },
  { id: '3+yr', label: '3+ years', desc: 'Senior contributor.' },
];

export const EXPERIENCE_LABELS = Object.fromEntries(
  EXPERIENCE_OPTIONS.map(({ id, label }) => [id, label])
);

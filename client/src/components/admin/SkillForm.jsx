import { useState } from 'react';
import { Modal, Input, Textarea, Button } from '../common';
import { SKILL_CATEGORIES, SKILL_CATEGORY_LABELS } from '../../constants/skillCategories';

const DIFFICULTIES = ['beginner', 'intermediate', 'advanced'];

const selectClass = [
  'w-full rounded-xl px-3.5 py-2.5 text-sm outline-none transition',
  'bg-white border border-zinc-200 text-zinc-900',
  'focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20',
  'dark:bg-white/5 dark:border-white/10 dark:text-zinc-100',
].join(' ');

// Map an existing skill (or null) to initial form state. Callers should pass a
// changing `key` when opening so this re-runs via the useState initializer
// instead of a prop-syncing effect.
const buildInitial = (skill) => ({
  name: skill?.name || '',
  category: skill?.category || SKILL_CATEGORIES[0],
  difficultyLevel: skill?.difficultyLevel || 'intermediate',
  description: skill?.description || '',
  tags: (skill?.tags || []).join(', '),
});

export default function SkillForm({ open, skill, onSave, onCancel }) {
  const [formData, setFormData] = useState(() => buildInitial(skill));
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setErrors({ name: 'Skill name is required' });
      return;
    }

    setSaving(true);
    try {
      await onSave({
        name: formData.name.trim(),
        category: formData.category,
        difficultyLevel: formData.difficultyLevel,
        description: formData.description.trim(),
        tags: formData.tags
          .split(',')
          .map((t) => t.trim())
          .filter(Boolean),
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onCancel}
      title={skill ? 'Edit Skill' : 'Create New Skill'}
      size="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Skill Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="e.g., Python, Communication"
          error={errors.name}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
              Category
            </label>
            <select name="category" value={formData.category} onChange={handleChange} className={selectClass}>
              {SKILL_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {SKILL_CATEGORY_LABELS[cat]}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
              Difficulty
            </label>
            <select
              name="difficultyLevel"
              value={formData.difficultyLevel}
              onChange={handleChange}
              className={selectClass}
            >
              {DIFFICULTIES.map((d) => (
                <option key={d} value={d} className="capitalize">
                  {d.charAt(0).toUpperCase() + d.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        <Textarea
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
          placeholder="Short description of the skill"
        />

        <Input
          label="Tags"
          name="tags"
          value={formData.tags}
          onChange={handleChange}
          placeholder="comma-separated, e.g. backend, rest, api"
          hint="Separate tags with commas."
        />

        <div className="flex items-center justify-end gap-2 pt-2">
          <Button type="button" variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" loading={saving}>
            {skill ? 'Update' : 'Create'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}

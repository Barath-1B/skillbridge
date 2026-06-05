import { useState } from 'react';
import { Modal, Input, Textarea, Button } from '../common';

const DIFFICULTIES = ['beginner', 'intermediate', 'advanced'];
const DEMANDS = ['low', 'medium', 'high'];

const selectClass = [
  'w-full rounded-xl px-3.5 py-2.5 text-sm outline-none transition',
  'bg-white border border-zinc-200 text-zinc-900',
  'focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20',
  'dark:bg-white/5 dark:border-white/10 dark:text-zinc-100',
].join(' ');

const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);

// Backend requires exactly 3 phases, each with a title and milestoneMonths.
const DEFAULT_PHASES = [
  { phase: 1, title: 'Foundation', skills: '', milestoneMonths: 'Months 1-2' },
  { phase: 2, title: 'Core', skills: '', milestoneMonths: 'Months 3-5' },
  { phase: 3, title: 'Advanced', skills: '', milestoneMonths: 'Months 6-8' },
];

// Map an existing career (or null) to initial form state. Callers should pass a
// changing `key` when opening so this re-runs via the useState initializer
// instead of a prop-syncing effect.
const buildInitial = (career) => {
  if (!career) {
    return {
      title: '',
      domain: '',
      description: '',
      difficulty: 'intermediate',
      demand: 'medium',
      estimatedTimeToBridge: '6-8 months',
      phases: DEFAULT_PHASES,
    };
  }
  return {
    title: career.title || '',
    domain: career.domain || '',
    description: career.description || '',
    difficulty: career.difficulty || 'intermediate',
    demand: career.demand || 'medium',
    estimatedTimeToBridge: career.estimatedTimeToBridge || '',
    phases: (career.phases?.length === 3 ? career.phases : DEFAULT_PHASES).map((p, i) => ({
      phase: p.phase || i + 1,
      title: p.title || DEFAULT_PHASES[i].title,
      skills: Array.isArray(p.skills) ? p.skills.join(', ') : p.skills || '',
      milestoneMonths: p.milestoneMonths || '',
    })),
  };
};

export default function CareerForm({ open, career, onSave, onCancel }) {
  const [formData, setFormData] = useState(() => buildInitial(career));
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handlePhaseChange = (index, field, value) => {
    setFormData((prev) => ({
      ...prev,
      phases: prev.phases.map((p, i) => (i === index ? { ...p, [field]: value } : p)),
    }));
  };

  const validate = () => {
    const next = {};
    if (!formData.title.trim()) next.title = 'Title is required';
    if (!formData.domain.trim()) next.domain = 'Domain is required';
    if (!formData.description.trim()) next.description = 'Description is required';
    if (!formData.estimatedTimeToBridge.trim()) next.estimatedTimeToBridge = 'Required';
    formData.phases.forEach((p, i) => {
      if (!p.title.trim()) next[`phase${i}title`] = 'Required';
      if (!p.milestoneMonths.trim()) next[`phase${i}months`] = 'Required';
    });
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSaving(true);
    try {
      await onSave({
        title: formData.title.trim(),
        domain: formData.domain.trim(),
        description: formData.description.trim(),
        difficulty: formData.difficulty,
        demand: formData.demand,
        estimatedTimeToBridge: formData.estimatedTimeToBridge.trim(),
        phases: formData.phases.map((p, i) => ({
          phase: i + 1,
          title: p.title.trim(),
          milestoneMonths: p.milestoneMonths.trim(),
          skills: p.skills
            .split(',')
            .map((s) => s.trim())
            .filter(Boolean),
        })),
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onCancel}
      title={career ? 'Edit Career Path' : 'Create New Career Path'}
      size="xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
        <Input
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          error={errors.title}
        />
        <Input
          label="Domain"
          name="domain"
          value={formData.domain}
          onChange={handleChange}
          placeholder="e.g., Web Development, Security"
          error={errors.domain}
        />
        <Textarea
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
          error={errors.description}
        />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
              Difficulty
            </label>
            <select name="difficulty" value={formData.difficulty} onChange={handleChange} className={selectClass}>
              {DIFFICULTIES.map((d) => (
                <option key={d} value={d}>{cap(d)}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
              Demand
            </label>
            <select name="demand" value={formData.demand} onChange={handleChange} className={selectClass}>
              {DEMANDS.map((d) => (
                <option key={d} value={d}>{cap(d)}</option>
              ))}
            </select>
          </div>
          <Input
            label="Time to Bridge"
            name="estimatedTimeToBridge"
            value={formData.estimatedTimeToBridge}
            onChange={handleChange}
            placeholder="e.g., 6-8 months"
            error={errors.estimatedTimeToBridge}
          />
        </div>

        <div className="pt-2">
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
            Roadmap Phases (exactly 3)
          </h3>
          <div className="space-y-3">
            {formData.phases.map((p, i) => (
              <div
                key={i}
                className="rounded-xl border border-zinc-200 dark:border-white/10 p-3 space-y-3"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Input
                    label={`Phase ${i + 1} title`}
                    value={p.title}
                    onChange={(e) => handlePhaseChange(i, 'title', e.target.value)}
                    error={errors[`phase${i}title`]}
                  />
                  <Input
                    label="Milestone months"
                    value={p.milestoneMonths}
                    onChange={(e) => handlePhaseChange(i, 'milestoneMonths', e.target.value)}
                    placeholder="e.g., Months 1-2"
                    error={errors[`phase${i}months`]}
                  />
                </div>
                <Input
                  label="Skills"
                  value={p.skills}
                  onChange={(e) => handlePhaseChange(i, 'skills', e.target.value)}
                  placeholder="comma-separated, e.g. HTML, CSS, Git"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 pt-2">
          <Button type="button" variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" loading={saving}>
            {career ? 'Update' : 'Create'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}

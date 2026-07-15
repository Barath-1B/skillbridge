import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { Modal, Input, Textarea, Button } from '../common';
import adminService from '../../services/admin/admin.service';
import { skillCategoryLabel } from '../../constants/skillCategories';

const DIFFICULTIES = ['beginner', 'intermediate', 'advanced'];
const DEMANDS = ['low', 'medium', 'high'];
const PRIORITIES = ['high', 'medium', 'low'];

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
      requiredSkills: [],
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
    // Admin reads populate skillId with {_id, name, category}; unwrap to the id.
    requiredSkills: (career.requiredSkills || []).map((rs) => ({
      skillId: rs.skillId?._id || rs.skillId || '',
      weight: rs.weight ?? 5,
      priority: rs.priority || 'medium',
    })),
  };
};

export default function CareerForm({ open, career, onSave, onCancel }) {
  const [formData, setFormData] = useState(() => buildInitial(career));
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [skillOptions, setSkillOptions] = useState([]);

  // Options for the required-skills picker. The form remounts per open (key
  // prop from AdminCareers), so this fetches once per dialog.
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await adminService.getSkills();
        if (mounted) setSkillOptions(data?.skills || []);
      } catch {
        if (mounted) setSkillOptions([]);
      }
    })();
    return () => { mounted = false; };
  }, []);

  const skillsByCategory = skillOptions.reduce((acc, s) => {
    (acc[s.category] = acc[s.category] || []).push(s);
    return acc;
  }, {});

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

  const handleRequiredSkillChange = (index, field, value) => {
    setFormData((prev) => ({
      ...prev,
      requiredSkills: prev.requiredSkills.map((rs, i) =>
        i === index ? { ...rs, [field]: value } : rs
      ),
    }));
    if (errors[`reqSkill${index}`]) setErrors((prev) => ({ ...prev, [`reqSkill${index}`]: '' }));
  };

  const addRequiredSkill = () => {
    setFormData((prev) => ({
      ...prev,
      requiredSkills: [...prev.requiredSkills, { skillId: '', weight: 5, priority: 'medium' }],
    }));
  };

  const removeRequiredSkill = (index) => {
    setFormData((prev) => ({
      ...prev,
      requiredSkills: prev.requiredSkills.filter((_, i) => i !== index),
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
    formData.requiredSkills.forEach((rs, i) => {
      const weight = Number(rs.weight);
      if (!rs.skillId) next[`reqSkill${i}`] = 'Pick a skill';
      else if (!Number.isInteger(weight) || weight < 1 || weight > 10) {
        next[`reqSkill${i}`] = 'Weight must be 1-10';
      }
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
        requiredSkills: formData.requiredSkills.map((rs) => ({
          skillId: rs.skillId,
          weight: Number(rs.weight),
          priority: rs.priority,
        })),
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
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                Required Skills
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Weighted skills feed the match score — without them this career never ranks.
              </p>
            </div>
            <Button type="button" variant="secondary" size="sm" onClick={addRequiredSkill}>
              Add skill
            </Button>
          </div>
          {formData.requiredSkills.length === 0 && (
            <p className="text-sm text-zinc-500 dark:text-zinc-400 rounded-xl border border-dashed border-zinc-300 dark:border-white/10 p-3">
              No required skills yet.
            </p>
          )}
          <div className="space-y-2">
            {formData.requiredSkills.map((rs, i) => {
              const pickedElsewhere = new Set(
                formData.requiredSkills.filter((_, j) => j !== i).map((r) => r.skillId)
              );
              return (
                <div key={i} className="rounded-xl border border-zinc-200 dark:border-white/10 p-3">
                  <div className="grid grid-cols-1 sm:grid-cols-[1fr_5.5rem_7rem_2rem] gap-2 items-center">
                    <select
                      value={rs.skillId}
                      onChange={(e) => handleRequiredSkillChange(i, 'skillId', e.target.value)}
                      className={selectClass}
                      aria-label="Skill"
                    >
                      <option value="">Select a skill…</option>
                      {Object.entries(skillsByCategory).map(([category, skills]) => (
                        <optgroup key={category} label={skillCategoryLabel(category)}>
                          {skills
                            .filter((s) => s._id === rs.skillId || !pickedElsewhere.has(s._id))
                            .map((s) => (
                              <option key={s._id} value={s._id}>{s.name}</option>
                            ))}
                        </optgroup>
                      ))}
                    </select>
                    <Input
                      type="number"
                      min={1}
                      max={10}
                      value={rs.weight}
                      onChange={(e) => handleRequiredSkillChange(i, 'weight', e.target.value)}
                      aria-label="Weight (1-10)"
                    />
                    <select
                      value={rs.priority}
                      onChange={(e) => handleRequiredSkillChange(i, 'priority', e.target.value)}
                      className={selectClass}
                      aria-label="Priority"
                    >
                      {PRIORITIES.map((p) => (
                        <option key={p} value={p}>{cap(p)}</option>
                      ))}
                    </select>
                    <button
                      type="button"
                      onClick={() => removeRequiredSkill(i)}
                      className="justify-self-center p-1.5 rounded-lg text-zinc-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 transition"
                      aria-label="Remove skill"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  {errors[`reqSkill${i}`] && (
                    <p className="text-xs text-red-600 mt-1">{errors[`reqSkill${i}`]}</p>
                  )}
                </div>
              );
            })}
          </div>
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

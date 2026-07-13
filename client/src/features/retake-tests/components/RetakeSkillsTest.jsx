import { useState, useEffect } from 'react';
import { Check, CheckCircle2 } from 'lucide-react';
import { Card, Button, Skeleton } from '../../../components/common';
import { useToast } from '../../../components/common/Toast';
import { useAuth } from '../../../context/AuthContext';
import retakeTestsService from '../../../services/retake-tests.service';
import { SKILL_CATEGORIES, SKILL_CATEGORY_LABELS } from '../../../constants/skillCategories';

export default function RetakeSkillsTest() {
  const toast = useToast();
  const { refreshUser } = useAuth();
  const [skills, setSkills] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [activeCategory, setActiveCategory] = useState(SKILL_CATEGORIES[0]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await retakeTestsService.getSkills();
        if (mounted) setSkills(data);
      } catch {
        if (mounted) toast.error('Failed to load skills');
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [toast]);

  const toggleSkill = (skillId) => {
    setSelectedSkills((prev) =>
      prev.includes(skillId) ? prev.filter((id) => id !== skillId) : [...prev, skillId]
    );
  };

  const handleSubmit = async () => {
    if (selectedSkills.length === 0) {
      toast.error('Please select at least one skill');
      return;
    }
    setSubmitting(true);
    try {
      await retakeTestsService.retakeSkillsTest(selectedSkills);
      await refreshUser();
      setDone(true);
      toast.success('Skills updated');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Could not update skills');
    } finally {
      setSubmitting(false);
    }
  };

  if (done) {
    return (
      <Card padding="lg" className="text-center">
        <CheckCircle2 className="w-10 h-10 mx-auto text-teal-600 dark:text-teal-400" />
        <h3 className="mt-3 text-lg font-semibold text-zinc-900 dark:text-zinc-50">Skills updated</h3>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">Your profile now reflects your selection.</p>
      </Card>
    );
  }

  if (loading) return <Skeleton className="h-64" />;

  const filteredSkills = skills.filter((s) => s.category === activeCategory);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-zinc-600 dark:text-zinc-300">Select the skills you have:</p>
        <span className="text-xs font-medium tabular-nums text-teal-700 dark:text-teal-300">
          {selectedSkills.length} selected
        </span>
      </div>

      <div className="flex flex-wrap gap-1 p-1 mb-4 rounded-2xl bg-zinc-100/70 dark:bg-white/5 border border-zinc-200/60 dark:border-white/10">
        {SKILL_CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActiveCategory(cat)}
            className={[
              'px-3 py-1.5 text-sm font-medium rounded-xl transition',
              activeCategory === cat
                ? 'bg-white text-zinc-900 dark:bg-white/10 dark:text-zinc-50 shadow-sm'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100',
            ].join(' ')}
          >
            {SKILL_CATEGORY_LABELS[cat]}
          </button>
        ))}
      </div>

      <Card>
        {filteredSkills.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {filteredSkills.map((skill) => {
              const active = selectedSkills.includes(skill._id);
              return (
                <button
                  key={skill._id}
                  type="button"
                  onClick={() => toggleSkill(skill._id)}
                  aria-pressed={active}
                  className={[
                    'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-sm transition',
                    active
                      ? 'border-teal-500 bg-teal-500/10 text-teal-800 dark:text-teal-200'
                      : 'border-zinc-200 dark:border-white/10 bg-white dark:bg-white/5 text-zinc-700 dark:text-zinc-300 hover:border-teal-400',
                  ].join(' ')}
                >
                  {active && <Check className="w-3.5 h-3.5" />}
                  {skill.name}
                </button>
              );
            })}
          </div>
        ) : (
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            No {SKILL_CATEGORY_LABELS[activeCategory].toLowerCase()} available.
          </p>
        )}
      </Card>

      <div className="mt-4 flex justify-between gap-3">
        <Button variant="ghost" onClick={() => setSelectedSkills([])} disabled={selectedSkills.length === 0}>
          Clear all
        </Button>
        <Button onClick={handleSubmit} loading={submitting} disabled={selectedSkills.length === 0}>
          Update skills
        </Button>
      </div>
    </div>
  );
}

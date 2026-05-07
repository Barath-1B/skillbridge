import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  Search,
  Briefcase,
  GraduationCap,
  Sparkles,
  Check,
  AlertCircle,
} from 'lucide-react';
import api from '../api/axios';
import PageContainer from '../components/common/PageContainer';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import Input from '../components/common/Input';
import Skeleton from '../components/common/Skeleton';
import { EXPERIENCE_OPTIONS as BASE_EXPERIENCE_OPTIONS } from '../constants/experience';

const EXPERIENCE_ICONS = {
  student: <GraduationCap className="w-5 h-5" />,
  '0-1yr': <Sparkles className="w-5 h-5" />,
  '1-3yr': <Briefcase className="w-5 h-5" />,
  '3+yr': <Briefcase className="w-5 h-5" />,
};

const EXPERIENCE_OPTIONS = BASE_EXPERIENCE_OPTIONS.map((opt) => ({
  ...opt,
  icon: EXPERIENCE_ICONS[opt.id],
}));

export default function ProfileSetup() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [experience, setExperience] = useState('');
  const [skillIds, setSkillIds] = useState([]);
  const [skills, setSkills] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await api.get('/profile/skills');
        if (mounted) setSkills(res.data.data || []);
      } catch {
        if (mounted) setError('Failed to load skills');
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const categories = useMemo(() => {
    const set = new Set(skills.map((s) => s.category || 'other'));
    return ['all', ...Array.from(set)];
  }, [skills]);

  const filteredSkills = useMemo(() => {
    let list = skills;
    if (activeCategory !== 'all') list = list.filter((s) => s.category === activeCategory);
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter((s) => s.name.toLowerCase().includes(q));
    }
    return list;
  }, [skills, activeCategory, query]);

  const toggleSkill = (id) => {
    setSkillIds((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const goNext = () => {
    setError('');
    if (step === 1 && !experience) {
      setError('Pick where you are in your journey.');
      return;
    }
    if (step === 2 && skillIds.length === 0) {
      setError('Pick at least one skill.');
      return;
    }
    setStep((s) => s + 1);
  };

  const goBack = () => {
    setError('');
    setStep((s) => Math.max(1, s - 1));
  };

  const handleSubmit = async () => {
    setError('');
    setSaving(true);
    try {
      await api.put('/profile', { experience, skillIds });
      navigate('/setup/ocean');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save profile');
    } finally {
      setSaving(false);
    }
  };

  const totalSteps = 3;

  return (
    <PageContainer size="narrow">
      {/* Step indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs uppercase tracking-wider font-semibold text-teal-700 dark:text-teal-300">
            Onboarding · Step {step} of {totalSteps}
          </p>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Takes about 2 minutes
          </p>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {Array.from({ length: totalSteps }).map((_, i) => {
            const filled = i + 1 <= step;
            return (
              <div
                key={i}
                className="h-1.5 rounded-full bg-zinc-200/70 dark:bg-white/10 overflow-hidden"
              >
                <motion.div
                  initial={false}
                  animate={{ width: filled ? '100%' : '0%' }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="h-full bg-teal-600"
                />
              </div>
            );
          })}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          {step === 1 && (
            <Card padding="lg">
              <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-50">
                Where are you in your journey?
              </h1>
              <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
                We weight career matches differently for students vs. seasoned engineers.
              </p>
              <div className="mt-6 grid sm:grid-cols-2 gap-3">
                {EXPERIENCE_OPTIONS.map((opt) => {
                  const active = experience === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setExperience(opt.id)}
                      className={[
                        'text-left p-4 rounded-2xl border transition group',
                        active
                          ? 'border-teal-500 bg-teal-500/5'
                          : 'border-zinc-200 dark:border-white/10 hover:border-zinc-300 dark:hover:border-white/20 bg-white/60 dark:bg-white/5',
                      ].join(' ')}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={[
                            'w-10 h-10 rounded-xl grid place-items-center transition',
                            active
                              ? 'bg-teal-600 text-white'
                              : 'bg-zinc-100 dark:bg-white/10 text-zinc-700 dark:text-zinc-200',
                          ].join(' ')}
                        >
                          {opt.icon}
                        </span>
                        <div className="flex-1">
                          <p className="font-semibold text-zinc-900 dark:text-zinc-50">{opt.label}</p>
                          <p className="text-xs text-zinc-500 dark:text-zinc-400">{opt.desc}</p>
                        </div>
                        {active && <Check className="w-5 h-5 text-teal-600" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </Card>
          )}

          {step === 2 && (
            <Card padding="lg">
              <div className="flex items-start justify-between gap-3 flex-wrap">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-50">
                    Pick what you know
                  </h1>
                  <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
                    Select every skill you're comfortable with. We'll find the careers that fit.
                  </p>
                </div>
                <Badge variant="primary">{skillIds.length} selected</Badge>
              </div>

              <div className="mt-5 flex flex-col sm:flex-row gap-3">
                <div className="flex-1">
                  <Input
                    placeholder="Search skills…"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    leftIcon={<Search className="w-4 h-4" />}
                  />
                </div>
              </div>

              <div className="mt-3 flex flex-wrap gap-1.5">
                {categories.map((cat) => {
                  const active = activeCategory === cat;
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setActiveCategory(cat)}
                      className={[
                        'px-3 py-1.5 rounded-full text-xs font-medium capitalize transition border',
                        active
                          ? 'bg-zinc-900 text-white border-zinc-900 dark:bg-white dark:text-zinc-900 dark:border-white'
                          : 'bg-white dark:bg-white/5 text-zinc-600 dark:text-zinc-300 border-zinc-200 dark:border-white/10 hover:border-zinc-300 dark:hover:border-white/20',
                      ].join(' ')}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>

              <div className="mt-5 max-h-[420px] overflow-y-auto pr-1">
                {loading ? (
                  <div className="grid sm:grid-cols-2 gap-2">
                    {Array.from({ length: 8 }).map((_, i) => (
                      <Skeleton key={i} className="h-10" />
                    ))}
                  </div>
                ) : filteredSkills.length === 0 ? (
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 py-8 text-center">
                    No skills match your filter.
                  </p>
                ) : (
                  <div className="grid sm:grid-cols-2 gap-2">
                    {filteredSkills.map((skill) => {
                      const active = skillIds.includes(skill._id);
                      return (
                        <button
                          key={skill._id}
                          type="button"
                          onClick={() => toggleSkill(skill._id)}
                          className={[
                            'flex items-center justify-between gap-2 px-3 py-2.5 rounded-xl border text-sm font-medium transition text-left',
                            active
                              ? 'border-teal-500 bg-teal-500/5 text-zinc-900 dark:text-zinc-50'
                              : 'border-zinc-200 dark:border-white/10 bg-white dark:bg-white/5 text-zinc-700 dark:text-zinc-300 hover:border-zinc-300 dark:hover:border-white/20',
                          ].join(' ')}
                        >
                          <span>{skill.name}</span>
                          <span
                            className={[
                              'w-5 h-5 rounded-full grid place-items-center transition shrink-0',
                              active
                                ? 'bg-teal-600 text-white'
                                : 'bg-zinc-100 dark:bg-white/10 text-transparent',
                            ].join(' ')}
                          >
                            <Check className="w-3 h-3" />
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </Card>
          )}

          {step === 3 && (
            <Card padding="lg">
              <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-50">
                Looks good?
              </h1>
              <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
                Confirm and we'll move on to the personality quiz.
              </p>

              <dl className="mt-6 space-y-4">
                <div className="flex justify-between gap-4 p-4 rounded-xl bg-white/60 dark:bg-white/5 border border-zinc-200/60 dark:border-white/10">
                  <dt className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Experience</dt>
                  <dd className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                    {EXPERIENCE_OPTIONS.find((o) => o.id === experience)?.label || '—'}
                  </dd>
                </div>
                <div className="p-4 rounded-xl bg-white/60 dark:bg-white/5 border border-zinc-200/60 dark:border-white/10">
                  <div className="flex justify-between mb-2">
                    <dt className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                      Skills ({skillIds.length})
                    </dt>
                  </div>
                  <dd className="flex flex-wrap gap-2">
                    {skills
                      .filter((s) => skillIds.includes(s._id))
                      .map((s) => (
                        <Badge key={s._id} variant="primary">
                          {s.name}
                        </Badge>
                      ))}
                  </dd>
                </div>
              </dl>
            </Card>
          )}
        </motion.div>
      </AnimatePresence>

      {error && (
        <p className="mt-4 flex items-start gap-2 text-sm text-red-600 dark:text-red-400">
          <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
          <span>{error}</span>
        </p>
      )}

      <div className="mt-6 flex justify-between gap-3">
        <Button
          variant="secondary"
          onClick={goBack}
          disabled={step === 1}
          leftIcon={<ArrowLeft className="w-4 h-4" />}
        >
          Back
        </Button>
        {step < totalSteps ? (
          <Button onClick={goNext} rightIcon={<ArrowRight className="w-4 h-4" />}>
            Continue
          </Button>
        ) : (
          <Button
            onClick={handleSubmit}
            loading={saving}
            rightIcon={!saving ? <ArrowRight className="w-4 h-4" /> : null}
          >
            Continue to personality quiz
          </Button>
        )}
      </div>
    </PageContainer>
  );
}

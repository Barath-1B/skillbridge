import { useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Tab } from '@headlessui/react';
import { Pencil, Calendar, Award, Sparkles, Settings, RotateCcw, CheckCircle2, Circle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import PageContainer from '../components/common/PageContainer';
import Card from '../components/common/Card';
import Avatar from '../components/common/Avatar';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import ProgressBar from '../components/common/ProgressBar';
import EmptyState from '../components/common/EmptyState';
import Skeleton, { SkeletonText } from '../components/common/Skeleton';
import { staggerParent, fadeUp } from '../utils/motion';
import { EXPERIENCE_LABELS } from '../constants/experience';
import { OCEAN_TRAITS } from '../constants/ocean';
import { MBTI_TYPES, MBTI_DIMENSIONS } from '../constants/mbti';
import { skillCategoryLabel } from '../constants/skillCategories';
import CertificationsManager from '../components/profile/CertificationsManager';

function TabBtn({ children, selected }) {
  return (
    <button
      type="button"
      className={[
        'px-4 py-2 text-sm font-medium rounded-xl transition outline-none',
        selected
          ? 'bg-white text-zinc-900 dark:bg-white/10 dark:text-zinc-50 shadow-sm'
          : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100',
      ].join(' ')}
    >
      {children}
    </button>
  );
}

export default function ProfilePage() {
  const { user, loading, refreshUser } = useAuth();
  const data = user || {};

  // Pull fresh profile data on mount so the page reflects the DB (the cached
  // auth user can be stale after onboarding saves).
  useEffect(() => {
    let mounted = true;
    (async () => {
      if (mounted) await refreshUser();
    })();
    return () => {
      mounted = false;
    };
  }, [refreshUser]);
  const memberSince = useMemo(() => {
    if (!data.createdAt) return null;
    return new Date(data.createdAt).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
    });
  }, [data.createdAt]);

  const skillsByCategory = useMemo(() => {
    const skills = Array.isArray(data.currentSkills) ? data.currentSkills : [];
    const grouped = {};
    skills.forEach((s) => {
      const key = s.category || 'other';
      if (!grouped[key]) grouped[key] = [];
      grouped[key].push(s);
    });
    return grouped;
  }, [data.currentSkills]);

  const completeness = useMemo(() => {
    // The three core onboarding steps. Certifications are optional and tracked
    // separately, so they don't gate completion.
    const checks = [
      { label: 'Experience set', done: Boolean(data.experience) },
      { label: 'Skills added', done: (data.currentSkills?.length || 0) > 0 },
      { label: 'Personality test', done: Boolean(data.lastOceanTestDate) },
    ];
    const doneCount = checks.filter((c) => c.done).length;
    return { checks, percent: Math.round((doneCount / checks.length) * 100) };
  }, [data.experience, data.currentSkills, data.lastOceanTestDate]);

  return (
    <PageContainer>
      {/* Hero banner */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden rounded-3xl p-6 sm:p-8 mb-6 glass-card-strong"
      >
        <div
          aria-hidden
          className="absolute -top-20 -right-20 w-72 h-72 rounded-full opacity-40 blur-3xl bg-teal-600"
        />
        <div
          aria-hidden
          className="absolute -bottom-24 -left-12 w-72 h-72 rounded-full opacity-30 blur-3xl bg-teal-700"
        />

        <div className="relative flex flex-col sm:flex-row sm:items-center gap-5">
          <Avatar name={data.name} src={data.avatarUrl} size="2xl" ring />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-50 truncate">
                {data.name || 'Your profile'}
              </h1>
              {data.role === 'admin' && <Badge variant="gradient">Admin</Badge>}
            </div>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{data.email}</p>
            <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
              {data.experience && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/60 dark:bg-white/5 border border-zinc-200/60 dark:border-white/10">
                  <Sparkles className="w-3.5 h-3.5" />
                  {EXPERIENCE_LABELS[data.experience] || data.experience}
                </span>
              )}
              {memberSince && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/60 dark:bg-white/5 border border-zinc-200/60 dark:border-white/10">
                  <Calendar className="w-3.5 h-3.5" />
                  Joined {memberSince}
                </span>
              )}
            </div>
          </div>
          <div className="flex sm:flex-col gap-2">
            <Link to="/settings/account">
              <Button variant="secondary" size="sm" leftIcon={<Pencil className="w-4 h-4" />}>
                Edit profile
              </Button>
            </Link>
            <Link to="/settings">
              <Button variant="ghost" size="sm" leftIcon={<Settings className="w-4 h-4" />}>
                Settings
              </Button>
            </Link>
          </div>
        </div>
      </motion.div>

      {!loading && completeness.percent < 100 && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-6"
        >
          <Card>
            <div className="flex items-center justify-between gap-4 mb-3">
              <div>
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">Profile completeness</h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  A fuller profile means sharper career matches.
                </p>
              </div>
              <span className="text-2xl font-bold text-teal-600 tabular-nums">{completeness.percent}%</span>
            </div>
            <ProgressBar progress={completeness.percent} showLabel={false} />
            <div className="flex flex-wrap gap-3 mt-3">
              {completeness.checks.map((c) => (
                <span
                  key={c.label}
                  className={[
                    'inline-flex items-center gap-1.5 text-xs',
                    c.done ? 'text-emerald-600 dark:text-emerald-400' : 'text-zinc-400',
                  ].join(' ')}
                >
                  {c.done ? <CheckCircle2 className="w-4 h-4" /> : <Circle className="w-4 h-4" />}
                  {c.label}
                </span>
              ))}
            </div>
          </Card>
        </motion.div>
      )}

      <Tab.Group>
        <Tab.List className="inline-flex gap-1 p-1 mb-6 rounded-2xl bg-zinc-100/70 dark:bg-white/5 border border-zinc-200/60 dark:border-white/10">
          <Tab as="div">{({ selected }) => <TabBtn selected={selected}>Overview</TabBtn>}</Tab>
          <Tab as="div">{({ selected }) => <TabBtn selected={selected}>Skills</TabBtn>}</Tab>
          <Tab as="div">{({ selected }) => <TabBtn selected={selected}>Personality</TabBtn>}</Tab>
        </Tab.List>

        <Tab.Panels>
          {/* Overview */}
          <Tab.Panel>
            {loading ? (
              <div className="grid sm:grid-cols-2 gap-4">
                <Skeleton className="h-40" />
                <Skeleton className="h-40" />
              </div>
            ) : (
              <motion.div
                variants={staggerParent}
                initial="hidden"
                animate="show"
                className="grid sm:grid-cols-2 gap-4"
              >
                <motion.div variants={fadeUp}>
                  <Card title="Experience" subtitle="Where you are in your journey">
                    <p className="text-zinc-700 dark:text-zinc-300">
                      {EXPERIENCE_LABELS[data.experience] || 'Not set'}
                    </p>
                  </Card>
                </motion.div>

                <motion.div variants={fadeUp}>
                  <Card title="Interests" subtitle="What excites you">
                    {Array.isArray(data.interests) && data.interests.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {data.interests.map((i) => (
                          <Badge key={i} variant="primary">
                            {i}
                          </Badge>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-zinc-500 dark:text-zinc-400">No interests added yet.</p>
                    )}
                  </Card>
                </motion.div>

                <motion.div variants={fadeUp} className="sm:col-span-2">
                  <Card
                    title="Certifications"
                    subtitle="Industry credentials you've earned"
                    header={
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                            Certifications
                          </h3>
                          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                            Industry credentials you've earned
                          </p>
                        </div>
                        <Award className="w-5 h-5 text-teal-600" />
                      </div>
                    }
                  >
                    <CertificationsManager />
                  </Card>
                </motion.div>
              </motion.div>
            )}
          </Tab.Panel>

          {/* Skills */}
          <Tab.Panel>
            {loading ? (
              <SkeletonText lines={5} />
            ) : Object.keys(skillsByCategory).length === 0 ? (
              <EmptyState
                icon={<Sparkles className="w-6 h-6" />}
                title="No skills added yet"
                description="Run the onboarding to tell us what you know — we'll match you to careers that fit."
                action={
                  <Link to="/setup/profile">
                    <Button>Start onboarding</Button>
                  </Link>
                }
              />
            ) : (
              <div className="space-y-4">
                {Object.entries(skillsByCategory).map(([category, list]) => (
                  <Card key={category}>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">
                        {skillCategoryLabel(category)}
                      </h3>
                      <Link
                        to="/retake-tests"
                        className="text-xs font-medium text-teal-700 dark:text-teal-300 hover:underline inline-flex items-center gap-1"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        Retake skills test
                      </Link>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {list.map((s) => (
                        <Badge key={s._id || s.name} variant="primary">
                          {s.name}
                        </Badge>
                      ))}
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </Tab.Panel>

          {/* Personality */}
          <Tab.Panel>
            {loading ? (
              <SkeletonText lines={5} />
            ) : (
              <div className="space-y-4">
                <MbtiCard mbtiType={data.mbtiType} mbtiScores={data.mbtiScores} />
                <Card>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                      Big Five (OCEAN)
                    </h3>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                      How you tend to engage with the world.
                    </p>
                  </div>
                  <Link
                    to="/retake-tests"
                    className="text-xs font-medium text-teal-700 dark:text-teal-300 hover:underline inline-flex items-center gap-1"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    Retake
                  </Link>
                </div>

                <div className="space-y-3">
                  {OCEAN_TRAITS.map(({ key, label }) => {
                    const score = data.oceanScore?.[key] ?? 50;
                    return (
                      <div key={key}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="font-medium text-zinc-700 dark:text-zinc-200">{label}</span>
                          <span className="tabular-nums text-zinc-500 dark:text-zinc-400">{score}</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-zinc-200/70 dark:bg-white/10 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${score}%` }}
                            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                            className="h-full rounded-full bg-teal-600"
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
                </Card>
              </div>
            )}
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </PageContainer>
  );
}

function MbtiCard({ mbtiType, mbtiScores }) {
  if (!mbtiType) {
    return (
      <Card>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
              Myers-Briggs (MBTI)
            </h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
              Discover your 4-letter type. Takes about 5 minutes.
            </p>
          </div>
          <Link to="/quiz/mbti">
            <Button leftIcon={<Sparkles className="w-4 h-4" />}>Take MBTI test</Button>
          </Link>
        </div>
      </Card>
    );
  }

  const type = MBTI_TYPES[mbtiType];
  const scores = mbtiScores || {};

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            Myers-Briggs (MBTI)
          </h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Display only — does not affect your match scores.
          </p>
        </div>
        <Link
          to="/quiz/mbti"
          className="text-xs font-medium text-teal-700 dark:text-teal-300 hover:underline inline-flex items-center gap-1"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Retake
        </Link>
      </div>

      <div className="flex items-center gap-4 mb-5">
        <div className="w-20 h-20 shrink-0 rounded-2xl grid place-items-center bg-linear-to-br from-teal-500 to-teal-700 text-white">
          <span className="text-2xl font-bold tracking-wide">{mbtiType}</span>
        </div>
        <div className="min-w-0">
          <p className="font-semibold text-zinc-900 dark:text-zinc-50">{type?.epithet || mbtiType}</p>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">{type?.description}</p>
        </div>
      </div>

      <div className="space-y-3">
        {MBTI_DIMENSIONS.map(({ pair, labels }) => {
          const [first, second] = pair;
          const firstPct = scores[first] ?? 50;
          const dominant = firstPct >= 50 ? first : second;
          return (
            <div key={pair.join('')}>
              <div className="flex justify-between text-xs mb-1">
                <span className={dominant === first ? 'font-semibold text-teal-700 dark:text-teal-300' : 'text-zinc-500 dark:text-zinc-400'}>
                  {labels[first]} {scores[first] ?? 50}%
                </span>
                <span className={dominant === second ? 'font-semibold text-teal-700 dark:text-teal-300' : 'text-zinc-500 dark:text-zinc-400'}>
                  {scores[second] ?? 50}% {labels[second]}
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-zinc-200/70 dark:bg-white/10 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${firstPct}%` }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="h-full rounded-full bg-teal-600"
                />
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

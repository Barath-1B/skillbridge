import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  Bookmark,
  BookmarkCheck,
  Sparkles,
  Layers,
  Trophy,
  AlertCircle,
} from 'lucide-react';
import api from '../api/axios';
import roadmapService from '../services/roadmap/roadmap.service';
import PageContainer from '../components/common/PageContainer';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import Skeleton from '../components/common/Skeleton';
import { useToast } from '../components/common/Toast';
import MilestoneTimeline from '../components/roadmap/MilestoneTimeline';
import ResourcesSection from '../components/roadmap/ResourcesSection';

export default function CareerBrief() {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const [brief, setBrief] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        const res = await api.get(`/roadmap/${id}`);
        if (mounted) setBrief(res.data.data);
      } catch (err) {
        if (mounted) setError(err.response?.data?.message || 'Failed to load career');
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [id]);

  const handleSave = async () => {
    if (!brief) return;
    setSaving(true);
    try {
      await api.post(`/careers/${id}/save`);
      const res = await api.get(`/roadmap/${id}`);
      setBrief(res.data.data);
      toast.success('Career path saved');
    } catch {
      toast.error('Could not save career path');
    } finally {
      setSaving(false);
    }
  };

  const handleToggle = async (phaseNum, skillName) => {
    if (!brief) return;
    // Optimistic update
    const snapshot = brief;
    setBrief((prev) => {
      if (!prev) return prev;
      const nextRoadmap = prev.roadmap.map((p) =>
        p.phase !== phaseNum
          ? p
          : {
              ...p,
              skills: p.skills.map((s) =>
                s.name === skillName ? { ...s, completed: !s.completed } : s
              ),
            }
      );
      const completedCount = nextRoadmap.reduce(
        (sum, p) => sum + p.skills.filter((s) => s.completed).length,
        0
      );
      const total = prev.progress.totalRequiredSkillCount || 1;
      return {
        ...prev,
        roadmap: nextRoadmap,
        progress: {
          ...prev.progress,
          completedSkillCount: completedCount,
          percentComplete: Math.round((completedCount / total) * 100),
        },
      };
    });

    try {
      const data = await roadmapService.toggleRoadmapItem(id, phaseNum, skillName);
      // Reconcile with server truth
      setBrief((prev) => {
        if (!prev) return prev;
        const completedKey = new Set(
          (data.completedRoadmapItems || []).map(
            (it) => `${it.phase}::${it.skillName.toLowerCase()}`
          )
        );
        return {
          ...prev,
          roadmap: prev.roadmap.map((p) => ({
            ...p,
            skills: p.skills.map((s) => ({
              ...s,
              completed: completedKey.has(`${p.phase}::${s.name.toLowerCase()}`),
            })),
          })),
          progress: {
            ...prev.progress,
            percentComplete: data.percentComplete,
            completedSkillCount: data.completedSkillCount,
            totalRequiredSkillCount: data.totalRequiredSkillCount,
          },
        };
      });
    } catch {
      setBrief(snapshot);
      toast.error('Could not update progress');
    }
  };

  if (loading) {
    return (
      <PageContainer>
        <Skeleton className="h-32 mb-4" />
        <div className="grid sm:grid-cols-2 gap-4 mb-4">
          <Skeleton className="h-28" />
          <Skeleton className="h-28" />
        </div>
        <Skeleton className="h-48" />
      </PageContainer>
    );
  }

  if (error) {
    return (
      <PageContainer>
        <Card padding="lg">
          <p className="flex items-start gap-2 text-sm text-red-600 dark:text-red-400">
            <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
            <span>{error}</span>
          </p>
          <div className="mt-4">
            <Button variant="secondary" onClick={() => navigate('/dashboard')} leftIcon={<ArrowLeft className="w-4 h-4" />}>
              Back to dashboard
            </Button>
          </div>
        </Card>
      </PageContainer>
    );
  }

  if (!brief) return null;
  const { career, analysis, roadmap, progress } = brief;

  return (
    <PageContainer>
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 text-sm font-medium text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-50 transition mb-4"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>

      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden rounded-3xl glass-card-strong p-6 sm:p-8 mb-6"
      >
        <div
          aria-hidden
          className="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-20 blur-3xl bg-teal-500"
        />
        <div className="relative">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            {career.domain && <Badge variant="neutral">{career.domain}</Badge>}
            {career.difficulty && <Badge variant="primary">{career.difficulty}</Badge>}
            {career.demand && <Badge variant="success">{career.demand} demand</Badge>}
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-zinc-50">{career.title}</h1>
          {career.description && (
            <p className="mt-3 text-zinc-600 dark:text-zinc-300 max-w-2xl">{career.description}</p>
          )}
          <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-400">
            Estimated time to bridge: <span className="font-medium text-zinc-700 dark:text-zinc-200">{career.estimatedTimeToBridge}</span>
          </p>
          <div className="mt-5">
            {progress.isSaved ? (
              <Button variant="secondary" leftIcon={<BookmarkCheck className="w-4 h-4" />} disabled>
                Saved
              </Button>
            ) : (
              <Button onClick={handleSave} loading={saving} leftIcon={<Bookmark className="w-4 h-4" />}>
                Save this path
              </Button>
            )}
          </div>
        </div>
      </motion.div>

      {/* Match + progress */}
      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <Card padding="lg">
          <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-teal-700 dark:text-teal-300 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            Your match
          </div>
          <p className="text-5xl font-extrabold gradient-text tabular-nums">{analysis.matchScore}%</p>
          <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
            Skill fit: <span className="font-medium text-zinc-700 dark:text-zinc-200">{analysis.weightedScore}%</span> · Personality:{' '}
            <span className="font-medium text-zinc-700 dark:text-zinc-200">
              {analysis.breakdown?.oceanBonus >= 0 ? '+' : ''}{analysis.breakdown?.oceanBonus ?? 0}
            </span>
          </p>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Gap: <span className="font-medium text-zinc-700 dark:text-zinc-200">{analysis.gapCount} skills</span> to learn
          </p>
          {analysis.explanation?.length > 0 && (
            <ul className="mt-3 space-y-1">
              {analysis.explanation.map((line, i) => (
                <li key={i} className="text-xs text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-teal-500 shrink-0" />
                  {line}
                </li>
              ))}
            </ul>
          )}
        </Card>
        <Card padding="lg">
          <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-teal-700 dark:text-teal-300 mb-2">
            <Layers className="w-3.5 h-3.5" />
            Your progress
          </div>
          <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
            {progress.completedSkillCount}
            <span className="text-zinc-400 font-normal">/{progress.totalRequiredSkillCount}</span>
          </p>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">skills covered</p>
          <div className="mt-3 w-full h-2 rounded-full bg-zinc-200/70 dark:bg-white/10 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress.percentComplete}%` }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="h-full rounded-full bg-teal-600"
            />
          </div>
          <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400 tabular-nums">
            {progress.percentComplete}% complete
          </p>
        </Card>
      </div>

      {/* Roadmap */}
      <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-5">Your roadmap</h2>
      <div className="mb-8">
        <MilestoneTimeline
          roadmap={roadmap}
          progress={progress}
          onToggleSkill={handleToggle}
          resources={career.resources}
        />
      </div>

      <ResourcesSection career={career} />

      {/* Advantages */}
      {Array.isArray(career.advantages) && career.advantages.length > 0 && (
        <Card padding="lg">
          <header className="flex items-center gap-2 mb-3">
            <span className="w-9 h-9 rounded-xl grid place-items-center bg-teal-500/15 text-teal-700 dark:text-teal-300">
              <Trophy className="w-4 h-4" />
            </span>
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Why this path?</h3>
          </header>
          <ul className="space-y-2">
            {career.advantages.map((adv, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-zinc-700 dark:text-zinc-200">
                <ArrowRight className="w-4 h-4 mt-0.5 text-teal-600 shrink-0" />
                <span>{adv}</span>
              </li>
            ))}
          </ul>
        </Card>
      )}
    </PageContainer>
  );
}

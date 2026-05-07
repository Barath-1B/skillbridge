import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Compass,
  Map,
  Sparkles,
  ArrowRight,
  Search,
  Bookmark,
  RotateCcw,
  AlertTriangle,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import PageContainer from '../components/common/PageContainer';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import EmptyState from '../components/common/EmptyState';
import Skeleton from '../components/common/Skeleton';
import Input from '../components/common/Input';
import { staggerParent, fadeUp } from '../utils/motion';

function greetingFor(name) {
  const h = new Date().getHours();
  const part = h < 5 ? 'evening' : h < 12 ? 'morning' : h < 18 ? 'afternoon' : 'evening';
  const first = (name || '').trim().split(/\s+/)[0] || 'there';
  return `Good ${part}, ${first}`;
}

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [careers, setCareers] = useState([]);
  const [saved, setSaved] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState('explore');
  const [query, setQuery] = useState('');

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const [careersRes, savedRes] = await Promise.all([
          api.get('/careers'),
          api.get('/roadmap'),
        ]);
        if (mounted) {
          setCareers(careersRes.data.data || []);
          setSaved(savedRes.data.data || []);
        }
      } catch (err) {
        console.error('Failed to fetch:', err);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const needsProfile = useMemo(
    () => !Array.isArray(user?.currentSkills) || user.currentSkills.length === 0,
    [user]
  );

  const filtered = useMemo(() => {
    if (!query.trim()) return careers;
    const q = query.toLowerCase();
    return careers.filter(
      (c) =>
        c.title?.toLowerCase().includes(q) ||
        c.domain?.toLowerCase().includes(q) ||
        c.difficulty?.toLowerCase().includes(q)
    );
  }, [careers, query]);

  return (
    <PageContainer size="wide">
      {/* Greeting */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden rounded-3xl p-6 sm:p-8 mb-6 glass-card-strong"
      >
        <div
          aria-hidden
          className="absolute -top-24 -right-24 w-72 h-72 rounded-full opacity-30 blur-3xl bg-teal-600"
        />
        <div className="relative">
          <p className="text-xs uppercase tracking-wider font-semibold text-teal-700 dark:text-teal-300">
            Dashboard
          </p>
          <h1 className="mt-1 text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-50">
            {greetingFor(user?.name)}
          </h1>
          <p className="mt-2 text-zinc-600 dark:text-zinc-300 max-w-xl">
            Browse career paths, follow saved roadmaps, or run a fresh analysis any time.
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            <Button
              onClick={() => navigate('/analyze')}
              leftIcon={<Sparkles className="w-4 h-4" />}
              size="md"
            >
              Run analysis
            </Button>
            <Link to="/retake-tests">
              <Button variant="secondary" size="md" leftIcon={<RotateCcw className="w-4 h-4" />}>
                Retake tests
              </Button>
            </Link>
            <Link to="/profile">
              <Button variant="ghost" size="md">
                View profile
              </Button>
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Profile completion nudge */}
      {needsProfile && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 rounded-2xl border border-amber-200 dark:border-amber-500/20 bg-amber-50/70 dark:bg-amber-500/5 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center gap-3"
        >
          <span className="w-10 h-10 rounded-xl grid place-items-center bg-amber-100 text-amber-600 dark:bg-amber-500/15 dark:text-amber-400 shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </span>
          <div className="flex-1">
            <p className="font-semibold text-zinc-900 dark:text-zinc-50">Finish setting up your profile</p>
            <p className="text-sm text-zinc-600 dark:text-zinc-300 mt-0.5">
              Add your skills and personality to unlock match scores tailored to you.
            </p>
          </div>
          <Link to="/setup/profile">
            <Button rightIcon={<ArrowRight className="w-4 h-4" />}>Complete profile</Button>
          </Link>
        </motion.div>
      )}

      {/* Tabs */}
      <div className="mb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="inline-flex p-1 rounded-2xl bg-zinc-100/70 dark:bg-white/5 border border-zinc-200/60 dark:border-white/10">
          <TabButton
            active={tab === 'explore'}
            onClick={() => setTab('explore')}
            icon={<Compass className="w-4 h-4" />}
            label="Explore paths"
            count={careers.length}
          />
          <TabButton
            active={tab === 'saved'}
            onClick={() => setTab('saved')}
            icon={<Bookmark className="w-4 h-4" />}
            label="My roadmaps"
            count={saved.length}
          />
        </div>
        {tab === 'explore' && (
          <div className="w-full sm:w-72">
            <Input
              placeholder="Search careers…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              leftIcon={<Search className="w-4 h-4" />}
            />
          </div>
        )}
      </div>

      {/* Content */}
      {loading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-44" />
          ))}
        </div>
      ) : tab === 'explore' ? (
        filtered.length === 0 ? (
          <EmptyState
            icon={<Compass className="w-6 h-6" />}
            title={query ? 'No matches for that search' : 'No career paths yet'}
            description={
              query ? 'Try a different keyword.' : 'Career paths are seeded by admins.'
            }
          />
        ) : (
          <motion.div
            variants={staggerParent}
            initial="hidden"
            animate="show"
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {filtered.map((c) => (
              <motion.div key={c._id} variants={fadeUp}>
                <Link to={`/career/${c._id}`} className="block h-full">
                  <Card padding="md" className="h-full hover:shadow-[var(--shadow-card-hover)] transition group">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 group-hover:gradient-text transition">
                        {c.title}
                      </h3>
                      {c.difficulty && (
                        <Badge variant="primary">{c.difficulty}</Badge>
                      )}
                    </div>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-3 line-clamp-2">
                      {c.description || `${c.domain || 'Career path'}`}
                    </p>
                    <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
                      <span className="inline-flex items-center gap-1">
                        <Map className="w-3.5 h-3.5" />
                        {c.estimatedTimeToBridge || c.domain || '—'}
                      </span>
                      <span className="inline-flex items-center gap-1 font-medium text-teal-700 dark:text-teal-300 group-hover:gap-2 transition-all">
                        View
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )
      ) : saved.length === 0 ? (
        <EmptyState
          icon={<Bookmark className="w-6 h-6" />}
          title="No saved roadmaps yet"
          description="Run an analysis and save a path you'd like to follow."
          action={
            <Button onClick={() => setTab('explore')}>Explore careers</Button>
          }
        />
      ) : (
        <motion.div
          variants={staggerParent}
          initial="hidden"
          animate="show"
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {saved.map((s) => (
            <motion.div key={s.career._id} variants={fadeUp}>
              <Link to={`/roadmap/${s.career._id}`} className="block h-full">
                <Card padding="md" className="h-full">
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">
                      {s.career.title}
                    </h3>
                    <Badge variant="success">{s.matchScore}%</Badge>
                  </div>
                  <div className="w-full h-2 rounded-full bg-zinc-200/70 dark:bg-white/10 overflow-hidden mb-2">
                    <div
                      className="h-full rounded-full bg-teal-600 transition-[width] duration-500"
                      style={{ width: `${s.progress?.percentComplete || 0}%` }}
                    />
                  </div>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 tabular-nums">
                    {s.progress?.completedSkillCount ?? 0}/{s.progress?.totalRequiredSkillCount ?? 0} skills •{' '}
                    {s.progress?.percentComplete ?? 0}% complete
                  </p>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      )}
    </PageContainer>
  );
}

function TabButton({ active, onClick, icon, label, count }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        'inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-sm font-medium transition',
        active
          ? 'bg-white text-zinc-900 dark:bg-white/10 dark:text-zinc-50 shadow-sm'
          : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100',
      ].join(' ')}
    >
      {icon}
      {label}
      <span
        className={[
          'inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full text-[10px] font-semibold',
          active
            ? 'bg-teal-50 text-teal-700 dark:bg-teal-500/20 dark:text-teal-300'
            : 'bg-zinc-200 text-zinc-600 dark:bg-white/10 dark:text-zinc-400',
        ].join(' ')}
      >
        {count}
      </span>
    </button>
  );
}

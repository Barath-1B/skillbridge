import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, AlertCircle, ArrowLeft } from 'lucide-react';
import api from '../api/axios';
import PageContainer from '../components/common/PageContainer';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import EmptyState from '../components/common/EmptyState';
import Skeleton from '../components/common/Skeleton';
import { staggerParent, fadeUp } from '../utils/motion';

function scoreTone(score) {
  if (score >= 70) return 'success';
  if (score >= 40) return 'warning';
  return 'danger';
}

function scoreGradient(score) {
  if (score >= 70) return 'from-emerald-400 via-teal-500 to-cyan-500';
  if (score >= 40) return 'from-amber-400 via-orange-500 to-orange-500';
  return 'from-zinc-400 via-zinc-500 to-zinc-600';
}

export default function AnalyzerResults() {
  const navigate = useNavigate();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [eligibleCount, setEligibleCount] = useState(0);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await api.get('/analyze');
        const data = res.data.data || {};
        if (mounted) {
          setResults(data.results || []);
          setEligibleCount(data.eligibleCount || 0);
        }
      } catch (err) {
        if (mounted) setError(err.response?.data?.message || 'Failed to analyze careers');
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const eligible = results.filter((r) => r.matchScore >= 20);
  const visible = showAll ? results : eligible;

  return (
    <PageContainer>
      <header className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
        <div>
          <p className="text-xs uppercase tracking-wider font-semibold text-teal-700 dark:text-teal-300">
            Career analysis
          </p>
          <h1 className="mt-1 text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-50">
            Your career matches
          </h1>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400 max-w-xl">
            Based on your skills, experience, and personality. Sorted by fit, top first.
          </p>
        </div>
        <Button
          variant="secondary"
          leftIcon={<ArrowLeft className="w-4 h-4" />}
          onClick={() => navigate('/dashboard')}
        >
          Back to dashboard
        </Button>
      </header>

      {error && (
        <div className="mb-6 rounded-2xl border border-red-200 dark:border-red-500/20 bg-red-50/70 dark:bg-red-500/5 p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-500 mt-0.5" />
          <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
        </div>
      )}

      {loading ? (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
      ) : results.length === 0 ? (
        <EmptyState
          icon={<Sparkles className="w-6 h-6" />}
          title="No career paths to analyze"
          description="Add some skills first — we'll match you against the available paths."
          action={
            <Button onClick={() => navigate('/setup/profile')}>Set up profile</Button>
          }
        />
      ) : (
        <>
          <div className="mb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-2xl glass-card p-4">
            <p className="text-sm text-zinc-700 dark:text-zinc-200">
              <span className="font-semibold">{eligibleCount}</span> viable paths (≥ 20% match) •{' '}
              <span className="font-semibold">{results.length}</span> total paths
            </p>
            <button
              type="button"
              onClick={() => setShowAll((s) => !s)}
              className="text-sm font-medium text-teal-700 dark:text-teal-300 hover:underline"
            >
              {showAll ? 'Hide low matches' : 'Show all paths'}
            </button>
          </div>

          <motion.div
            variants={staggerParent}
            initial="hidden"
            animate="show"
            className="space-y-4"
          >
            {visible.map((result) => (
              <motion.div key={result.careerPath._id} variants={fadeUp}>
                <Card
                  padding="md"
                  className={result.matchScore < 20 ? 'opacity-70' : ''}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-5 items-center">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap mb-2">
                        <h3 className="font-semibold text-lg text-zinc-900 dark:text-zinc-50">
                          {result.careerPath.title}
                        </h3>
                        {result.careerPath.domain && (
                          <Badge variant="neutral">{result.careerPath.domain}</Badge>
                        )}
                        {result.careerPath.difficulty && (
                          <Badge variant="primary">{result.careerPath.difficulty}</Badge>
                        )}
                      </div>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400">
                        Gap: <span className="font-medium text-zinc-700 dark:text-zinc-200">
                          {result.gapCount} skill{result.gapCount !== 1 ? 's' : ''}
                        </span>{' '}
                        to learn
                      </p>

                      <div className="mt-3 w-full h-2 rounded-full bg-zinc-200/70 dark:bg-white/10 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.min(result.matchScore, 100)}%` }}
                          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                          className={`h-full rounded-full bg-gradient-to-r ${scoreGradient(result.matchScore)}`}
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-4 lg:flex-col lg:items-end">
                      <div className="text-right">
                        <p className="text-3xl font-extrabold tabular-nums gradient-text">
                          {result.matchScore}%
                        </p>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 -mt-1">match</p>
                      </div>
                      {result.matchScore >= 20 ? (
                        <Button
                          size="sm"
                          rightIcon={<ArrowRight className="w-4 h-4" />}
                          onClick={() => navigate(`/career/${result.careerPath._id}`)}
                        >
                          View career
                        </Button>
                      ) : (
                        <Badge variant={scoreTone(result.matchScore)}>
                          Not yet viable
                        </Badge>
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </>
      )}
    </PageContainer>
  );
}

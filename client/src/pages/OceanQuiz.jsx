import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, AlertCircle, Sparkles, Check } from 'lucide-react';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import PageContainer from '../components/common/PageContainer';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Skeleton from '../components/common/Skeleton';

export default function OceanQuiz() {
  const navigate = useNavigate();
  const { refreshUser } = useAuth();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const advanceTimerRef = useRef(null);

  useEffect(() => () => {
    if (advanceTimerRef.current) clearTimeout(advanceTimerRef.current);
  }, []);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await api.get('/profile/ocean/questions');
        if (mounted) {
          const list = res.data.data || [];
          setQuestions(list);
          const initial = {};
          list.forEach((_, idx) => {
            initial[idx] = '';
          });
          setAnswers(initial);
        }
      } catch {
        if (mounted) setError('Failed to load questions');
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const total = questions.length;
  const answered = useMemo(
    () => Object.values(answers).filter((a) => a !== '').length,
    [answers]
  );
  const q = questions[current];
  const currentAnswer = answers[current] || '';

  const handleAnswer = (option) => {
    setAnswers((prev) => ({ ...prev, [current]: option }));
    if (advanceTimerRef.current) clearTimeout(advanceTimerRef.current);
    if (current < total - 1) {
      advanceTimerRef.current = setTimeout(() => {
        setCurrent((c) => Math.min(c + 1, total - 1));
      }, 250);
    }
  };

  const cancelAdvance = () => {
    if (advanceTimerRef.current) {
      clearTimeout(advanceTimerRef.current);
      advanceTimerRef.current = null;
    }
  };

  const goNext = () => {
    cancelAdvance();
    setCurrent((c) => Math.min(c + 1, total - 1));
  };
  const goBack = () => {
    cancelAdvance();
    setCurrent((c) => Math.max(c - 1, 0));
  };

  const handleSubmit = async () => {
    // If anything is unanswered, jump the user to the first gap instead of
    // silently doing nothing.
    const firstUnanswered = questions.findIndex((_, idx) => !answers[idx]);
    if (firstUnanswered !== -1) {
      cancelAdvance();
      setCurrent(firstUnanswered);
      setError(`Please answer question ${firstUnanswered + 1} before continuing.`);
      return;
    }
    setError('');
    setSubmitting(true);
    try {
      const answerArray = questions.map((question, idx) => ({
        questionId: question.id,
        answer: answers[idx],
      }));
      await api.post('/profile/ocean', { answers: answerArray });
      await refreshUser();
      navigate('/analyze');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save answers');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <PageContainer size="narrow">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs uppercase tracking-wider font-semibold text-teal-700 dark:text-teal-300">
            Personality · Q{Math.min(current + 1, Math.max(total, 1))} of {total || '—'}
          </p>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 tabular-nums">
            {answered}/{total} answered
          </p>
        </div>
        <div className="h-1.5 rounded-full bg-zinc-200/70 dark:bg-white/10 overflow-hidden">
          <motion.div
            initial={false}
            animate={{ width: total ? `${(answered / total) * 100}%` : '0%' }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="h-full bg-teal-600"
          />
        </div>
      </div>

      {loading ? (
        <Card padding="lg">
          <Skeleton className="h-5 w-2/3 mb-4" />
          <div className="space-y-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-12" />
            ))}
          </div>
        </Card>
      ) : !q ? (
        <Card padding="lg">
          <p className="text-sm text-zinc-500 dark:text-zinc-400">No questions available.</p>
        </Card>
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <Card padding="lg">
              <p className="text-xs uppercase tracking-wider font-semibold text-zinc-500 dark:text-zinc-400">
                Situation {current + 1}
              </p>
              <h2 className="mt-2 text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                {q.text}
              </h2>
              <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
                Pick the option that feels closest to you. There are no right answers.
              </p>

              <div className="mt-5 space-y-2">
                {q.options.map((opt) => {
                  const active = currentAnswer === opt.value;
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => handleAnswer(opt.value)}
                      className={[
                        'w-full text-left p-4 rounded-xl border transition flex items-start gap-3',
                        active
                          ? 'border-teal-500 bg-teal-500/5'
                          : 'border-zinc-200 dark:border-white/10 bg-white dark:bg-white/5 hover:border-zinc-300 dark:hover:border-white/20',
                      ].join(' ')}
                    >
                      <span
                        className={[
                          'mt-0.5 w-7 h-7 rounded-lg grid place-items-center text-xs font-bold shrink-0 transition',
                          active
                            ? 'bg-teal-600 text-white'
                            : 'bg-zinc-100 dark:bg-white/10 text-zinc-700 dark:text-zinc-200',
                        ].join(' ')}
                      >
                        {active ? <Check className="w-3.5 h-3.5" /> : opt.value}
                      </span>
                      <span className="text-sm text-zinc-700 dark:text-zinc-200">{opt.label}</span>
                    </button>
                  );
                })}
              </div>
            </Card>
          </motion.div>
        </AnimatePresence>
      )}

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
          disabled={current === 0 || submitting}
          leftIcon={<ArrowLeft className="w-4 h-4" />}
        >
          Back
        </Button>
        {current < total - 1 ? (
          <Button
            onClick={goNext}
            disabled={!currentAnswer}
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            Next
          </Button>
        ) : (
          <Button
            onClick={handleSubmit}
            disabled={submitting}
            loading={submitting}
            rightIcon={!submitting ? <Sparkles className="w-4 h-4" /> : null}
          >
            See my matches
          </Button>
        )}
      </div>
    </PageContainer>
  );
}

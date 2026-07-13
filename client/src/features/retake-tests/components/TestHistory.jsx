import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain, Compass, Briefcase, Calendar } from 'lucide-react';
import { Card, Button, Modal, Skeleton } from '../../../components/common';
import { useToast } from '../../../components/common/Toast';
import { useAuth } from '../../../context/AuthContext';
import retakeTestsService from '../../../services/retake-tests.service';

const formatDate = (dateString) => {
  if (!dateString) return 'Never taken';
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit',
  });
};

export default function TestHistory() {
  const toast = useToast();
  const navigate = useNavigate();
  const { refreshUser } = useAuth();
  const [history, setHistory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await retakeTestsService.getTestHistory();
        if (mounted) setHistory(data);
      } catch {
        if (mounted) toast.error('Failed to load test history');
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [toast]);

  const handleResetAll = async () => {
    setResetLoading(true);
    try {
      await retakeTestsService.resetAllOnboarding();
      await refreshUser();
      toast.success('Onboarding data reset');
      setConfirmOpen(false);
      navigate('/setup/profile');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Could not reset');
    } finally {
      setResetLoading(false);
    }
  };

  if (loading) return <Skeleton className="h-64" />;

  const cards = [
    { icon: Brain, title: 'Personality (OCEAN)', date: history?.lastOceanTestDate, desc: 'Your Big Five traits' },
    { icon: Compass, title: 'Personality (MBTI)', date: history?.lastMbtiTestDate, desc: 'Your Myers-Briggs type' },
    { icon: Briefcase, title: 'Skills & Experience', date: history?.lastSkillsTestDate, desc: 'Your technical and soft skills' },
    { icon: Calendar, title: 'Profile Created', date: history?.profileCreatedAt, desc: 'When you joined SkillBridge' },
  ];

  return (
    <div>
      <p className="text-sm text-zinc-600 dark:text-zinc-300 mb-4">Track when you last took each onboarding test.</p>

      <div className="grid sm:grid-cols-2 gap-4">
        {cards.map(({ icon: Icon, title, date, desc }) => (
          <Card key={title}>
            <span className="w-10 h-10 rounded-xl grid place-items-center bg-teal-500/15 text-teal-700 dark:text-teal-300 mb-3">
              <Icon className="w-5 h-5" />
            </span>
            <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">{title}</h3>
            <p className="text-sm font-medium text-teal-700 dark:text-teal-300 mt-1">{formatDate(date)}</p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">{desc}</p>
          </Card>
        ))}
      </div>

      <Card className="mt-6">
        <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">Start over</h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1 mb-3">
          Reset all your onboarding data and retake every test from the beginning.
        </p>
        <Button variant="secondary" onClick={() => setConfirmOpen(true)}>Reset all onboarding data</Button>
      </Card>

      <Modal
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        title="Reset all onboarding data?"
        description="This clears your experience, skills, and personality results. You'll go through profile setup again."
        footer={
          <>
            <Button variant="ghost" onClick={() => setConfirmOpen(false)} disabled={resetLoading}>Cancel</Button>
            <Button variant="danger" onClick={handleResetAll} loading={resetLoading}>Reset everything</Button>
          </>
        }
      />
    </div>
  );
}

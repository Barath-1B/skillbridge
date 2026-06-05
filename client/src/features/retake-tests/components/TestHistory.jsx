import { useState, useEffect } from 'react';
import { Brain, Briefcase, Calendar, CheckCircle2, AlertCircle } from 'lucide-react';
import retakeTestsService from '../../../services/retake-tests.service';

export default function TestHistory() {
  const [history, setHistory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [resetLoading, setResetLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await retakeTestsService.getTestHistory();
        if (mounted) setHistory(data);
      } catch {
        if (mounted) {
          setMessage('Failed to load test history');
          setMessageType('error');
        }
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const handleResetAll = async () => {
    if (!window.confirm('Are you sure? This will reset all your onboarding data and you\'ll need to complete the profile setup again.')) {
      return;
    }

    setResetLoading(true);
    try {
      await retakeTestsService.resetAllOnboarding();
      setMessage('All onboarding data has been reset. Redirecting...');
      setMessageType('success');

      setTimeout(() => {
        window.location.href = '/';
      }, 2000);
    } catch (err) {
      setMessage(`Error: ${err.message}`);
      setMessageType('error');
    } finally {
      setResetLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading history...</div>;

  const formatDate = (dateString) => {
    if (!dateString) return 'Never taken';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="test-history">
      <div className="history-info">
        <p>Track when you've taken your onboarding tests</p>
      </div>

      <div className="history-cards">
        <div className="history-card">
          <div className="card-icon"><Brain className="w-8 h-8" /></div>
          <h3>Personality Test (OCEAN)</h3>
          <p className="date">{formatDate(history?.lastOceanTestDate)}</p>
          <p className="description">Your Big Five personality traits</p>
        </div>

        <div className="history-card">
          <div className="card-icon"><Briefcase className="w-8 h-8" /></div>
          <h3>Skills & Experience</h3>
          <p className="date">{formatDate(history?.lastSkillsTestDate)}</p>
          <p className="description">Your technical and soft skills</p>
        </div>

        <div className="history-card">
          <div className="card-icon"><Calendar className="w-8 h-8" /></div>
          <h3>Profile Created</h3>
          <p className="date">{formatDate(history?.profileCreatedAt)}</p>
          <p className="description">When you first joined SkillBridge</p>
        </div>
      </div>

      <div className="reset-section">
        <h3>Start Over</h3>
        <p>Need a fresh start? Reset all your onboarding data and retake all tests from the beginning.</p>
        <button
          className="reset-all-btn"
          onClick={handleResetAll}
          disabled={resetLoading}
        >
          {resetLoading ? 'Resetting...' : 'Reset All Onboarding Data'}
        </button>
      </div>

      {message && (
        <div className={`message ${messageType || 'error'}`}>
          <span className="message-icon">
            {messageType === 'success' ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
          </span>
          {message}
        </div>
      )}
    </div>
  );
}

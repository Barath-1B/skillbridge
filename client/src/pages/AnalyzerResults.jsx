import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

export default function AnalyzerResults() {
  const navigate = useNavigate();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [eligibleCount, setEligibleCount] = useState(0);

  useEffect(() => {
    fetchAnalysis();
  }, []);

  const fetchAnalysis = async () => {
    try {
      const res = await api.get('/analyze');
      const data = res.data.data || {};
      setResults(data.results || []);
      setEligibleCount(data.eligibleCount || 0);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to analyze careers');
    }
    setLoading(false);
  };

  const getScoreColor = (score) => {
    if (score >= 60) return '#28a745';
    if (score >= 40) return '#ffc107';
    return '#ff9800';
  };

  const getScoreBg = (score) => {
    if (score >= 60) return '#d4edda';
    if (score >= 40) return '#fff3cd';
    return '#ffe8d0';
  };

  if (loading) return <div className="p-5">Analyzing careers...</div>;

  return (
    <div className="max-w-4xl mx-auto p-5">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Your Career Matches</h1>
          <p className="text-gray-600">
            Based on your skills, experience, and personality, here are the best career paths for you.
          </p>
        </div>
        <button
          onClick={() => navigate('/dashboard')}
          className="btn-secondary"
        >
          Go to Dashboard
        </button>
      </div>

      {error && <p className="text-red-500 mb-5">{error}</p>}

      <div className="mb-8 p-4 bg-blue-100 rounded-lg">
        <p>
          <strong>{eligibleCount} viable paths</strong> (match score ≥20%) | <strong>{results.length} total career paths</strong>
        </p>
      </div>

      <div className="grid gap-4">
        {results.map((result) => (
          <div
            key={result.careerPath._id}
            className={`card ${result.matchScore >= 20 ? '' : 'opacity-70 bg-gray-50'}`}
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-start">
              <div className="lg:col-span-2">
                <h3 className="font-bold text-lg mb-2">{result.careerPath.title}</h3>
                <p className="text-gray-600 mb-2">
                  <strong>Domain:</strong> {result.careerPath.domain} | <strong>Difficulty:</strong> {result.careerPath.difficulty}
                </p>
                <p className="text-gray-500 text-sm">
                  Gap: {result.gapCount} skill{result.gapCount !== 1 ? 's' : ''} to learn
                </p>
              </div>

              <div className="text-center">
                <div
                  className="px-6 py-5 rounded-lg mb-3"
                  style={{
                    backgroundColor: getScoreBg(result.matchScore),
                    color: getScoreColor(result.matchScore),
                  }}
                >
                  <div className="text-4xl font-bold">
                    {result.matchScore}%
                  </div>
                  <div className="text-xs">match</div>
                </div>

                {result.matchScore >= 20 ? (
                  <button
                    onClick={() => navigate(`/career/${result.careerPath._id}`)}
                    className="btn-primary text-sm py-2"
                  >
                    View Career
                  </button>
                ) : (
                  <button
                    disabled
                    className="w-full px-4 py-2 bg-gray-200 text-gray-600 rounded-lg text-sm cursor-not-allowed"
                  >
                    Not Yet Viable
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {results.length === 0 && !error && (
        <div className="text-center py-10 text-gray-600">
          <p className="text-lg font-semibold mb-2">No career paths found.</p>
          <p className="mb-4">You need to add skills to your profile before running analysis.</p>
          <button onClick={() => navigate('/setup/profile')} className="btn-primary" style={{width:'auto',display:'inline-block'}}>
            Set Up Profile
          </button>
        </div>
      )}
    </div>
  );
}

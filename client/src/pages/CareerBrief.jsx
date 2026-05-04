import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';

export default function CareerBrief() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [brief, setBrief] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchBrief();
  }, [id]);

  const fetchBrief = async () => {
    try {
      const res = await api.get(`/roadmap/${id}`);
      setBrief(res.data.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load career');
    }
    setLoading(false);
  };

  const handleSave = async () => {
    try {
      await api.post(`/careers/${id}/save`);
      fetchBrief();
      alert('Career saved!');
    } catch (err) {
      alert('Failed to save');
    }
  };

  if (loading) return <div style={{ padding: '20px' }}>Loading...</div>;
  if (error) return <div style={{ padding: '20px', color: 'red' }}>{error}</div>;
  if (!brief) return <div style={{ padding: '20px' }}>Career not found</div>;

  const { career, analysis, roadmap, progress } = brief;

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px' }}>
      <button onClick={() => navigate('/dashboard')} style={{ marginBottom: '20px', padding: '8px 16px', backgroundColor: '#6c757d', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
        ← Back
      </button>

      <div style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
        <h1>{career.title}</h1>
        <p><strong>Domain:</strong> {career.domain} | <strong>Difficulty:</strong> {career.difficulty} | <strong>Demand:</strong> {career.demand}</p>
        <p>{career.description}</p>
        <p><strong>Est. Time to Bridge:</strong> {career.estimatedTimeToBridge}</p>
        {!progress.isSaved && (
          <button onClick={handleSave} style={{ padding: '10px 20px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', marginTop: '10px' }}>
            Save This Path
          </button>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
        <div style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px' }}>
          <h3>Your Match</h3>
          <p style={{ fontSize: '32px', fontWeight: 'bold', color: analysis.matchScore >= 50 ? '#28a745' : '#ffc107' }}>{analysis.matchScore}%</p>
          <p>Weighted: {analysis.weightedScore}% | OCEAN Bonus: {analysis.oceanBonus >= 0 ? '+' : ''}{analysis.oceanBonus}%</p>
          <p><strong>Gap:</strong> {analysis.gapCount} skills to learn</p>
        </div>
        <div style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px' }}>
          <h3>Your Progress</h3>
          <p>Status: {progress.isSaved ? 'Saved' : 'Not Saved'}</p>
          <div style={{ backgroundColor: '#e9ecef', height: '24px', borderRadius: '4px', overflow: 'hidden', marginBottom: '10px' }}>
            <div style={{ backgroundColor: '#007bff', height: '100%', width: `${progress.percentComplete}%` }}></div>
          </div>
          <p>{progress.completedSkillCount}/{progress.totalRequiredSkillCount} skills ({progress.percentComplete}%)</p>
        </div>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3>Your Roadmap</h3>
        {roadmap.map((phase) => (
          <div key={phase.phase} style={{ marginBottom: '20px', border: '1px solid #ddd', padding: '15px', borderRadius: '8px' }}>
            <h4>Phase {phase.phase}: {phase.title} ({phase.milestoneMonths})</h4>
            <ul>
              {phase.skills.map((skill, idx) => (
                <li key={idx} style={{ marginBottom: '6px', color: skill.status === 'have' ? '#28a745' : '#666' }}>
                  {skill.status === 'have' ? '✓' : '○'} {skill.name}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div style={{ backgroundColor: '#f0f8ff', padding: '15px', borderRadius: '8px' }}>
        <h3>Why This Path?</h3>
        <ul>
          {career.advantages.map((adv, idx) => (
            <li key={idx} style={{ marginBottom: '8px' }}>{adv}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

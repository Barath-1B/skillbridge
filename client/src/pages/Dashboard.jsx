import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [careers, setCareers] = useState([]);
  const [saved, setSaved] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState('explore');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [careersRes, savedRes] = await Promise.all([
        api.get('/careers'),
        api.get('/roadmap'),
      ]);
      setCareers(careersRes.data.data || []);
      setSaved(savedRes.data.data || []);
    } catch (err) {
      console.error('Failed to fetch:', err);
    }
    setLoading(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (loading) return <div style={{ padding: '20px' }}>Loading...</div>;

  const needsProfile = user?.currentSkills?.length === 0;

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1>SkillBridge</h1>
        <div>
          <span style={{ marginRight: '20px' }}>Hi, {user?.name}!</span>
          <button onClick={handleLogout} style={{ padding: '8px 16px', backgroundColor: '#dc3545', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            Logout
          </button>
        </div>
      </div>

      {needsProfile && (
        <div style={{ backgroundColor: '#fff3cd', border: '1px solid #ffc107', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
          <p style={{ margin: '0 0 10px 0' }}>
            <strong>🚀 Get started:</strong> Complete your profile to see career matches tailored to you.
          </p>
          <button
            onClick={() => window.location.href = '/setup/profile'}
            style={{
              padding: '8px 16px',
              backgroundColor: '#ffc107',
              color: '#000',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: 'bold',
            }}
          >
            Complete Profile →
          </button>
        </div>
      )}

      <div style={{ marginBottom: '20px' }}>
        <button
          onClick={() => setTab('explore')}
          style={{ padding: '10px 20px', marginRight: '10px', backgroundColor: tab === 'explore' ? '#007bff' : '#e9ecef', cursor: 'pointer', border: 'none', borderRadius: '4px' }}
        >
          Explore Paths ({careers.length})
        </button>
        <button
          onClick={() => setTab('saved')}
          style={{ padding: '10px 20px', backgroundColor: tab === 'saved' ? '#007bff' : '#e9ecef', cursor: 'pointer', border: 'none', borderRadius: '4px' }}
        >
          My Roadmaps ({saved.length})
        </button>
      </div>

      {tab === 'explore' && (
        <div>
          <h3>All Career Paths</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
            {careers.map((c) => (
              <div key={c._id} style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px' }}>
                <h4>{c.title}</h4>
                <p><strong>Domain:</strong> {c.domain}</p>
                <p><strong>Difficulty:</strong> {c.difficulty}</p>
                <p><strong>Time:</strong> {c.estimatedTimeToBridge}</p>
                <Link to={`/career/${c._id}`} style={{ color: '#007bff', textDecoration: 'none', fontWeight: 'bold' }}>
                  View Details →
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'saved' && (
        <div>
          <h3>Your Saved Roadmaps</h3>
          {saved.length === 0 ? (
            <p>No saved paths yet. <Link to="#" onClick={() => setTab('explore')} style={{ color: '#007bff' }}>Explore careers</Link> to get started!</p>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
              {saved.map((s) => (
                <div key={s.career._id} style={{ border: '2px solid #28a745', padding: '15px', borderRadius: '8px' }}>
                  <h4>{s.career.title}</h4>
                  <p><strong>Match Score:</strong> {s.matchScore}%</p>
                  <p><strong>Progress:</strong> {s.progress.percentComplete}%</p>
                  <div style={{ backgroundColor: '#e9ecef', height: '20px', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ backgroundColor: '#28a745', height: '100%', width: `${s.progress.percentComplete}%` }}></div>
                  </div>
                  <p style={{ fontSize: '12px', marginTop: '8px' }}>{s.progress.completedSkillCount}/{s.progress.totalRequiredSkillCount} skills</p>
                  <Link to={`/roadmap/${s.career._id}`} style={{ color: '#007bff', textDecoration: 'none', fontWeight: 'bold' }}>
                    View Roadmap →
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

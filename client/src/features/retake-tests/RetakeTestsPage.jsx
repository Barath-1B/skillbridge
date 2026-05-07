import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RetakeOceanTest from './components/RetakeOceanTest';
import RetakeSkillsTest from './components/RetakeSkillsTest';
import TestHistory from './components/TestHistory';
import './retake-tests.css';

export default function RetakeTestsPage() {
  const [activeTab, setActiveTab] = useState('ocean');
  const navigate = useNavigate();

  return (
    <div className="retake-tests-container">
      <div className="retake-tests-header">
        <div className="header-content">
          <h1>Retake Tests</h1>
          <p>Update your profile by retaking any onboarding test</p>
        </div>
        <button onClick={() => navigate(-1)} className="back-button">
          ← Back
        </button>
      </div>

      <div className="retake-tabs">
        <button
          className={`tab-btn ${activeTab === 'ocean' ? 'active' : ''}`}
          onClick={() => setActiveTab('ocean')}
        >
          <span className="tab-icon">🧠</span>
          Personality Test
        </button>
        <button
          className={`tab-btn ${activeTab === 'skills' ? 'active' : ''}`}
          onClick={() => setActiveTab('skills')}
        >
          <span className="tab-icon">💼</span>
          Skills & Experience
        </button>
        <button
          className={`tab-btn ${activeTab === 'history' ? 'active' : ''}`}
          onClick={() => setActiveTab('history')}
        >
          <span className="tab-icon">📋</span>
          Test History
        </button>
      </div>

      <div className="retake-content">
        {activeTab === 'ocean' && <RetakeOceanTest />}
        {activeTab === 'skills' && <RetakeSkillsTest />}
        {activeTab === 'history' && <TestHistory />}
      </div>
    </div>
  );
}

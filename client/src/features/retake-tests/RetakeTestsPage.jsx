import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain, Compass, Briefcase, ClipboardList, ArrowLeft } from 'lucide-react';
import RetakeOceanTest from './components/RetakeOceanTest';
import RetakeMbtiTest from './components/RetakeMbtiTest';
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
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
      </div>

      <div className="retake-tabs">
        <button
          className={`tab-btn ${activeTab === 'ocean' ? 'active' : ''}`}
          onClick={() => setActiveTab('ocean')}
        >
          <span className="tab-icon"><Brain className="w-5 h-5" /></span>
          Personality (OCEAN)
        </button>
        <button
          className={`tab-btn ${activeTab === 'mbti' ? 'active' : ''}`}
          onClick={() => setActiveTab('mbti')}
        >
          <span className="tab-icon"><Compass className="w-5 h-5" /></span>
          Personality (MBTI)
        </button>
        <button
          className={`tab-btn ${activeTab === 'skills' ? 'active' : ''}`}
          onClick={() => setActiveTab('skills')}
        >
          <span className="tab-icon"><Briefcase className="w-5 h-5" /></span>
          Skills & Experience
        </button>
        <button
          className={`tab-btn ${activeTab === 'history' ? 'active' : ''}`}
          onClick={() => setActiveTab('history')}
        >
          <span className="tab-icon"><ClipboardList className="w-5 h-5" /></span>
          Test History
        </button>
      </div>

      <div className="retake-content">
        {activeTab === 'ocean' && <RetakeOceanTest />}
        {activeTab === 'mbti' && <RetakeMbtiTest />}
        {activeTab === 'skills' && <RetakeSkillsTest />}
        {activeTab === 'history' && <TestHistory />}
      </div>
    </div>
  );
}

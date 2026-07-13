import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain, Compass, Briefcase, ClipboardList, ArrowLeft } from 'lucide-react';
import { PageContainer, Button } from '../../components/common';
import RetakeOceanTest from './components/RetakeOceanTest';
import RetakeMbtiTest from './components/RetakeMbtiTest';
import RetakeSkillsTest from './components/RetakeSkillsTest';
import TestHistory from './components/TestHistory';

const TABS = [
  { key: 'ocean', label: 'Personality (OCEAN)', icon: Brain },
  { key: 'mbti', label: 'Personality (MBTI)', icon: Compass },
  { key: 'skills', label: 'Skills', icon: Briefcase },
  { key: 'history', label: 'History', icon: ClipboardList },
];

export default function RetakeTestsPage() {
  const [activeTab, setActiveTab] = useState('ocean');
  const navigate = useNavigate();

  return (
    <PageContainer size="narrow">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-50">Retake tests</h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Update your profile by retaking any onboarding test.
          </p>
        </div>
        <Button variant="ghost" size="sm" onClick={() => navigate(-1)} leftIcon={<ArrowLeft className="w-4 h-4" />}>
          Back
        </Button>
      </div>

      <div className="flex flex-wrap gap-1 p-1 mb-6 rounded-2xl bg-zinc-100/70 dark:bg-white/5 border border-zinc-200/60 dark:border-white/10">
        {TABS.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            type="button"
            onClick={() => setActiveTab(key)}
            className={[
              'inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-xl transition',
              activeTab === key
                ? 'bg-white text-zinc-900 dark:bg-white/10 dark:text-zinc-50 shadow-sm'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100',
            ].join(' ')}
          >
            <Icon className="w-4 h-4" />
            {label}
          </button>
        ))}
      </div>

      {activeTab === 'ocean' && <RetakeOceanTest />}
      {activeTab === 'mbti' && <RetakeMbtiTest />}
      {activeTab === 'skills' && <RetakeSkillsTest />}
      {activeTab === 'history' && <TestHistory />}
    </PageContainer>
  );
}

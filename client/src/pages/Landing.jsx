import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Button } from '../components/common';

export default function Landing() {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Find your gap. Bridge it.
        </h1>
        <p className="text-2xl text-gray-600 mb-12">
          Discover your career path. Master the skills. Achieve your goals.
        </p>

        {/* CTA Button */}
        <Button
          onClick={() => navigate(user ? '/dashboard' : '/setup/profile')}
          className="mx-auto mb-20 w-auto"
        >
          {user ? 'Go to Dashboard' : 'Start Your Journey'}
        </Button>

        {/* 3-Step Explainer */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="card">
            <div className="text-4xl font-bold text-blue-500 mb-4">1</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Tell Us About You</h3>
            <p className="text-gray-600">
              Share your skills, experience, and personality. We'll understand your profile.
            </p>
          </div>
          <div className="card">
            <div className="text-4xl font-bold text-blue-500 mb-4">2</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Get Analyzed</h3>
            <p className="text-gray-600">
              We match you against career paths and calculate your fit score instantly.
            </p>
          </div>
          <div className="card">
            <div className="text-4xl font-bold text-blue-500 mb-4">3</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Follow Your Roadmap</h3>
            <p className="text-gray-600">
              Get a personalized step-by-step roadmap to reach your career goal.
            </p>
          </div>
        </div>

        {/* Features */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Why SkillBridge?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">⚡ Instant Analysis</h4>
              <p className="text-gray-600">Get match scores in seconds</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">📊 Data Driven</h4>
              <p className="text-gray-600">Based on career market trends</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">🎯 Personalized</h4>
              <p className="text-gray-600">Tailored roadmaps for you</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

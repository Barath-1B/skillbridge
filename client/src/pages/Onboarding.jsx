import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

export default function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [experience, setExperience] = useState('');
  const [skillIds, setSkillIds] = useState([]);
  const [skills, setSkills] = useState([]);
  const [oceanAnswers, setOceanAnswers] = useState({});
  const [oceanQuestions, setOceanQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      const [skillsRes, oceanRes] = await Promise.all([
        api.get('/profile/skills'),
        api.get('/profile/ocean/questions'),
      ]);
      setSkills(skillsRes.data.data || []);
      setOceanQuestions(oceanRes.data.data || []);

      // Initialize OCEAN answers
      const initialAnswers = {};
      (oceanRes.data.data || []).forEach((_, idx) => {
        initialAnswers[idx] = '';
      });
      setOceanAnswers(initialAnswers);
    } catch (err) {
      setError('Failed to load wizard data');
    }
    setLoading(false);
  };

  const toggleSkill = (skillId) => {
    setSkillIds((prev) =>
      prev.includes(skillId) ? prev.filter((id) => id !== skillId) : [...prev, skillId]
    );
  };

  const handleOceanAnswer = (questionIdx, option) => {
    setOceanAnswers((prev) => ({
      ...prev,
      [questionIdx]: option,
    }));
  };

  const validateStep = () => {
    if (step === 1) {
      if (!experience) {
        setError('Please select your experience level');
        return false;
      }
    } else if (step === 2) {
      if (skillIds.length === 0) {
        setError('Please select at least one skill');
        return false;
      }
    } else if (step === 3) {
      const allAnswered = Object.values(oceanAnswers).every((a) => a !== '');
      if (!allAnswered) {
        setError('Please answer all personality questions');
        return false;
      }
    }
    setError('');
    return true;
  };

  const handleNext = () => {
    if (validateStep()) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleComplete = async () => {
    if (!validateStep()) return;

    setSubmitting(true);
    try {
      // Save profile
      await api.put('/profile', { experience, skillIds });

      // Save OCEAN answers
      const answerArray = oceanQuestions.map((_, idx) => ({
        questionId: idx + 1,
        answer: oceanAnswers[idx],
      }));
      await api.post('/profile/ocean', { answers: answerArray });

      // Redirect to results
      navigate('/analyze');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to complete onboarding');
    }
    setSubmitting(false);
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <p>Loading wizard...</p>
      </div>
    );
  }

  const skillsByCategory = {};
  skills.forEach((skill) => {
    if (!skillsByCategory[skill.category]) {
      skillsByCategory[skill.category] = [];
    }
    skillsByCategory[skill.category].push(skill);
  });

  const totalSteps = 4;
  const progressPercent = (step / totalSteps) * 100;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa', padding: '20px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '30px', textAlign: 'center' }}>
          <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '10px' }}>
            Complete Your Profile
          </h1>
          <p style={{ color: '#666', marginBottom: '20px' }}>
            Step {step} of {totalSteps}
          </p>

          {/* Progress Bar */}
          <div style={{ backgroundColor: '#e9ecef', height: '8px', borderRadius: '4px', overflow: 'hidden', marginBottom: '30px' }}>
            <div
              style={{
                backgroundColor: '#007bff',
                height: '100%',
                width: `${progressPercent}%`,
                transition: 'width 0.3s ease',
              }}
            />
          </div>
        </div>

        {error && (
          <div
            style={{
              backgroundColor: '#f8d7da',
              color: '#721c24',
              padding: '12px',
              borderRadius: '4px',
              marginBottom: '20px',
              border: '1px solid #f5c6cb',
            }}
          >
            {error}
          </div>
        )}

        {/* Step 1: Welcome & Experience */}
        {step === 1 && (
          <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '8px' }}>
            <h2 style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '20px' }}>
              Welcome to SkillBridge!
            </h2>
            <p style={{ color: '#666', marginBottom: '20px', lineHeight: '1.6' }}>
              We're excited to help you discover your ideal career path. First, let's understand your experience level.
            </p>

            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '10px' }}>
              What's your professional experience level? *
            </label>
            <select
              value={experience}
              onChange={(e) => {
                setExperience(e.target.value);
                setError('');
              }}
              style={{
                width: '100%',
                padding: '12px',
                fontSize: '16px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                marginBottom: '20px',
              }}
            >
              <option value="">-- Select an option --</option>
              <option value="student">Student (No professional experience)</option>
              <option value="0-1yr">0-1 year of professional experience</option>
              <option value="1-3yr">1-3 years of professional experience</option>
              <option value="3+yr">3+ years of professional experience</option>
            </select>

            {experience && (
              <div style={{ backgroundColor: '#e3f2fd', padding: '15px', borderRadius: '4px', marginBottom: '20px' }}>
                <p style={{ margin: 0, color: '#007bff', fontWeight: 'bold' }}>
                  Selected: {experience === 'student' ? 'Student' : `${experience} of experience`}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Step 2: Skill Selection */}
        {step === 2 && (
          <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '8px' }}>
            <h2 style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '20px' }}>
              Select Your Skills
            </h2>
            <p style={{ color: '#666', marginBottom: '20px', lineHeight: '1.6' }}>
              Choose all the skills you currently possess. We have {skills.length} skills across different categories.
            </p>

            {Object.entries(skillsByCategory).map(([category, categorySkills]) => (
              <div key={category} style={{ marginBottom: '25px' }}>
                <h4 style={{ textTransform: 'capitalize', color: '#555', marginBottom: '12px', fontWeight: 'bold' }}>
                  {category} ({categorySkills.length})
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '10px' }}>
                  {categorySkills.map((skill) => (
                    <label
                      key={skill._id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: '10px',
                        backgroundColor: skillIds.includes(skill._id) ? '#e3f2fd' : '#f5f5f5',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        border: skillIds.includes(skill._id) ? '2px solid #007bff' : '1px solid #ddd',
                        transition: 'all 0.2s',
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={skillIds.includes(skill._id)}
                        onChange={() => toggleSkill(skill._id)}
                        style={{ marginRight: '8px', cursor: 'pointer' }}
                      />
                      <span style={{ fontSize: '14px' }}>{skill.name}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}

            <div style={{ backgroundColor: '#e3f2fd', padding: '12px', borderRadius: '4px', marginTop: '20px' }}>
              <p style={{ margin: 0, color: '#007bff', fontWeight: 'bold' }}>
                Selected: {skillIds.length} skill{skillIds.length !== 1 ? 's' : ''}
              </p>
            </div>
          </div>
        )}

        {/* Step 3: OCEAN Quiz */}
        {step === 3 && (
          <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '8px' }}>
            <h2 style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '20px' }}>
              Personality Assessment
            </h2>
            <p style={{ color: '#666', marginBottom: '20px', lineHeight: '1.6' }}>
              Answer 12 quick questions about your personality. There are no right or wrong answers! This helps us understand your working style and preferences.
            </p>

            {oceanQuestions.map((q, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: '#f9f9f9',
                  padding: '15px',
                  marginBottom: '15px',
                  borderRadius: '8px',
                  border: '1px solid #eee',
                }}
              >
                <h4 style={{ marginBottom: '12px', fontSize: '14px', color: '#333' }}>
                  Q{idx + 1}. {q.text}
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {q.options.map((opt) => (
                    <label
                      key={opt.value}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        padding: '10px',
                        backgroundColor: oceanAnswers[idx] === opt.value ? '#e3f2fd' : '#fff',
                        borderRadius: '4px',
                        border: oceanAnswers[idx] === opt.value ? '2px solid #007bff' : '1px solid #ddd',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                      }}
                    >
                      <input
                        type="radio"
                        name={`question-${idx}`}
                        value={opt.value}
                        checked={oceanAnswers[idx] === opt.value}
                        onChange={() => handleOceanAnswer(idx, opt.value)}
                        style={{ marginRight: '10px', cursor: 'pointer', marginTop: '2px' }}
                      />
                      <span style={{ fontSize: '14px' }}>{opt.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}

            <div style={{ backgroundColor: '#e3f2fd', padding: '12px', borderRadius: '4px', marginTop: '20px' }}>
              <p style={{ margin: 0, color: '#007bff', fontWeight: 'bold' }}>
                Answered: {Object.values(oceanAnswers).filter((a) => a !== '').length}/{oceanQuestions.length}
              </p>
            </div>
          </div>
        )}

        {/* Step 4: Summary */}
        {step === 4 && (
          <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '8px' }}>
            <h2 style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '20px' }}>
              Review Your Profile
            </h2>

            <div style={{ marginBottom: '25px' }}>
              <h4 style={{ fontWeight: 'bold', marginBottom: '10px', color: '#007bff' }}>Experience Level</h4>
              <p style={{ color: '#666' }}>
                {experience === 'student' ? 'Student' : `${experience} of professional experience`}
              </p>
            </div>

            <div style={{ marginBottom: '25px' }}>
              <h4 style={{ fontWeight: 'bold', marginBottom: '10px', color: '#007bff' }}>Skills</h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {skillIds.map((skillId) => {
                  const skill = skills.find((s) => s._id === skillId);
                  return skill ? (
                    <span
                      key={skillId}
                      style={{
                        backgroundColor: '#e3f2fd',
                        color: '#007bff',
                        padding: '6px 12px',
                        borderRadius: '20px',
                        fontSize: '14px',
                        fontWeight: 'bold',
                      }}
                    >
                      {skill.name}
                    </span>
                  ) : null;
                })}
              </div>
              <p style={{ color: '#666', marginTop: '10px', fontSize: '14px' }}>
                Total: {skillIds.length} skill{skillIds.length !== 1 ? 's' : ''}
              </p>
            </div>

            <div style={{ marginBottom: '25px' }}>
              <h4 style={{ fontWeight: 'bold', marginBottom: '10px', color: '#007bff' }}>Personality Assessment</h4>
              <p style={{ color: '#666' }}>
                Completed: {Object.values(oceanAnswers).filter((a) => a !== '').length}/{oceanQuestions.length} questions
              </p>
            </div>

            <div style={{ backgroundColor: '#f0fff4', padding: '15px', borderRadius: '8px' }}>
              <p style={{ margin: 0, color: '#28a745', fontWeight: 'bold' }}>
                ✓ You're all set! Click "Run Analysis" to see your career matches.
              </p>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '15px', marginTop: '30px' }}>
          <button
            onClick={handleBack}
            disabled={step === 1}
            style={{
              padding: '12px 30px',
              backgroundColor: step === 1 ? '#e9ecef' : '#6c757d',
              color: step === 1 ? '#999' : '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: step === 1 ? 'not-allowed' : 'pointer',
              fontWeight: 'bold',
              fontSize: '16px',
            }}
          >
            ← Back
          </button>

          {step < totalSteps ? (
            <button
              onClick={handleNext}
              style={{
                padding: '12px 30px',
                backgroundColor: '#007bff',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '16px',
                transition: 'background-color 0.2s',
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = '#0056b3')}
              onMouseOut={(e) => (e.target.style.backgroundColor = '#007bff')}
            >
              Next →
            </button>
          ) : (
            <button
              onClick={handleComplete}
              disabled={submitting}
              style={{
                padding: '12px 30px',
                backgroundColor: '#28a745',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: submitting ? 'not-allowed' : 'pointer',
                fontWeight: 'bold',
                fontSize: '16px',
                transition: 'background-color 0.2s',
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = '#218838')}
              onMouseOut={(e) => (e.target.style.backgroundColor = '#28a745')}
            >
              {submitting ? 'Analyzing...' : 'Run Analysis →'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

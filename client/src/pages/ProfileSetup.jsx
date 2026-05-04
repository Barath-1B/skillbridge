import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

export default function ProfileSetup() {
  const navigate = useNavigate();
  const [experience, setExperience] = useState('');
  const [skillIds, setSkillIds] = useState([]);
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const res = await api.get('/profile/skills');
      setSkills(res.data.data || []);
    } catch (err) {
      setError('Failed to load skills');
    }
    setLoading(false);
  };

  const toggleSkill = (skillId) => {
    setSkillIds((prev) =>
      prev.includes(skillId) ? prev.filter((id) => id !== skillId) : [...prev, skillId]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!experience) {
      setError('Please select your experience level');
      return;
    }
    if (skillIds.length === 0) {
      setError('Please select at least one skill');
      return;
    }

    setSaving(true);
    try {
      await api.put('/profile', { experience, skillIds });
      navigate('/setup/ocean');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save profile');
    }
    setSaving(false);
  };

  if (loading) return <div className="p-5">Loading skills...</div>;

  const skillsByCategory = {};
  skills.forEach((skill) => {
    if (!skillsByCategory[skill.category]) {
      skillsByCategory[skill.category] = [];
    }
    skillsByCategory[skill.category].push(skill);
  });

  return (
    <div className="max-w-3xl mx-auto p-5">
      <h1 className="text-3xl font-bold mb-3">Complete Your Profile</h1>
      <p className="text-gray-600 mb-5">
        Tell us about your experience and select the skills you have.
      </p>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit}>
        <div className="mb-8">
          <label className="block font-bold mb-2">
            Experience Level *
          </label>
          <select
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            className="input-field"
          >
            <option value="">-- Select --</option>
            <option value="student">Student</option>
            <option value="0-1yr">0-1 year</option>
            <option value="1-3yr">1-3 years</option>
            <option value="3+yr">3+ years</option>
          </select>
        </div>

        <div className="mb-8">
          <label className="block font-bold mb-4">
            Your Skills * (select at least {skillIds.length === 0 ? '1' : skillIds.length})
          </label>

          {Object.entries(skillsByCategory).map(([category, categorySkills]) => (
            <div key={category} className="mb-6">
              <h4 className="capitalize text-gray-600 mb-3 font-semibold">
                {category}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                {categorySkills.map((skill) => (
                  <label
                    key={skill._id}
                    className={`flex items-center p-2 rounded-lg cursor-pointer transition-all ${
                      skillIds.includes(skill._id)
                        ? 'bg-blue-100 border-2 border-blue-500'
                        : 'bg-gray-100 border border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={skillIds.includes(skill._id)}
                      onChange={() => toggleSkill(skill._id)}
                      className="mr-2 cursor-pointer"
                    />
                    {skill.name}
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>

        <button
          type="submit"
          disabled={saving}
          className="btn-primary"
        >
          {saving ? 'Saving...' : 'Continue to Personality Quiz'}
        </button>
      </form>
    </div>
  );
}

import { useState, useEffect } from 'react';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import retakeTestsService from '../../../services/retake-tests.service';
import { SKILL_CATEGORIES, SKILL_CATEGORY_LABELS } from '../../../constants/skillCategories';

export default function RetakeSkillsTest() {
  const [skills, setSkills] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [activeCategory, setActiveCategory] = useState(SKILL_CATEGORIES[0]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await retakeTestsService.getSkills();
        if (mounted) setSkills(data);
      } catch {
        if (mounted) {
          setMessage('Failed to load skills');
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

  const toggleSkill = (skillId) => {
    setSelectedSkills(prev =>
      prev.includes(skillId)
        ? prev.filter(id => id !== skillId)
        : [...prev, skillId]
    );
  };

  const handleSubmit = async () => {
    if (selectedSkills.length === 0) {
      setMessage('Please select at least one skill');
      setMessageType('error');
      return;
    }

    setSubmitting(true);
    try {
      await retakeTestsService.retakeSkillsTest(selectedSkills);
      setMessage('Skills updated successfully!');
      setMessageType('success');

      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (err) {
      setMessage(`Error: ${err.message}`);
      setMessageType('error');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="loading">Loading skills...</div>;

  const categories = SKILL_CATEGORIES;
  const categoryLabels = SKILL_CATEGORY_LABELS;

  const filteredSkills = skills.filter(s => s.category === activeCategory);

  return (
    <div className="skills-test">
      <div className="skills-header">
        <p>Select the skills and knowledge areas you have:</p>
        <p className="selected-count">
          {selectedSkills.length} selected
        </p>
      </div>

      <div className="category-tabs">
        {categories.map(cat => (
          <button
            key={cat}
            className={`category-tab ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat)}
          >
            {categoryLabels[cat]}
          </button>
        ))}
      </div>

      <div className="skills-grid">
        {filteredSkills.length > 0 ? (
          filteredSkills.map(skill => (
            <label key={skill._id} className="skill-chip">
              <input
                type="checkbox"
                checked={selectedSkills.includes(skill._id)}
                onChange={() => toggleSkill(skill._id)}
              />
              <span>{skill.name}</span>
            </label>
          ))
        ) : (
          <p className="no-skills">No {categoryLabels[activeCategory].toLowerCase()} available</p>
        )}
      </div>

      <div className="action-buttons">
        <button
          className="reset-btn"
          onClick={() => setSelectedSkills([])}
        >
          Clear All
        </button>
        <button
          className="submit-btn"
          onClick={handleSubmit}
          disabled={selectedSkills.length === 0 || submitting}
        >
          {submitting ? 'Updating...' : 'Update Skills'}
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

import { useState, useEffect } from 'react';

export default function CareerForm({ career, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    title: '',
    domain: '',
    difficulty: 'Intermediate',
    demand: 'Medium',
    description: '',
  });

  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (career) {
      setFormData({
        title: career.title || '',
        domain: career.domain || '',
        difficulty: career.difficulty || 'Intermediate',
        demand: career.demand || 'Medium',
        description: career.description || '',
      });
    }
  }, [career]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.domain.trim()) newErrors.domain = 'Domain is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSaving(true);
    try {
      await onSave(formData);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: '1000',
      }}
    >
      <div
        style={{
          backgroundColor: '#fff',
          borderRadius: '8px',
          padding: '30px',
          maxWidth: '500px',
          width: '90%',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
        }}
      >
        <h2 style={{ marginTop: '0' }}>{career ? 'Edit Career Path' : 'Create New Career Path'}</h2>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '8px',
                border: errors.title ? '2px solid #dc3545' : '1px solid #ddd',
                borderRadius: '4px',
                boxSizing: 'border-box',
              }}
            />
            {errors.title && <p style={{ color: '#dc3545', fontSize: '12px', margin: '5px 0 0 0' }}>{errors.title}</p>}
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Domain</label>
            <input
              type="text"
              name="domain"
              value={formData.domain}
              onChange={handleChange}
              placeholder="e.g., Data Science, DevOps"
              style={{
                width: '100%',
                padding: '8px',
                border: errors.domain ? '2px solid #dc3545' : '1px solid #ddd',
                borderRadius: '4px',
                boxSizing: 'border-box',
              }}
            />
            {errors.domain && <p style={{ color: '#dc3545', fontSize: '12px', margin: '5px 0 0 0' }}>{errors.domain}</p>}
          </div>

          <div style={{ marginBottom: '15px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Difficulty</label>
              <select
                name="difficulty"
                value={formData.difficulty}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  boxSizing: 'border-box',
                }}
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Demand</label>
              <select
                name="demand"
                value={formData.demand}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  boxSizing: 'border-box',
                }}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              style={{
                width: '100%',
                padding: '8px',
                border: errors.description ? '2px solid #dc3545' : '1px solid #ddd',
                borderRadius: '4px',
                boxSizing: 'border-box',
                fontFamily: 'Arial, sans-serif',
              }}
            />
            {errors.description && <p style={{ color: '#dc3545', fontSize: '12px', margin: '5px 0 0 0' }}>{errors.description}</p>}
          </div>

          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
            <button
              type="button"
              onClick={onCancel}
              style={{
                padding: '10px 20px',
                backgroundColor: '#6c757d',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              style={{
                padding: '10px 20px',
                backgroundColor: '#28a745',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: saving ? 'not-allowed' : 'pointer',
                opacity: saving ? 0.6 : 1,
                fontWeight: 'bold',
              }}
            >
              {saving ? 'Saving...' : career ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

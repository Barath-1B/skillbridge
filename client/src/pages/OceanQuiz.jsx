import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

export default function OceanQuiz() {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const res = await api.get('/profile/ocean/questions');
      setQuestions(res.data.data || []);
      const initialAnswers = {};
      (res.data.data || []).forEach((q, idx) => {
        initialAnswers[idx] = '';
      });
      setAnswers(initialAnswers);
    } catch (err) {
      setError('Failed to load questions');
    }
    setLoading(false);
  };

  const handleAnswer = (questionIdx, option) => {
    setAnswers((prev) => ({
      ...prev,
      [questionIdx]: option,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const allAnswered = Object.values(answers).every((a) => a !== '');
    if (!allAnswered) {
      setError('Please answer all questions');
      return;
    }

    setSubmitting(true);
    try {
      const answerArray = questions.map((_, idx) => ({
        questionId: idx + 1,
        answer: answers[idx],
      }));
      await api.post('/profile/ocean', { answers: answerArray });
      navigate('/analyze');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save answers');
    }
    setSubmitting(false);
  };

  if (loading) return <div className="p-5">Loading questions...</div>;

  const answered = Object.values(answers).filter((a) => a !== '').length;

  return (
    <div className="max-w-4xl mx-auto p-5">
      <h1 className="text-3xl font-bold mb-3">Personality Quiz</h1>
      <p className="text-gray-600 mb-5">
        Answer 12 situational questions to help us understand your personality. No right or wrong answers!
      </p>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <p className="text-gray-400 mb-5">
        Answered: {answered}/{questions.length}
      </p>

      <form onSubmit={handleSubmit}>
        {questions.map((q, idx) => (
          <div
            key={idx}
            className="bg-gray-50 p-5 mb-5 rounded-lg border border-gray-200"
          >
            <h4 className="mb-4 font-semibold">
              Q{idx + 1}. {q.text}
            </h4>
            <div className="flex flex-col gap-3">
              {q.options.map((opt) => (
                <label
                  key={opt.value}
                  className={`flex items-start p-3 rounded-lg cursor-pointer transition-all ${
                    answers[idx] === opt.value
                      ? 'bg-blue-100 border-2 border-blue-500'
                      : 'bg-white border border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <input
                    type="radio"
                    name={`question-${idx}`}
                    value={opt.value}
                    checked={answers[idx] === opt.value}
                    onChange={() => handleAnswer(idx, opt.value)}
                    className="mr-3 cursor-pointer mt-0.5"
                  />
                  <span>{opt.label}</span>
                </label>
              ))}
            </div>
          </div>
        ))}

        <button
          type="submit"
          disabled={submitting}
          className="btn-success"
        >
          {submitting ? 'Analyzing...' : 'See My Career Matches'}
        </button>
      </form>
    </div>
  );
}

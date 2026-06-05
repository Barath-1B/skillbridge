import { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';
import retakeTestsService from '../../../services/retake-tests.service';

export default function RetakeOceanTest() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState(0);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await retakeTestsService.getOceanQuestions();
        if (mounted) setQuestions(data);
      } catch {
        if (mounted) {
          setMessage('Failed to load questions');
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

  const handleAnswer = (questionId, answer) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleSubmit = async () => {
    if (Object.keys(answers).length !== questions.length) {
      setMessage('Please answer all questions');
      setMessageType('error');
      return;
    }

    setSubmitting(true);
    try {
      const answerArray = Object.entries(answers).map(([questionId, answer]) => ({
        questionId: parseInt(questionId),
        answer
      }));

      await retakeTestsService.retakeOceanTest(answerArray);
      setMessage('Personality test completed! Your profile has been updated.');
      setMessageType('success');
      setAnswers({});
      setCurrentQuestion(0);

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

  if (loading) return <div className="loading">Loading questions...</div>;

  const question = questions[currentQuestion];
  const isLastQuestion = currentQuestion === questions.length - 1;
  const isFirstQuestion = currentQuestion === 0;
  const allAnswered = Object.keys(answers).length === questions.length;

  return (
    <div className="ocean-test">
      <div className="test-progress">
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
        <p className="progress-text">
          Question {currentQuestion + 1} of {questions.length}
        </p>
      </div>

      {question && (
        <div className="question-container">
          <h2 className="question-text">{question.text}</h2>

          <div className="options-group">
            {question.options.map(option => (
              <label key={option.value} className="option-label">
                <input
                  type="radio"
                  name={`question-${question.id}`}
                  value={option.value}
                  checked={answers[question.id] === option.value}
                  onChange={() => handleAnswer(question.id, option.value)}
                />
                <span className="option-text">{option.label}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      <div className="navigation-buttons">
        <button
          className="nav-btn prev-btn"
          onClick={() => setCurrentQuestion(prev => prev - 1)}
          disabled={isFirstQuestion}
        >
          <ArrowLeft className="w-4 h-4" />
          Previous
        </button>

        {!isLastQuestion ? (
          <button
            className="nav-btn next-btn"
            onClick={() => setCurrentQuestion(prev => prev + 1)}
            disabled={!answers[question?.id]}
          >
            Next
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            className="nav-btn submit-btn"
            onClick={handleSubmit}
            disabled={!allAnswered || submitting}
          >
            {submitting ? 'Submitting...' : 'Complete Test'}
          </button>
        )}
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

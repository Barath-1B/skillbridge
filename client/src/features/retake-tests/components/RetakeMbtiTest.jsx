import RetakeQuiz from './RetakeQuiz';
import retakeTestsService from '../../../services/retake-tests.service';

export default function RetakeMbtiTest() {
  return (
    <RetakeQuiz
      title="MBTI personality"
      submitLabel="See my type"
      fetchQuestions={retakeTestsService.getMbtiQuestions}
      submit={retakeTestsService.retakeMbtiTest}
    />
  );
}

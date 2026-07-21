import RetakeQuiz from './RetakeQuiz';
import retakeTestsService from '../../../services/retake-tests.service';

export default function RetakeOceanTest() {
  return (
    <RetakeQuiz
      title="OCEAN personality"
      submitLabel="Save results"
      fetchQuestions={retakeTestsService.getOceanQuestions}
      submit={retakeTestsService.retakeOceanTest}
    />
  );
}

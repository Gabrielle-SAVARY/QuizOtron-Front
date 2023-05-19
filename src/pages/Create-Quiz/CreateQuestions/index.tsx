import CreateAnswer from '../CreateAnswers';
import './styles.scss';

interface CreateQuestionsProps {
  questionNumber: number

}

function CreateQuestion({ questionNumber }:CreateQuestionsProps) {
  return (
    <div className="question_container" id={`question${questionNumber}`}>
      <p className="question__number">
        Question n°
        {questionNumber}
      </p>
      <input
        type="text"
        placeholder="Question"
        className="question__title"
        name="quizQuestion"
      />
      <fieldset>
        <div className="question-choice">
          <CreateAnswer questionNumber={questionNumber} />
          <CreateAnswer questionNumber={questionNumber} />
          <CreateAnswer questionNumber={questionNumber} />
          <CreateAnswer questionNumber={questionNumber} />
        </div>
      </fieldset>
    </div>

  );
}

export default CreateQuestion;

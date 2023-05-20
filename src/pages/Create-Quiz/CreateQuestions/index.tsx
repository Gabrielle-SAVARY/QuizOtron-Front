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
          <div className="answer_container" id={`q${questionNumber}Answer1`}>
            <span className="answer_radio-button">
              <input type="radio" id="question1-radio1" name={`q${questionNumber}Answer1Valid`} />
              <label htmlFor="question1-radio1" />
            </span>
            <span className="answer_input-text">
              <label htmlFor="question1-answer1" />
              <input type="text" id="question1-answer1" name={`q${questionNumber}Answer1`} />
            </span>
          </div>
          <div className="answer_container" id={`q${questionNumber}Answer2`}>
            <span className="answer_radio-button">
              <input type="radio" id="question1-radio2" name={`q${questionNumber}Answer2Valid`} />
              <label htmlFor="question1-radio2" />
            </span>
            <span className="answer_input-text">
              <label htmlFor="question1-answer2" />
              <input type="text" id="question1-answer2" name={`q${questionNumber}Answer2`} />
            </span>
          </div>
          <div className="answer_container" id={`q${questionNumber}Answer3`}>
            <span className="answer_radio-button">
              <input type="radio" id="question1-radio3" name={`q${questionNumber}Answer3Valid`} />
              <label htmlFor="question1-radio3" />
            </span>
            <span className="answer_input-text">
              <label htmlFor="question1-answer3" />
              <input type="text" id="question1-answer3" name={`q${questionNumber}Answer3`} />
            </span>
          </div>
          <div className="answer_container" id={`q${questionNumber}Answer4`}>
            <span className="answer_radio-button">
              <input type="radio" id="question1-radio4" name={`q${questionNumber}Answer4Valid`} />
              <label htmlFor="question1-radio4" />
            </span>
            <span className="answer_input-text">
              <label htmlFor="question1-answer4" />
              <input type="text" id="question1-answer4" name={`q${questionNumber}Answer4`} />
            </span>
          </div>
        </div>
      </fieldset>
    </div>

  );
}

export default CreateQuestion;

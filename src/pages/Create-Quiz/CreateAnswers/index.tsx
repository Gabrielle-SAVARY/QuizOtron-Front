import './styles.scss';

interface CreateAnswerProps {
  questionNumber: number

}

function CreateAnswer({ questionNumber }:CreateAnswerProps) {
  return (
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
  );
}

export default CreateAnswer;

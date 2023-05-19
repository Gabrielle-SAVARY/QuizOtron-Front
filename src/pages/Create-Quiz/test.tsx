import {
  useState,
} from 'react';
import './styles.scss';
import { Question } from '../../@types/newQuiz';

interface TestProps {
  questionNumber: number

}

function Test({ questionNumber }:TestProps) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const addEmptyQuestion = () => {
    setQuestions([
      ...questions,
      {
        question: '',
        answers: [],
      },
    ]);
  };

  const addEmptyAnswer = (index: number) => {
    const question = questions[index];
    question.answers.push(
      {
        answer: '',
        is_valid: false,
      },
    );
    setQuestions(questions);
  };

  const setAnswer = (questionIndex: number, answerIndex:number, answer:string, is_valid:boolean) => {
    const question = questions[questionIndex];
    question.answers[answerIndex] = {
      answer,
      is_valid,
    };
    setQuestions(questions);
  };

  const setQuestion = (questionIndex: number, question:string) => {
    questions[questionIndex] = { question, answers: questions[questionIndex].answers };

    setQuestions(questions);
  };

  return (
    <>
      <button type="button" onClick={addEmptyQuestion}>Ajouter une question</button>
      {questions.map((question, questionKey) => (
        <div className="question_container" id={`question${questionKey + 1}`} key={`question-${questionKey}`}>

          <p className="question__number">
            Question n°
            {questionKey + 1}
          </p>
          <input
            type="text"
            placeholder="Question"
            className="question__title"
            name="quizQuestion"
          />
          <fieldset>
            <div className="question-choice">

              <button type="button" onClick={() => addEmptyAnswer(questionKey)}>Ajouter une réponse</button>
              {question.answers.map((answer, answerKey) => (

                <div className="answer_container" key={`answer-${questionKey}-${answerKey}`}>
                  <span className="answer_radio-button">
                    <input type="radio" id="question1-radio1" name="question1-radio" />
                    <label htmlFor="question1-radio1" />
                  </span>
                  <span className="answer_input-text">
                    <label htmlFor="question1-answer1" />
                    <input type="text" id="question1-answer1" name="question1Answer1" />
                  </span>
                </div>

              ))}

            </div>
          </fieldset>
        </div>
      ))}

    </>
  );
}

export default Test;

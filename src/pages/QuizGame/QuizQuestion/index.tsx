import { useState, useEffect } from 'react';
import { Answer, Question } from '../../../@types/quiz';

interface QuizQuestionProps {
  quizQuestion: string
  quizAnswers: Answer[]
}

function QuizQuestion({ quizQuestion, quizAnswers }: QuizQuestionProps) {
  const [selectedValue, setSelectedValue] = useState('');
  const handleClick = (value: string) => {
    setSelectedValue(value);
  };
  return (
    <div className="quiz-question">
      <h1>{quizQuestion}</h1>
      <button type="button">question</button>
      {/* <div>
        <button
          type="button"
          className={selectedValue === 'option1' ? 'selected' : ''}
          onClick={() => handleClick('option1')}
        >
          Option 1
        </button>

        <button
          type="button"
          className={selectedValue === 'option2' ? 'selected' : ''}
          onClick={() => handleClick('option2')}
        >
          Option 2
        </button>

        <button
          type="button"
          className={selectedValue === 'option3' ? 'selected' : ''}
          onClick={() => handleClick('option3')}
        >
          Option 3
        </button>
      </div> */}

    </div>
  );
}

export default QuizQuestion;

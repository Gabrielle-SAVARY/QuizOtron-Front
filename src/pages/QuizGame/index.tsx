import { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { axiosInstance } from '../../utils/axios';
import { IOneQuiz } from '../../@types/quiz';
import QuizQuestion from './QuizQuestion';

interface QuizGameProps {

}

function QuizPage() {
  const [currentQuiz, setcurrentQuiz] = useState<IOneQuiz>();

  const location = useLocation();
  const { id } = useParams();

  console.log('location', location);
  console.log('id', id);

  useEffect(() => {
    const getQuizDetails = async () => {
      try {
        const response = await axiosInstance.get(`/quiz/${id}`);
        if (response.status !== 200) {
          throw new Error('Failed to fetch quiz details');
        }
        const quizData = response.data;
        console.log('quizData', quizData);
        setcurrentQuiz(quizData);
      } catch (error) {
        throw new Error('Failed to fetch quiz details');
      }
    };
    getQuizDetails();
  }, [id]);

  return (
    <div>
      <h1>{currentQuiz?.title}</h1>

      {currentQuiz?.questions && currentQuiz.questions.map((question) => (
        <div key={question.id}>
          <QuizQuestion quizQuestion={question.question} quizAnswers={question.answers} />
          {/*           <h3>
            Question
            {' '}
            {question.id}
          </h3>
          <p>{question.question}</p>
          {question.answers.map((answer) => (
            <div key={answer.id}>
              <input type="radio" id={String(answer.id)} name={`question-${question.id}`} />
              <label htmlFor={String(answer.id)}>{answer.answer}</label>
            </div>
          ))} */}
        </div>
      ))}

    </div>

  );
}

export default QuizPage;

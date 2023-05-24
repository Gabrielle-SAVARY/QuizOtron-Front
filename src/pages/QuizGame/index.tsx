import { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import {
  Button,
} from '@mui/material';
import { axiosInstance } from '../../utils/axios';
import { IOneQuiz } from '../../@types/quiz';
import QuizQuestion from './QuizQuestion';

interface QuizGameProps {

}

function QuizPage() {
  // Quiz en cours
  const [currentQuiz, setCurrentQuiz] = useState<IOneQuiz>();
  // Index de la question actuellement affichée (index de 0 à 9)
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);

  // Récupère l'id du quiz sur lequel on a cliqué
  const location = useLocation();
  const { id } = useParams();

  useEffect(() => {
    // Récupère toutes les informations du quiz affiché
    const getQuizDetails = async () => {
      try {
        const response = await axiosInstance.get(`/quiz/${id}`);
        if (response.status !== 200) {
          throw new Error('Failed to fetch quiz details');
        }
        const quizData: IOneQuiz = response.data;
        console.log('quizData', quizData);
        setCurrentQuiz(quizData);
      } catch (error) {
        throw new Error('Failed to fetch quiz details');
      }
    };
    getQuizDetails();
  }, [id]);

  console.log('question index', currentQuiz?.questions[0]);

  return (
    <div>
      {currentQuiz && (
        <div className="quiz-container">
          <h1>{currentQuiz.title}</h1>

          <section className="current-question">
            <h2>
              {`Question n° ${currentQuestion + 1}`}
            </h2>
            <h3>{currentQuiz.questions[currentQuestion].question}</h3>
            <div className="current-answers">
              {currentQuiz.questions[currentQuestion].answers.map((answer) => (
                <Button
                  variant="contained"
                  key={answer.id}
                >
                  {answer.answer}
                </Button>
              ))}
            </div>
          </section>

        </div>

      )}

    </div>

  );
}

export default QuizPage;

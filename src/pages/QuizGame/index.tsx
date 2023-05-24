import { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import {
  Button,
} from '@mui/material';
import { axiosInstance } from '../../utils/axios';
import { Answer, IOneQuiz } from '../../@types/quiz';
import QuizQuestion from './QuizQuestion';

interface QuizGameProps {

}

function QuizPage() {
  // Quiz en cours
  const [currentQuiz, setCurrentQuiz] = useState<IOneQuiz>();
  // Index de la question actuellement affichée (index de 0 à 9)
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  // Stock la réponse sélectionnée par l'utilisateur
  const [selectedAnswerId, setSelectedAnswerId] = useState<number>(0);

  const [score, setScore] = useState<number>(0);

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

  const handleAnswerClicked = (answerId: number) => {
    setSelectedAnswerId(answerId);
    console.log('selectedAnswer', selectedAnswerId);
  };

  useEffect(() => {
    const checkAnswer = () => {
      const selectedQuestion = currentQuiz?.questions[currentQuestion];
      console.log('selectedQuestion', selectedQuestion);
      console.log('selectedQuestion.answers', selectedQuestion?.answers);

      const userAnswer = selectedQuestion?.answers.find((answer) => answer.id === selectedAnswerId);
      console.log('selectedAnswerId', selectedAnswerId);
      console.log('userAnswer', userAnswer);

      if (userAnswer?.is_valid) {
        setScore(score + 1);
      }
    };
    checkAnswer();
  }, [currentQuestion, currentQuiz?.questions, selectedAnswerId]);

  return (
    <div>
      {currentQuiz && (
        <div className="quiz-container">
          <h1>{currentQuiz.title}</h1>
          <h2>
            {`Score ${score}`}
          </h2>

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
                  onClick={() => handleAnswerClicked(answer.id)}
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

import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { axiosInstance } from '../../utils/axios';
import { IOneQuiz } from '../../@types/quiz';
import './styles.scss';

interface QuizGameProps {
  quizData: IOneQuiz
  getQuizDetails: (id: number) => void

}

function QuizGame({ quizData, getQuizDetails }: QuizGameProps) {
  //* STATE
  // Quiz en cours
  const [currentQuiz, setCurrentQuiz] = useState<IOneQuiz>();
  // Score du joueur
  const [score, setScore] = useState<number>(0);
  // Index de la question actuellement affichée
  const [questionIndex, setQuestionIndex] = useState<number>(0);

  // Récupère l'id du quiz sur lequel on a cliqué
  const { id } = useParams();
  const quizId = Number(id);

  useEffect(() => {
    getQuizDetails(quizId);
  }, [quizId, getQuizDetails]);

  useEffect(() => {
    if (quizData) {
      setCurrentQuiz(quizData);
    }
  }, [quizData]);

  //* Gère se lon réponse cliquée par le joueur
  const handleAnswerClicked = (answerId: number) => {
    // Récupère la question sélectionnée (l'objet)
    const selectedQuestion = currentQuiz?.questions[questionIndex];
    // récupère la réponse du joueur (l'objet)
    const userAnswer = selectedQuestion?.answers.find((answer) => answer.id === answerId);
    // vérifie si la réponse du joueur est "valide" est la bonne réponse
    if (userAnswer?.is_valid) {
      setScore(score + 1);
    }
    // Incrémente
    setQuestionIndex((prevQuestion) => prevQuestion + 1);
  };

  return (
    <div>
      {currentQuiz && (
        <div className="quiz-container">
          <h1>{currentQuiz.title}</h1>
          {questionIndex < currentQuiz.questions.length
            ? (
              <section className="current-question">
                <h2>
                  {`Score ${score}`}
                </h2>
                <h2>
                  {`Question n° ${questionIndex + 1}`}
                </h2>
                <h3>{currentQuiz.questions[questionIndex].question}</h3>
                <div className="current-answers">
                  {currentQuiz.questions[questionIndex].answers.map((answer) => (
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
            )
            : (
              <>
                <p>Le quiz est terminé !</p>
                {`Votre score est de ${score}/10`}
                <Button variant="contained" component={Link} to="/">Accueil</Button>
                <Button variant="contained" component={Link} to="/quiz">Liste des quiz</Button>
              </>
            )}
        </div>
      )}

    </div>

  );
}

export default QuizGame;

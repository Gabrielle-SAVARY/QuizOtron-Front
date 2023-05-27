import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button, Stack } from '@mui/material';
import classnames from 'classnames';
import { IOneQuiz } from '../../@types/quiz';
import './styles.scss';

interface QuizGameProps {
  oneQuiz: IOneQuiz
  getQuizDetails: (id: number) => void

}

function QuizGame({ oneQuiz, getQuizDetails }: QuizGameProps) {
  //* STATE
  // Quiz affiché
  const [currentQuiz, setCurrentQuiz] = useState<IOneQuiz>();
  // Score du joueur
  const [score, setScore] = useState<number>(0);
  // Index de la question actuellement affichée
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  // Vérifie si la réponse du joueur est valide/correcte
  const [selectAnswerValid, setSelectAnswerValid] = useState<boolean | null>(null);

  // Récupère l'id du quiz sur lequel on a cliqué
  const { id } = useParams();
  const quizId = Number(id);

  useEffect(() => {
    getQuizDetails(quizId);
  }, [quizId, getQuizDetails]);

  useEffect(() => {
    if (oneQuiz) {
      setCurrentQuiz(oneQuiz);
    }
  }, [oneQuiz]);

  //* Gère se lon réponse cliquée par le joueur
  const handleAnswerClicked = (answerId: number) => {
    // Récupère la question sélectionnée (l'objet)
    const selectedQuestion = currentQuiz?.questions[questionIndex];
    // Récupère la réponse du joueur (l'objet)
    const userAnswer = selectedQuestion?.answers.find((answer) => answer.id === answerId);
    // Vérifie si la réponse du joueur est "valide" est la bonne réponse
    if (userAnswer?.is_valid) {
      setScore(score + 1);
      setSelectAnswerValid(true);
    } else {
      setSelectAnswerValid(false);
    }
    setTimeout(() => {
      // Incrémente l'index de la question -> affiche la question suivante
      setQuestionIndex((prevQuestion) => prevQuestion + 1);
    }, 2000);
  };

  return (
    <div>
      {currentQuiz && (
        <div className="quizgame__container">
          <h1 className="quizgame__title">{currentQuiz.title}</h1>
          {questionIndex < currentQuiz.questions.length
            ? (
              <section className="quizgame__question">
                <h2 className="quizgame__score">
                  {`Score ${score}`}
                </h2>
                <h2 className="quizgame__scoreNb">
                  {`Question n° ${questionIndex + 1}`}
                </h2>
                <h3 className="quizgame__text">{currentQuiz.questions[questionIndex].question}</h3>
                <div className="quizgame__answer">
                  <Stack
                    spacing={{ xs: 2, md: 3 }}
                  >
                    {currentQuiz.questions[questionIndex].answers.map((answer) => (
                      <button
                        type="button"
                        key={answer.id}
                        onClick={() => handleAnswerClicked(answer.id)}
                        className={classnames('quizgame__answerBtn', {
                          valid: answer.is_valid && selectAnswerValid === true,
                          invalid: !answer.is_valid && selectAnswerValid === false,
                        })}
                      >
                        {answer.answer}
                      </button>
                    ))}
                  </Stack>
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

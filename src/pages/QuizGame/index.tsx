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
  // Stocke les infos Quiz affiché
  const [currentQuiz, setCurrentQuiz] = useState<IOneQuiz>();
  // Score du joueur
  const [score, setScore] = useState<number>(0);
  // Index de la question actuellement affichée
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  // Vérifie si le joueur a cliqué sur une réponse
  const [isAnswerClicked, setIsAnswerClicked] = useState<boolean>(false);
  // Stocke l'id de la réponse cliquée par le joueur
  const [userAnswerId, setUserAnswerId] = useState<number>(0);
  // Vérifie si la réponse du joueur est la bonne réponse (réponse valide/correcte)
  const [isSelectAnswerValid, setIsSelectAnswerValid] = useState<boolean | null>(null);

  // Récupère l'id du quiz sur lequel on a cliqué
  const { id } = useParams();
  const quizId = Number(id);

  // Récupère les infos du quiz sélectionné
  useEffect(() => {
    getQuizDetails(quizId);
  }, [quizId, getQuizDetails]);

  // Stocke les infos du quiz sélectionné dans le state
  useEffect(() => {
    if (oneQuiz) {
      setCurrentQuiz(oneQuiz);
    }
  }, [oneQuiz]);

  //* Actions selon réponse cliquée par le joueur
  const handleAnswerClicked = (answerId: number) => {
    // Enregistre qu'une réponse a été cliquée
    setIsAnswerClicked(true);
    // Enregistre l'id de la réponse cliquée
    setUserAnswerId(answerId);
    // Récupère la question sélectionnée (l'objet)
    const selectedQuestion = currentQuiz?.questions[questionIndex];
    // Récupère la réponse du joueur (l'objet)
    const userAnswer = selectedQuestion?.answers.find((answer) => answer.id === answerId);

    //* Vérifie si la réponse du joueur est "valide" est la bonne réponse
    // Si oui, incrémente le score + enregistre que la réponse est valide dans le state
    // Si non, enregistre que la réponse est invalide dans le state
    if (userAnswer?.is_valid) {
      setScore(score + 1);
      setIsSelectAnswerValid(true);
    } else {
      setIsSelectAnswerValid(false);
    }
    //* Après un délai affiche la question suivante + réinitialise le state: sélection d'une réponse
    setTimeout(() => {
      // Incrémente l'index de la question -> affiche la question suivante
      setQuestionIndex((prevQuestion) => prevQuestion + 1);
      setIsAnswerClicked(false);
    }, 1200);
  };

  return (
    <div>
      {currentQuiz && (
        <div className="quizgame__container">
          <h1 className="quizgame__container-title">{currentQuiz.title}</h1>

          {questionIndex < currentQuiz.questions.length
            ? (
              <>
                <h2 className="quizgame__score">
                  {`Score: ${score} ${score > 1 ? 'points' : 'point'}`}
                </h2>
                <section className="quizgame__question">
                  <div className="quizgame__question-info">
                    <h2 className="quizgame__question-Nb">
                      {`Question n° ${questionIndex + 1}/10`}
                    </h2>
                    <h3 className="quizgame__question-text">{currentQuiz.questions[questionIndex].question}</h3>
                  </div>
                  <div className="quizgame__answer">
                    <Stack
                      spacing={{ xs: 2, md: 3 }}
                    >
                      {/* classe CSS ajoutées: après le click de l'utilsiateur */}
                      {/* valid = bonne réponse: réponse sélectionnée par utilisateur */}
                      {/* invalid = mauvaise réponse de l'utilisi=ateur */}
                      {/* selectedBtn: réponse sélectionnée par utilisateur */}
                      {currentQuiz.questions[questionIndex].answers.map((answer) => (
                        <button
                          type="button"
                          key={answer.id}
                          onClick={() => handleAnswerClicked(answer.id)}
                          className={classnames(
                            'quizgame__answerBtn',
                            {
                              valid: isAnswerClicked && answer.is_valid,
                              invalid: isAnswerClicked && !isSelectAnswerValid
                          && userAnswerId === answer.id,
                            },
                            { selectedBtn: userAnswerId === answer.id },
                          )}
                          disabled={isAnswerClicked}
                        >
                          {answer.answer}
                        </button>
                      ))}
                    </Stack>
                  </div>
                </section>
              </>
            )
            : (
              <>
                <div className="quizgame__end">
                  <p className="quizgame__end-text">Le quiz est terminé !</p>
                  <div className="quizgame__end-score">
                    <span>Votre score est de :</span>
                    <span className="quizgame__end-score-Nb">{` ${score}/10`}</span>
                  </div>
                  <img className="quizgame__end-img" src={currentQuiz.thumbnail} alt="Quiz" />
                </div>
                <div className="quizgame__redirectionBtn">
                  <Button variant="contained" component={Link} to="/">Accueil</Button>
                  <Button variant="contained" component={Link} to="/quiz">Liste des quiz</Button>
                </div>
              </>
            )}
        </div>
      )}

    </div>

  );
}

export default QuizGame;

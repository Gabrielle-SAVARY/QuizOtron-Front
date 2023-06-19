import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button, Stack } from '@mui/material';
import classnames from 'classnames';
import { IOneQuiz } from '../../@types/quiz';
import './styles.scss';
import { axiosInstance } from '../../utils/axios';
import { IScoreHistory } from '../../@types/quizHistory';

interface QuizGameProps {
  oneQuiz: IOneQuiz
  getQuizDetails: (id: number) => void
  quizHistory: IScoreHistory[];
  setQuizHistory: (quizHistory: IScoreHistory[]) => void;
}

function QuizGame({
  oneQuiz, getQuizDetails, quizHistory, setQuizHistory,
}: QuizGameProps) {
  //* STATE
  // Stocke les infos Quiz affiché
  const [currentQuiz, setCurrentQuiz] = useState<IOneQuiz>();
  // Score du joueur
  const [score, setScore] = useState<number>(0);
  // Index de la question actuellement affichée
  const [questionIndex, setQuestionIndex] = useState<number>(0);

  // STATE concernant la réponse sélectionnée par le joueur
  // Vérifie si le joueur a cliqué sur une réponse
  const [isAnswerClicked, setIsAnswerClicked] = useState<boolean>(false);
  // Stocke l'id de la réponse cliquée par le joueur
  const [userAnswerId, setUserAnswerId] = useState<number>(0);
  // Vérifie si le joueur a validé sur une réponse
  const [isAnswerSubmit, setIsAnswerSubmit] = useState<boolean>(false);
  // Vérifie si la réponse du joueur est la bonne réponse (réponse valide/correcte)
  const [isSelectAnswerValid, setIsSelectAnswerValid] = useState<boolean | null>(null);

  const [isLastQuestionValidated, setIsLastQuestionValidated] = useState<boolean>(false);

  //* Récupère l'id du quiz sur lequel on a cliqué
  const { id } = useParams();
  const quizId = Number(id);

  //* Récupère les infos du quiz sélectionné
  useEffect(() => {
    getQuizDetails(quizId);
  }, [quizId, getQuizDetails]);

  useEffect(() => {
    //* Stocke les infos du quiz sélectionné dans un nouveau state
    if (oneQuiz) {
      setCurrentQuiz(oneQuiz);
    }
  }, [currentQuiz, currentQuiz?.id, oneQuiz, quizHistory]);

  //* QUIZ GAME
  const handleAnswerClicked = (answerId: number) => {
    // Enregistre qu'une réponse a été cliquée
    setIsAnswerClicked(true);
    // Enregistre l'id de la réponse cliquée
    setUserAnswerId(answerId);
  };

  const handleAnswerSubmit = () => {
    setIsAnswerSubmit(true);
    // Récupère la question sélectionnée (l'objet)
    const selectedQuestion = currentQuiz?.questions[questionIndex];
    // Récupère la réponse du joueur (l'objet)
    const userAnswer = selectedQuestion?.answers.find((answer) => answer.id === userAnswerId);
    //* Vérifie si la réponse du joueur est "valide" est la bonne réponse
    // Si oui, incrémente le score + enregistre que la réponse est valide dans le state
    // Si non, enregistre que la réponse est invalide dans le state
    if (userAnswer?.is_valid) {
      setScore(score + 1);
      setIsSelectAnswerValid(true);
    } else {
      setIsSelectAnswerValid(false);
    }
    if (currentQuiz && questionIndex === (currentQuiz.questions.length - 1)) {
      setIsLastQuestionValidated(true);
    }
    setIsAnswerClicked(false);
  };

  const addQuizToHistory = async (
    quizIdHistory: number,
    scoreHistory: number,
  ) => {
    try {
      const response = await axiosInstance.post('/profile/history', { quiz_id: quizIdHistory, quiz_score: scoreHistory });
      if (response.status !== 200) {
        throw new Error('Failed to add quiz to history');
      }
      // Récupère les données de la réponse
      const { data } = response;
      // Mise à jour du state avec les données inversées de la réponse
      setQuizHistory(data);
    } catch (error) {
      console.log(error);
    }
  };
  //* Affiche la question suivante + réinitialise le state: sélection d'une réponse
  const handleNextQuestion = () => {
    // Incrémente l'index de la question -> affiche la question suivante
    setQuestionIndex((prevQuestion) => prevQuestion + 1);

    setIsAnswerSubmit(false);
    if (isLastQuestionValidated) {
      addQuizToHistory(quizId, score);
    }
  };

  // Style bouton "valider la réponse"
  const validateAnswerBtnStyle = { display: !isAnswerClicked ? 'none' : 'block' };
  // Style bouton "question suivante"
  const nextBtnStyle = { display: !isAnswerSubmit ? 'none' : 'block' };
  // Texte bouton "question suivante" si dernière question "Terminé"
  const nextBtnText = isLastQuestionValidated ? 'Terminé' : 'Question suivante';

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
                      {/* classe CSS ajoutées: après le click de l'utilisateur */}
                      {/* valid = bonne réponse */}
                      {/* invalid = mauvaise réponse de l'utilisateur */}
                      {/* selectedBtn: réponse sélectionnée par utilisateur */}
                      {currentQuiz.questions[questionIndex].answers.map((answer) => (
                        <button
                          type="button"
                          key={answer.id}
                          onClick={() => handleAnswerClicked(answer.id)}
                          className={classnames(
                            'quizgame__answerBtn',
                            {
                              valid: isAnswerSubmit && answer.is_valid,
                              invalid: isAnswerSubmit && !isSelectAnswerValid
                                && userAnswerId === answer.id,
                            },
                            { selectedBtn: userAnswerId === answer.id },
                          )}
                          disabled={isAnswerSubmit}
                        >
                          {answer.answer}
                        </button>
                      ))}
                    </Stack>
                    <div className="validate">
                      <button type="button" className="btn" onClick={() => handleAnswerSubmit()} style={validateAnswerBtnStyle}>Valider la réponse</button>
                      <button type="button" className="btn" onClick={() => handleNextQuestion()} style={nextBtnStyle}>{nextBtnText}</button>
                    </div>
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

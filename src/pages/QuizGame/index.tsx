import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button, Stack } from '@mui/material';
import classnames from 'classnames';
import { current } from '@reduxjs/toolkit';
import { IOneQuiz } from '../../@types/quiz';
import './styles.scss';
import { axiosInstance } from '../../utils/axios';
import { IQuizzesScore, IQuizHistory } from '../../@types/quizHistory';

interface QuizGameProps {
  oneQuiz: IOneQuiz
  getQuizDetails: (id: number) => void
  quizHistory: IQuizzesScore[];
  setQuizHistory: (quizHistory: IQuizzesScore[]) => void;
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

  const [scoreIdHistory, setScoreIdHistory] = useState<number | null>(null);

  //* Récupère l'id du quiz sur lequel on a cliqué
  const { id } = useParams();
  const quizId = Number(id);

  //* Récupère les infos du quiz sélectionné
  useEffect(() => {
    setScoreIdHistory(null);
    getQuizDetails(quizId);
  }, [quizId, getQuizDetails]);

  useEffect(() => {
    //* Récupère l'id du score du quiz sélectionné dans l'historique
    const foundScoreHistory = () => {
      if (currentQuiz !== undefined) {
        const foundQuiz = quizHistory.find(
          (item) => item.id === currentQuiz.id,
        ) as IQuizzesScore | undefined;
        console.log('foundQuiz', foundQuiz);
        if (foundQuiz !== undefined) {
          setScoreIdHistory(foundQuiz.score.id);
          console.log('scoreIdHistory', scoreIdHistory);
        }
      }
    };
      //* Stocke les infos du quiz sélectionné dans un nouveau state
    if (oneQuiz) {
      setCurrentQuiz(oneQuiz);
      if (quizHistory.length !== undefined) {
        foundScoreHistory();
      }
    }
  }, [currentQuiz, currentQuiz?.id, oneQuiz, quizHistory, scoreIdHistory]);

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
    console.log('currentQuiz', currentQuiz);
    console.log('questionIndex', questionIndex);
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
      console.log('LAST QUESTION questionIndex', questionIndex);
      setIsLastQuestionValidated(true);
    }
  };

  const addQuizToHistory = async (
    quizIdHistory: number,
    scoreHistory: number,
    scoreId: number | null,
  ) => {
    try {
      const response = await axiosInstance.post('/profile/history', { quiz_id: quizIdHistory, quiz_score: scoreHistory, score_id: scoreId });
      if (response.status !== 200) {
        throw new Error('Failed to add quiz to history');
      }
      console.log('quizIdHistory', quizIdHistory);
      console.log('scoreHistory', scoreHistory);
      console.log('scoreId', scoreId);
      // Récupère les données de la réponse
      const { data } = response;
      console.log('data', data);
      // Créer une copie du tableau
      const dataArray = [...data.data.quizzes_scores];
      console.log('dataArray', dataArray);
      // Inverse l'ordre des données pour avoir les plus récentes en premier
      const dataReverse = dataArray.reverse();
      console.log('dataReverse', dataReverse);

      // Mise à jour du state avec les données inversées de la réponse
      setQuizHistory(dataReverse);
    } catch (error) {
      console.log(error);
    }
  };

  //* Affiche la question suivante + réinitialise le state: sélection d'une réponse
  const handleNextQuestion = () => {
    // Incrémente l'index de la question -> affiche la question suivante
    setQuestionIndex((prevQuestion) => prevQuestion + 1);
    setIsAnswerClicked(false);
    setIsAnswerSubmit(false);
    if (isLastQuestionValidated) {
      addQuizToHistory(quizId, score, scoreIdHistory);
    }
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
                      <button type="button" className="btn" onClick={() => handleAnswerSubmit()} style={{ display: isAnswerSubmit ? 'none' : 'block' }}>Valider la réponse</button>
                      <button type="button" className="btn" onClick={() => handleNextQuestion()} style={{ display: !isAnswerSubmit ? 'none' : 'block' }}>Question suivante</button>
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

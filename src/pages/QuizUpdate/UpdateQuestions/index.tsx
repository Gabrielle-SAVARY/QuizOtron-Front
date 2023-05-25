import {
  FormControlLabel,
  FormLabel, Radio, RadioGroup, TextField,
} from '@mui/material';
import { SyntheticEvent } from 'react';
import { QuestionUp } from '../../../@types/quizUpdate';
import './styles.scss';
import { IOneQuiz } from '../../../@types/quiz';

interface CreateQuestionsProps {
  questionNumber: number
  newQuestion: QuestionUp
  setNewQuestion: (question: QuestionUp) => void
  oneQuiz: IOneQuiz
  getQuizDetails: (id: number) => void
  setOneQuiz: (quiz: IOneQuiz) => void
}

function UpdateQuestion({
  oneQuiz, questionNumber, newQuestion, setNewQuestion, getQuizDetails, setOneQuiz,
}: CreateQuestionsProps) {
  //* Mise à jour du state au remplissage du formulaire
  const handleChangeQuestions = (
    event: SyntheticEvent<Element, Event>,
    answerNb = 0,
    isCorrectAnswer = false,
  ) => {
    // Etape 1 : On récupère le contenu du state newQuestion dans l'objet quizQuestions
    const quizQuestions = { ...newQuestion };

    // Etape 2 : on contrôle le numéro de réponse: answerNb
    // answerNb: permet de savoir si on renseigne une question ou une réponse
    // Si answerNb === 0 alors e.target.value est une question
    if (answerNb === 0) {
      // pour typer la value de l'évenement on type précisement event.target
      const target = event.target as HTMLInputElement;
      quizQuestions.question = target.value;
    } else if (!isCorrectAnswer) {
      const target = event.target as HTMLInputElement;
      quizQuestions.answers[answerNb - 1].answer = target.value;
    } else {
      // Si answerNb !== 0 alors e.target.value est une réponse
      //* Correction de l'erreur eslint de la boucle for of avec un map
      // on crée un nouveau tableau à partir de quizQuestions
      // on met à jour tous les is_valid à false pour réinitialiser les boutons radios
      const updatedAnswers = quizQuestions.answers.map((answer) => ({
        ...answer,
        is_valid: false,
      }));
      quizQuestions.answers = updatedAnswers;

      // Ensuite on passe la nouvelle réponse à true (sélection bouton radio)
      quizQuestions.answers[answerNb - 1].is_valid = true;
    }
    // Enfin, on met à jour le state
    setNewQuestion(quizQuestions);
  };

  return (
    <div className="question_container" id={`question${questionNumber}`}>
      <h3 className="question__number">
        Question n°
        {questionNumber}
      </h3>
      <TextField
        fullWidth
        id={`question-${questionNumber}`}
        label={`Question ${questionNumber}`}
        variant="outlined"
        onChange={handleChangeQuestions}
        value={newQuestion.question}
      />
      <FormLabel id="demo-radio-buttons-group-label">Réponses</FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="choose"
        name={`radio-q${questionNumber}`}
      >

        <fieldset>
          <div className="question-choice">
            {/* //? ======= Réponse 1 ========== */}
            <div className="answer_container" id={`q${questionNumber}Answer1`}>
              <span className="answer_radio-button">
                <FormControlLabel
                  value="answer1"
                  control={<Radio />}
                  label=""
                  onChange={(event) => handleChangeQuestions(event, 1, true)}
                />
              </span>
              <span className="answer_input-text">
                <TextField
                  id={`answer1-q${questionNumber}`}
                  label="Réponse 1"
                  variant="outlined"
                  onChange={(event) => handleChangeQuestions(event, 1)}
                  value={newQuestion.answers[0].answer}
                />
              </span>
            </div>
          </div>

          {/* //? ======= Réponse 2 ========== */}
          <div className="question-choice">
            <div className="answer_container" id={`q${questionNumber}Answer2`}>
              <span className="answer_radio-button">
                <FormControlLabel
                  value="answer2"
                  control={<Radio />}
                  label=""
                  onChange={(event) => handleChangeQuestions(event, 2, true)}
                />
              </span>
              <span className="answer_input-text">
                <TextField
                  id={`answer2-q${questionNumber}`}
                  label="Réponse 2"
                  variant="outlined"
                  onChange={(event) => handleChangeQuestions(event, 2)}
                  value={newQuestion.answers[1].answer}
                />
              </span>
            </div>
          </div>

          {/* //? ======= Réponse 3 ========== */}
          <div className="question-choice">
            <div className="answer_container" id={`q${questionNumber}Answer3`}>
              <span className="answer_radio-button">
                <FormControlLabel
                  value="answer3"
                  control={<Radio />}
                  label=""
                  onChange={(event) => handleChangeQuestions(event, 3, true)}
                />
              </span>
              <span className="answer_input-text">
                <TextField
                  id={`answer3-q${questionNumber}`}
                  label="Réponse 3"
                  variant="outlined"
                  onChange={(event) => handleChangeQuestions(event, 3)}
                  value={newQuestion.answers[2].answer}
                />
              </span>
            </div>
          </div>

          {/* //? ======= Réponse 4 ========== */}
          <div className="question-choice">
            <div className="answer_container" id={`q${questionNumber}Answer4`}>
              <span className="answer_radio-button">
                <FormControlLabel
                  value="answer4"
                  control={<Radio />}
                  label=""
                  onChange={(event) => handleChangeQuestions(event, 4, true)}
                />
              </span>
              <span className="answer_input-text">
                <TextField
                  id={`answer4-q${questionNumber}`}
                  label="Réponse 4"
                  variant="outlined"
                  onChange={(event) => handleChangeQuestions(event, 4)}
                  value={newQuestion.answers[3].answer}
                />
              </span>
            </div>
          </div>
        </fieldset>
      </RadioGroup>
    </div>

  );
}

export default UpdateQuestion;

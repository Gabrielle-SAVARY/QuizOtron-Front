import {
  FormControlLabel,
  FormLabel, Radio, RadioGroup, TextField,
} from '@mui/material';
import { SyntheticEvent } from 'react';
import { QuestionUp } from '../../../@types/quizUpdate';
import './styles.scss';

interface CreateQuestionsProps {
  questionNumber: number
  newQuestion: QuestionUp
  setNewQuestion: (question: QuestionUp) => void
}

function UpdateQuestion({
  questionNumber, newQuestion, setNewQuestion,
}: CreateQuestionsProps) {
  //* Mise à jour du state au remplissage du formulaire
  // answerNb: identifie si on rensigne une question ou une réponse
  // isCorrectAnswer: boolean / renseigné pour identifier les boutons radio
  const handleChangeQuestions = (
    event: SyntheticEvent<Element, Event>,
    answerNb = 0,
    isCorrectAnswer = false,
  ) => {
    //* Etape 1 : Récupère le contenu du state newQuestion dans l'objet quizQuestions
    const quizQuestions = { ...newQuestion };

    //* Etape 2 : Contrôle le numéro de réponse: answerNb
    //* QUESTION
    // answerNb === 0 alors e.target.value est une question
    if (answerNb === 0) {
      // pour typer la value de event: typer event.target
      const target = event.target as HTMLInputElement;
      quizQuestions.question = target.value;
    } else if (!isCorrectAnswer) {
      //* INPUT TEXTE REPONSE
      // Si answerNb !== 0 ->  n'est pas une question, c'est une réponse
      // Si !isCorrectAnswer ->  n'est pas un bouton radio

      // answerNb-1: index de la réponse pour commencer à index 0
      const target = event.target as HTMLInputElement;
      quizQuestions.answers[answerNb - 1].answer = target.value;
    } else {
      //* BOUTON RADIO
      // Correction de l'erreur eslint de la boucle for of avec un map
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
    // Met à jour le state avec les données d'une question
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
        name={`radio-q${questionNumber}`}
      >

        <fieldset>

          {newQuestion.answers.map((answer, index) => (
            <div key={`${answer.id}-${index}`} className="question-choice">
              <div className="answer_container" id={`q${questionNumber}${answer.id}`}>
                <span className="answer_radio-button">
                  <FormControlLabel
                    value={answer.id}
                    control={<Radio />}
                    label=""
                    checked={answer.is_valid}
                    onChange={(event) => handleChangeQuestions(event, (index + 1), true)}
                  />
                </span>
                <span className="answer_input-text">
                  <TextField
                    id={`answer${answer.id}-q${questionNumber}`}
                    label={`Réponse ${index + 1}`}
                    variant="outlined"
                    onChange={(event) => handleChangeQuestions(event, (index + 1))}
                    value={answer.answer}
                  />
                </span>
              </div>

            </div>
          ))}
        </fieldset>
      </RadioGroup>
    </div>

  );
}

export default UpdateQuestion;

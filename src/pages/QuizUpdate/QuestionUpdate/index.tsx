import {
  FormControlLabel,
  FormLabel, Radio, RadioGroup, TextField,
} from '@mui/material';
import { SyntheticEvent } from 'react';
import { QuestionUp } from '../../../@types/quizUpdate';
import './styles.scss';

interface QuestionUpdateProps {
  questionNumber: number
  updateQuestion: QuestionUp
  onChangeQuestion:(event: SyntheticEvent<Element, Event>, idQuestion: number) => void

}

function QuestionUpdate({
  questionNumber, updateQuestion, onChangeQuestion
}: QuestionUpdateProps) {
  //* Mise à jour du state au remplissage du formulaire
  // answerNb: identifie si on renseigne une question ou une réponse
  // isRadioBtn: boolean vérifie si on est sur un bouton radio
  console.log(questionNumber,updateQuestion);
  const handleChangeQuestions = (
    event: SyntheticEvent<Element, Event>,
    answerNb = 0,
    isRadioBtn = false,
  ) => {
    //* Etape 1 : On récupère le contenu du state newQuestion dans l'objet quizQuestions
    const quizQuestions = { ...updateQuestion };

    //* Etape 2 : on contrôle le numéro de réponse: answerNb
    // answerNb: permet de savoir si on renseigne une question ou une réponse
    // Si answerNb === 0 alors e.target.value est une question
    // Si answerNb !== 0 ->  n'est pas une question, c'est une réponse
    //* QUESTION
    if (answerNb === 0) {
      // pour typer la value de event: typer event.target
      const target = event.target as HTMLInputElement;
      quizQuestions.question = target.value;
    } else if (!isRadioBtn) {
      //* INPUT TEXTE REPONSE
      // answerNb-1: index de la réponse pour commencer à index 0
      const target = event.target as HTMLInputElement;
      quizQuestions.answers[answerNb - 1].answer = target.value;
    } else {
      //* BOUTON RADIO
      //* On réinitialise tous les boutons radios en mettant  is_valid:false
      // Correction de l'erreur eslint de la boucle for of avec un map
      // Avec map on crée un nouveau tableau à partir de quizQuestions
      const updatedAnswers = quizQuestions.answers.map((answer) => ({
        ...answer,
        is_valid: false,
      }));
      quizQuestions.answers = updatedAnswers;

      //* On enregistre la nouvelle réponse à true (sélection bouton radio)
      quizQuestions.answers[answerNb - 1].is_valid = true;
    }
    //* On et à jour le state avec les données d'une question
    // setNewQuestion(quizQuestions);
  };

  // TODO trouver solution pour éviter d'utiliser en key l'index de la réponse dans le map

  return (
    <div className="question_container" id={`question${questionNumber}`}>
      <h3 className="question__number">
        Question n°
        {questionNumber}
      </h3>
      <TextField
        fullWidth
        id={`question-${updateQuestion.id}`}
        label={`Question ${questionNumber}`}
        variant="outlined"
        onChange={(event) =>onChangeQuestion(event, updateQuestion.id )}
        value={updateQuestion.question}
      />
      <FormLabel id="demo-radio-buttons-group-label" 
      sx={{ pt: 2 }}>
        Ecrivez les 4 choix de réponses et sélectionner la bonne réponse à la question
      </FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        name={`radio-q${questionNumber}`}
      >

        <fieldset>
          {updateQuestion.answers.map((answer, index) => (
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

export default QuestionUpdate;

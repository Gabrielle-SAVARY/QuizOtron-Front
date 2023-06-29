import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel, Radio, RadioGroup, TextField,
} from '@mui/material';
import { SyntheticEvent, useState } from 'react';
import { IerrorFormNewQuiz, QuestionError } from '../../../@types/error';
import { Question } from '../../../@types/newQuiz';
import './styles.scss';
import { getError, getHelperText } from '../../../utils/showError';

interface QuestionCreateProps {
  questionNumber: number
  newQuestion: Question
  setNewQuestion: (updatedQuestion: Question) => void
  errorInputMsg: IerrorFormNewQuiz
  setErrorInputMsg: (error: IerrorFormNewQuiz) => void
  questionError: QuestionError
}

function QuestionCreate({
  questionNumber, newQuestion, setNewQuestion, errorInputMsg, setErrorInputMsg, questionError,
}:QuestionCreateProps) {
  const [isErrorRadio, setIsErrorRadio] = useState<boolean>(true);

  //* Mise à jour du state au remplissage du formulaire
  // answerNb: identifie si on renseigne une question ou une réponse
  // isRadioBtn: boolean vérifie si on est sur un bouton radio
  const handleChangeQuestions = (
    fieldName: string,
    event: SyntheticEvent<Element, Event>,
    answerNb = 0,
    isRadioBtn = false,
  ) => {
    //* Etape 1 : On récupère le contenu du state newQuestion dans l'objet updatedQuestion
    const updatedQuestion = { ...newQuestion, answers: [...newQuestion.answers] };
    // TODO gérer la suppression de l'erreur au onChange
    const updatedQuestionError = { ...questionError, answers: [...questionError.answers] };
    const answerIndex = answerNb - 1;
    const target = event.target as HTMLInputElement;

    //* Etape 2 : on contrôle le numéro de réponse: answerNb
    // answerNb: permet de savoir si on renseigne une question ou une réponse
    // Si answerNb === 0 alors e.target.value est une question
    // Si answerNb !== 0 ->  n'est pas une question, c'est une réponse
    if (answerNb === 0) {
      // pour typer la value de l'évenement on type précisement event.target
      updatedQuestion.question = target.value;
    } else if (!isRadioBtn) {
      //* INPUT TEXTE REPONSE
      // answerNb-1: index de la réponse pour commencer à index 0
      updatedQuestion.answers[answerIndex].answer = target.value;
    } else {
      //* BOUTON RADIO
      //* On réinitialise tous les boutons radios en mettant  is_valid:false
      // Correction de l'erreur eslint de la boucle for of avec un map
      // Avec map on crée un nouveau tableau à partir de updatedQuestion
      const updatedAnswers = updatedQuestion.answers.map((answer) => ({
        ...answer,
        is_valid: false,
      }));
      updatedQuestion.answers = updatedAnswers;

      //* On enregistre la nouvelle réponse à true (sélection bouton radio)
      updatedQuestion.answers[answerIndex].is_valid = true;
      setIsErrorRadio(false);
    }

    //* On met à jour le state avec les données d'une question
    setNewQuestion(updatedQuestion);

    //* On réinitialise le message d'erreur de l'input text
    /*  setErrorInputMsg({ ...errorInputMsg, [fieldName]: '' }); */
  };

  return (
    <div className="question_container" id={`question${questionNumber}`}>
      <h3 className="question__number">
        Question n°
        {questionNumber}
        /10
      </h3>
      <TextField
        fullWidth
        id={`question-${questionNumber}`}
        label={`Question ${questionNumber}`}
        variant="outlined"
        name={`question${questionNumber}`}
        onChange={(event) => handleChangeQuestions(`question${questionNumber}`, event)}
        value={newQuestion.question}
        error={
          questionError.question !== undefined
          && questionError.question !== ''
        }
        helperText={
          questionError.question !== undefined
          && questionError.question !== ''
            ? questionError.question
            : `${newQuestion.question.length}/150 caractères maximum`
        }
        /* error={getError(errorInputMsg, `question${questionNumber}`)}
        helperText={getHelperText(
          errorInputMsg,
          `question${questionNumber}`,
          '',
        )} */
      />
      <FormControl error={questionError.radioGroup !== undefined
          && questionError.radioGroup !== ''}
      >
        <FormLabel id="demo-radio-buttons-group-label">Ecrivez les 4 choix de réponses et sélectionner la bonne réponse à la question</FormLabel>
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
                    onChange={(event) => handleChangeQuestions('', event, 1, true)}
                  />
                </span>
                <span className="answer_input-text">
                  <TextField
                    id={`answer1-q${questionNumber}`}
                    label="Réponse 1"
                    variant="outlined"
                    name={`answerQ${questionNumber}A1`}
                    fullWidth
                    onChange={(event) => handleChangeQuestions(`answerQ${questionNumber}A1`, event, 1)}
                    value={newQuestion.answers[0].answer}
                    error={
                      questionError.answers[0].answer !== undefined
                      && questionError.answers[0].answer !== ''
                    }
                    helperText={
                      questionError.answers[0].answer !== undefined
                      && questionError.answers[0].answer !== ''
                        ? questionError.answers[0].answer
                        : ''
                    }

/*                     error={getError(errorInputMsg, `answerQ${questionNumber}A1`)}
                    helperText={getHelperText(
                      errorInputMsg,
                      `answerQ${questionNumber}A1`,
                      '',
                    )} */
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
                    onChange={(event) => handleChangeQuestions('', event, 2, true)}
                    name={`q${questionNumber}Answer2`}
                  />
                </span>
                <span className="answer_input-text">
                  <TextField
                    id={`answer2-q${questionNumber}`}
                    label="Réponse 2"
                    variant="outlined"
                    name={`answerQ${questionNumber}A2`}
                    fullWidth
                    onChange={(event) => handleChangeQuestions(`answerQ${questionNumber}A2`, event, 2)}
                    value={newQuestion.answers[1].answer}
                    error={
                      questionError.answers[1].answer !== undefined
                      && questionError.answers[1].answer !== ''
                    }
                    helperText={
                      questionError.answers[1].answer !== undefined
                      && questionError.answers[1].answer !== ''
                        ? questionError.answers[1].answer
                        : ''
                    }
                    /* error={getError(errorInputMsg, `answerQ${questionNumber}A2`)}
                    helperText={getHelperText(
                      errorInputMsg,
                      `answerQ${questionNumber}A2`,
                      '',
                    )} */
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
                    onChange={(event) => handleChangeQuestions('', event, 3, true)}
                  />
                </span>
                <span className="answer_input-text">
                  <TextField
                    id={`answer3-q${questionNumber}`}
                    label="Réponse 3"
                    variant="outlined"
                    name={`answerQ${questionNumber}A3`}
                    fullWidth
                    onChange={(event) => handleChangeQuestions(`answerQ${questionNumber}A3`, event, 3)}
                    value={newQuestion.answers[2].answer}
                    error={
                      questionError.answers[2].answer !== undefined
                      && questionError.answers[2].answer !== ''
                    }
                    helperText={
                      questionError.answers[2].answer !== undefined
                      && questionError.answers[2].answer !== ''
                        ? questionError.answers[2].answer
                        : ''
                    }
                   /*  error={getError(errorInputMsg, `answerQ${questionNumber}A3`)}
                    helperText={getHelperText(
                      errorInputMsg,
                      `answerQ${questionNumber}A3`,
                      '',
                    )} */
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
                    onChange={(event) => handleChangeQuestions('', event, 4, true)}
                  />
                </span>
                <span className="answer_input-text">
                  <TextField
                    id={`answer4-q${questionNumber}`}
                    label="Réponse 4"
                    variant="outlined"
                    name={`answerQ${questionNumber}A4`}
                    fullWidth
                    onChange={(event) => handleChangeQuestions(`answerQ${questionNumber}A4`, event, 4)}
                    value={newQuestion.answers[3].answer}
                    error={
                      questionError.answers[3].answer !== undefined
                      && questionError.answers[3].answer !== ''
                    }
                    helperText={
                      questionError.answers[3].answer !== undefined
                      && questionError.answers[3].answer !== ''
                        ? questionError.answers[3].answer
                        : ''
                    }
                   /*  error={getError(errorInputMsg, `answerQ${questionNumber}A4`)}
                    helperText={getHelperText(
                      errorInputMsg,
                      `answerQ${questionNumber}A4`,
                      '',
                    )} */
                  />
                </span>
              </div>
            </div>
          </fieldset>
        </RadioGroup>
      </FormControl>
    </div>

  );
}

export default QuestionCreate;

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
  newQuestions: Question[]
  errorInputMsg: IerrorFormNewQuiz
  handleSetNewQuestions: (questionIndex: number, updatedQuestion: Question) => void
  handleSetQuestionsErrors: (questionIndex: number, updatedQuestionError: QuestionError) => void
}

function QuestionCreate({
  questionNumber, newQuestions,
  errorInputMsg, handleSetNewQuestions, handleSetQuestionsErrors,
}:QuestionCreateProps) {
  // Index de la question (du state tableau newQuestions)
  const questionIndex = questionNumber - 1;

  //* Copie des states (pour pouvoir les modifier)
  // Copie du state des questions
  const copyNewQuestions = newQuestions.map((question) => ({
    ...question,
    answers: question.answers.map((answer) => ({ ...answer })),
  }));
  // Copie du state de la question en cours
  const currentQuestion = { ...copyNewQuestions[questionIndex] };

  // Copie du state des erreurs du formulaire
  const copyErrorInputMsg = {
    ...errorInputMsg,
    questions: errorInputMsg.questions.map((question) => ({
      ...question,
      answers: question.answers.map((answer) => ({ ...answer })),
    })),
  };
    // Copie du state des erreurs de la question en cours
  const questionError = {
    ...copyErrorInputMsg.questions[questionIndex],
    answers:
    [...copyErrorInputMsg.questions[questionIndex].answers.map((answer) => ({ ...answer }))],
  };

  //* Mise à jour du state au remplissage du formulaire
  // answerNb: si différent de 0 alors c'est sur une réponse
  // isRadioBtn: boolean vérifie si on est sur un bouton radio
  const handleChange = (
    event: SyntheticEvent<Element, Event>,
    answerNb = 0,
    isRadioBtn = false,
  ) => {
    // Index de la réponse (du state tableau newQuestions)
    const answerIndex = answerNb - 1;
    // On réccupère et on type la cible de l'évenement
    const target = event.target as HTMLInputElement;

    //* Champs texte de la question
    if (answerNb === 0) {
      // On récupère la valeur de l'input et on l'affecte à la copie du state
      currentQuestion.question = target.value;
      // On efface l'erreur concernant l'input
      questionError.question = '';
    } else if (!isRadioBtn) {
      //* Champs texte des réponses (on exclut les boutons radios)
      currentQuestion.answers[answerIndex].answer = target.value;
      questionError.answers[answerIndex].answer = '';
    } else {
      //* Bouton radio
      // On réinitialise tous les boutons radios en mettant  is_valid:false avec un map
      const updatedAnswers = currentQuestion.answers.map((answer) => ({
        ...answer,
        is_valid: false,
      }));
      currentQuestion.answers = updatedAnswers;
      // On enregistre la nouvelle réponse à true (sélection bouton radio)
      currentQuestion.answers[answerIndex].is_valid = true;
      // On efface l'erreur sur le groupe de boutons radios
      // la sélection d'un bouton indique qu'une réponse sera toujours sélectionnée
      questionError.radioGroup = '';
    }

    //* On met à jour le state avec les données d'une question
    handleSetNewQuestions(questionIndex, currentQuestion);
    //* On réinitialise le message d'erreur de l'input text
    handleSetQuestionsErrors(questionIndex, questionError);
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
        onChange={(event) => handleChange(event)}
        value={currentQuestion.question}
        error={
          questionError.question !== undefined
          && questionError.question !== ''
        }
        helperText={
          questionError.question !== undefined
          && questionError.question !== ''
            ? questionError.question
            : `${currentQuestion.question.length}/150 caractères maximum`
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
                    onChange={(event) => handleChange(event, 1, true)}
                  />
                </span>
                <span className="answer_input-text">
                  <TextField
                    id={`answer1-q${questionNumber}`}
                    label="Réponse 1"
                    variant="outlined"
                    name={`answer1-q${questionNumber}`}
                    fullWidth
                    onChange={(event) => handleChange(event, 1)}
                    value={currentQuestion.answers[0].answer}
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
                    onChange={(event) => handleChange(event, 2, true)}
                    name={`q${questionNumber}Answer2`}
                  />
                </span>
                <span className="answer_input-text">
                  <TextField
                    id={`answer2-q${questionNumber}`}
                    label="Réponse 2"
                    variant="outlined"
                    name={`answer2-q${questionNumber}`}
                    fullWidth
                    onChange={(event) => handleChange(event, 2)}
                    value={currentQuestion.answers[1].answer}
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
                    onChange={(event) => handleChange(event, 3, true)}
                  />
                </span>
                <span className="answer_input-text">
                  <TextField
                    id={`answer3-q${questionNumber}`}
                    label="Réponse 3"
                    variant="outlined"
                    name={`answer3-q${questionNumber}`}
                    fullWidth
                    onChange={(event) => handleChange(event, 3)}
                    value={currentQuestion.answers[2].answer}
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
                    onChange={(event) => handleChange(event, 4, true)}
                  />
                </span>
                <span className="answer_input-text">
                  <TextField
                    id={`answer4-q${questionNumber}`}
                    label="Réponse 4"
                    variant="outlined"
                    name={`answer4-q${questionNumber}`}
                    fullWidth
                    onChange={(event) => handleChange(event, 4)}
                    value={currentQuestion.answers[3].answer}
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

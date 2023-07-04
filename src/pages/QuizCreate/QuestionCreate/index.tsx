import {
  FormControl, RadioGroup, TextField, FormLabel,
} from '@mui/material';
import { SyntheticEvent, useCallback } from 'react';
import { IerrorFormNewQuiz, QuestionError } from '../../../@types/error';
import { Question } from '../../../@types/newQuiz';
import './styles.scss';
import AnswerCreate from '../AnswerCreate';

interface QuestionCreateProps {
  questionIndex: number
  questionData:Question
  errorData: QuestionError
  newQuestions: Question[]
  errorInputMsg: IerrorFormNewQuiz
  handleSetNewQuestions: (questionIndex: number, updatedQuestion: Question) => void
  handleSetQuestionsErrors: (questionIndex: number, updatedQuestionError: QuestionError) => void
  setNewQuestions: (newQuestions: Question[]) => void
  handleChangeAnswer: (event: SyntheticEvent<Element, Event>, indexQuestion: number, indexAnswer: number) => void
}

function QuestionCreate({
  questionIndex, questionData, errorData, newQuestions,
  errorInputMsg, handleSetNewQuestions, handleSetQuestionsErrors,setNewQuestions, handleChangeAnswer
}:QuestionCreateProps) {
  console.log(`QCREATE ${questionIndex}`);
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
  const currentQuestionError = { ...copyErrorInputMsg.questions[questionIndex] };

  //* Déclenche les fonctions pour mettre à jour les states des questions et des erreurs
  const handleStateUpdate = (
    indexQuestion: number,
    questionToUpdate: Question,
    errorToUpdate: QuestionError,
  ) => {
    // Met à jour le state avec les données d'une question
    handleSetNewQuestions(indexQuestion, questionToUpdate);
    // Réinitialise le message d'erreur du champs mis à jour
    handleSetQuestionsErrors(indexQuestion, errorToUpdate);
  };

  // Mise à jour du champs question
  const handleChangeQuestion = (event: SyntheticEvent<Element, Event>, indexQuestion: number) => {
    // Récupère et type la cible de l'évenement
    const target = event.target as HTMLInputElement;
    // Récupère la valeur de l'input et l'affecte à la copie du state
    currentQuestion.question = target.value;
    // Efface l'erreur concernant l'input à la copie du state
    currentQuestionError.question = '';
    // Mise à jour des states
    handleStateUpdate(indexQuestion, currentQuestion, currentQuestionError);
  };

  // //* Mise à jour du champs d'une réponse
  // const handleChangeAnswer = (
  //   event: SyntheticEvent<Element, Event>,
  //   indexQuestion: number,
  //   indexAnswer: number,
  // ) => {
  //   // Récupère et type la cible de l'évenement
  //   const target = event.target as HTMLInputElement;
  //   // Récupère la valeur de l'input et l'affecte à la copie du state
  //   currentQuestion.answers[indexAnswer].answer = target.value;
  //   // Efface l'erreur concernant l'input à la copie du state
  //   currentQuestionError.answers[indexAnswer].answer = '';
  //   // Mise à jour des states
  //   handleStateUpdate(indexQuestion, currentQuestion, currentQuestionError);
  // };

    // //* Mise à jour du champs d'une réponse
    // const handleChangeAnswer = useCallback(
    //   (
    //     event: SyntheticEvent<Element, Event>,
    //     indexQuestion: number,
    //     indexAnswer: number
    //   ) => {
    //     // Récupère et type la cible de l'évenement
    //     const target = event.target as HTMLInputElement;
    //     // Récupère la valeur de l'input et l'affecte à la copie du state
    //     const newValue = target.value;
    //     setNewQuestions((newQuestions: Question[]) =>
    //       newQuestions.map((question, questionIndex) => {
    //         if (questionIndex === indexQuestion) {
    //           return {
    //             ...question,
    //             answers: question.answers.map((answer, answerIndex) => {
    //               if (answerIndex === indexAnswer) {
    //                 return {
    //                   ...answer,
    //                   answer: newValue,
    //                 };
    //               }
    //               return answer;
    //             }),
    //           };
    //         }
    //         return question;
    //       })
    //     );
    //   },
    //   []
    // );

  //* Mise à jour lors de la sélection d'un bouton radio
  const handleChangeRadioBtn = (
    indexQuestion: number,
    indexAnswer: number,
  ) => {
    // Réinitialise tous les boutons radios à false
    const updatedAnswers = currentQuestion.answers.map((answer) => ({
      ...answer,
      is_valid: false,
    }));
    currentQuestion.answers = updatedAnswers;
    // Enregistre la nouvelle réponse à true (sélection bouton radio)
    currentQuestion.answers[indexAnswer].is_valid = true;
    // Efface l'erreur sur le groupe de boutons radios
    // la sélection d'un bouton indique qu'une réponse sera toujours sélectionnée
    currentQuestionError.radioGroup = '';
    // Mise à jour des states
    handleStateUpdate(indexQuestion, currentQuestion, currentQuestionError);
  };

  return (
    <div className="question_container" id={`question${questionIndex + 1}`}>
      <h3 className="question__number">
        Question n°
        {questionIndex + 1}
        /10
      </h3>
      <TextField
        fullWidth
        id={`question-${questionIndex + 1}`}
        label={`Question ${questionIndex + 1}`}
        variant="outlined"
        name={`question${questionIndex + 1}`}
        onChange={(event) => handleChangeQuestion(event, questionIndex)}
        value={questionData.question}
        error={
          errorData.question !== undefined
          && errorData.question !== ''
        }
        helperText={
          errorData.question !== undefined
          && errorData.question !== ''
            ? errorData.question
            : `${questionData.question.length}/150 caractères maximum`
        }
      />
      <FormControl error={currentQuestionError.radioGroup !== undefined
          && currentQuestionError.radioGroup !== ''}
      >
        <FormLabel id="demo-radio-buttons-group-label">Ecrivez les 4 choix de réponses et sélectionner la bonne réponse à la question</FormLabel>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="choose"
          name={`radio-q${questionIndex + 1}`}
        >
          <fieldset>
            {questionData.answers.map((answer, index) => (
              <AnswerCreate
                key={`answer${index + 1}`}
                questionIndex={questionIndex}
                answerIndex={index}
                answer={answer.answer}
                answerErrorData={errorData.answers[index]}
                // onChangeRadio={handleChangeRadioBtn}
                onChangeAnswer={handleChangeAnswer}
              />
            ))}
          </fieldset>
        </RadioGroup>
      </FormControl>
    </div>

  );
}

export default QuestionCreate;

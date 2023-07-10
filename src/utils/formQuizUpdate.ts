import { IerrorFormUpdateQuiz } from "../@types/error";
import { QuestionUp } from "../@types/quizUpdate";
  //* Mises à jour des states lors de la modification des champs
// Mise à jour du state: changement d'une question
export function updateQuestionUpValue(updateQuestions: QuestionUp[], idQuestion: number, newValue: string) {
  return updateQuestions.map((questionObject) => {
    if (questionObject.id === idQuestion) {
      return {
        ...questionObject,
        question: newValue,
      };
    }
    return questionObject;
  });
}

// Mise à jour du state: changement d'une réponse
export function updateAnswerValue(updateQuestions:QuestionUp[] , idQuestion: number, idAnswer: number, newValue:string) {
  return updateQuestions.map((question) => {
    if (question.id === idQuestion) {
      return {
        ...question,
        answers: question.answers.map((answer) => {
          if (answer.id === idAnswer) {
            return {
              ...answer,
              answer: newValue,
            };
          }
          return answer;
        }),
      };
    }
    return question;
  });
}

// Mise à jour du state: changement d'un bouton radio
export function updateRadioBtn(updateQuestions:QuestionUp[] , idQuestion: number, idAnswer: number) {
  return updateQuestions.map((question) => {
    if (question.id === idQuestion) {
      return {
        ...question,
        answers: question.answers.map((answer) => {
          if (answer.id === idAnswer) {
            return {
              ...answer,
              is_valid: true,
            };
          }
          return   {
            ...answer,
            is_valid: false,
          };
        }),
      };
    }
    return question;
  });
}
  //* Mises à jour des states pour supprimer le message d'erreur lors de la modification du champs
  // Mise à jour du state des erreurs si modification d'une question
export function updateQuestionUpError(errorInputMsg: IerrorFormUpdateQuiz, idQuestion: number) {
  return {
    ...errorInputMsg,
    questions: errorInputMsg.questions.map((questionError) => {
      if (questionError.id === idQuestion) {
        return {
          ...questionError,
          question: '',
        };
      }
      return questionError;
    }),
  };
}

 // Mise à jour du state des erreurs si modification d'une réponse
export function updateAnswerError(errorInputMsg: IerrorFormUpdateQuiz, idQuestion: number, idAnswer: number) {
  return {
    ...errorInputMsg,
    questions: errorInputMsg.questions.map((questionError) => {
      if (questionError.id === idQuestion) {
        return {
          ...questionError,
          answers: questionError.answers.map((answerError) => {
            if (answerError.id === idAnswer) {
              return {
                ...answerError,
                answer: '',
              };
            }
            return answerError;
          }),
        };
      }
      return questionError;
    }),
  };
}

  // Mise à jour du state des erreurs si sélection d'un bouton radio 
export function updateRadioBtnError(errorInputMsg: IerrorFormUpdateQuiz, idQuestion: number) {
  return {
    ...errorInputMsg,
    questions: errorInputMsg.questions.map((questionError) => {
      if (questionError.id === idQuestion) {
        return {
          ...questionError,
          radioGroup: '',
        };
      }
      return questionError;
    }),
  }
}

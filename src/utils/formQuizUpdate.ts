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
export function updateAnswerUpValue(updateQuestions:QuestionUp[] , idQuestion: number, idAnswer: number, newValue:string) {
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
export function updateRadioBtnUp(updateQuestions:QuestionUp[] , idQuestion: number, idAnswer: number) {
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
export function updateQuestionUpError(errorsUpdateQuiz: IerrorFormUpdateQuiz, idQuestion: number) {
  return {
    ...errorsUpdateQuiz,
    questions: errorsUpdateQuiz.questions.map((questionError) => {
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
export function updateAnswerError(errorsUpdateQuiz: IerrorFormUpdateQuiz, idQuestion: number, idAnswer: number) {
  return {
    ...errorsUpdateQuiz,
    questions: errorsUpdateQuiz.questions.map((questionError) => {
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
export function updateRadioBtnUpError(errorsUpdateQuiz: IerrorFormUpdateQuiz, idQuestion: number) {
  return {
    ...errorsUpdateQuiz,
    questions: errorsUpdateQuiz.questions.map((questionError) => {
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

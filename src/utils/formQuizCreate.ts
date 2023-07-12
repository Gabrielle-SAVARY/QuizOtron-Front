import { IerrorFormNewQuiz, IerrorFormUpdateQuiz } from "../@types/error";
import { Question } from "../@types/newQuiz";

  //* Mises à jour des states lors de la modification des champs
// Mise à jour du state: changement d'une question
export function updateQuestionValue(newQuestions: Question[], indexQuestion: number, newValue: string) {
  return newQuestions.map((questionObject, index) => {
    if (indexQuestion === index) {
      return {
        ...questionObject,
        question: newValue,
      };
    }
    return questionObject;
  });
}

// Mise à jour du state: changement d'une réponse
export function updateAnswerValue(newQuestions:Question[] , indexQuestion: number, indexAnswer: number, newValue:string) {
  return newQuestions.map((question, index) => {
    if (indexQuestion === index) {
      return {
        ...question,
        answers: question.answers.map((answer, index) => {
          if (indexAnswer === index) {
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
export function updateRadioBtn(newQuestions:Question[] , indexQuestion: number, indexAnswer: number) {
  return newQuestions.map((question, index) => {
    if (indexQuestion === index) {
      return {
        ...question,
        answers: question.answers.map((answer, index) => {
          if (indexAnswer === index) {
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
export function updateQuestionUpError(errorsNewQuiz: IerrorFormNewQuiz, indexQuestion: number) {
  return {
    ...errorsNewQuiz,
    questions: errorsNewQuiz.questions.map((questionError, index) => {
      if (indexQuestion === index) {
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
export function updateAnswerError(errorsNewQuiz: IerrorFormNewQuiz, indexQuestion: number, indexAnswer: number) {
  return {
    ...errorsNewQuiz,
    questions: errorsNewQuiz.questions.map((questionError, index) => {
      if (indexQuestion === index) {
        return {
          ...questionError,
          answers: questionError.answers.map((answerError, index) => {
            if (indexAnswer === index) {
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
export function updateRadioBtnError(errorsNewQuiz: IerrorFormNewQuiz, indexQuestion: number) {
  return {
    ...errorsNewQuiz,
    questions: errorsNewQuiz.questions.map((questionError, index) => {
      if (indexQuestion === index) {
        return {
          ...questionError,
          radioGroup: '',
        };
      }
      return questionError;
    }),
  }
}

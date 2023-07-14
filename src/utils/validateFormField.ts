import { AnswerError, AnswerUpError, IValidationNumberRule, IValidationRule, QuestionError, QuestionUpError, ValidationQuestionResult, ValidationQuestionUpResult, ValidationResult } from '../@types/error';
import { Answer, Question } from '../@types/newQuiz';
import { AnswerUp, QuestionUp } from '../@types/quizUpdate';
import { validateNotEmpty } from './validationsRules';
// TODO supprimer les consoles log

//* Vérification des champs texte
export const validateTextFields = (
  stateData: { [key: string]: string },
  validationRules: IValidationRule[],
): ValidationResult => {
  // Initialisation d'un objet vide qui contiendra les messages d'erreurs
  const errors: { [key: string]: string } = {};
  let hasError = false;

  // Validation des champs du formulaire
  validationRules.forEach((rule) => {
    const { field, validate } = rule;
    const value = stateData[field];
    const error = validate(value);

    // Si erreur, on stocke le message d'erreur dans l'objet errors
    if (error !== '') {
      errors[field] = error;
      if (!hasError) {
        hasError = true;
      }
    } else {
      errors[field] = '';
    }
    console.log('error validateTextFields', error);
  });

  // Si pas d'erreur, on renvoi un objet vide
  return { errors, hasError };
};

//* Vérification des menus déroulants
export const validateMenuSelect = (
  stateData: { [key: string]: number },
  validationRules: IValidationNumberRule[],
):ValidationResult => {
  // Initialisation d'un objet vide qui contiendra les messages d'erreurs
  const errors: { [key: string]: string } = {};
  let hasError = false;

  // Validation des champs du formulaire
  validationRules.forEach((rule) => {
    const { field, validate } = rule;
    const value = stateData[field];
    const error = validate(value);

    // Si erreur, on stocke le message d'erreur dans l'objet errors
    if (error !== '') {
      errors[field] = error;
      if (!hasError) {
        hasError = true;
      }
    } else {
      errors[field] = '';
    }
  });
  // Si pas d'erreur, on renvoi un objet vide
  return { errors, hasError };
};

//* Vérification des questions du formulaire de création d'un quiz
// champs textes et groupe de boutons radio
export const validateQuestions = (stateData: Question[]):ValidationQuestionResult => {
  // Variable qui indique si une erreur est trouvée
  let hasError = false;  
  // Tableau qui contient les erreur de chaque question
  const errors: QuestionError[] = stateData.map((question) => {
    const radioGroupError = getRadioGroupError(question.answers);
    const questionError = validateNotEmpty(question.question);
    // Si une erreur est trouvée, on passe hasError à true
    if (questionError !== '' || radioGroupError !== '') {
      hasError = true;
    }
    // Vérification des réponses
    const { answerErrors, answerHasError} = getNewAnswerErrors(question.answers);
    // Si une erreur est trouvée, on passe hasError à true
    if (answerHasError === true) {
      hasError = true;
    }
    // Retourne les erreurs de la question dans l'objet errors
    return {
      question: questionError,
      radioGroup: radioGroupError,
      answers: answerErrors,      
    };    
  }); 
  return { errors, hasError };
};
// Vérification des réponses
const getNewAnswerErrors = (answers: Answer[]): { answerErrors: AnswerError[], answerHasError: boolean } => {
  let answerHasError = false;
  const answerErrors: AnswerError[] =  answers.map((answer) => {
    const answerError = validateNotEmpty(answer.answer);
    // Si une erreur est trouvée, on passe answerHasError à true
    if (answerError !== '') {
      answerHasError = true;
    }
    return {
      answer: answerError,
    };
  });
  return { answerErrors, answerHasError };
};
// Vérification de la sélection d'un seul bouton radio
const getRadioGroupError = (answers: Answer[] | AnswerUp[]): string => {
  const validAnswers = answers.filter((answer) => answer.is_valid);
  const isRadioSelected = validAnswers.length === 1;
  return isRadioSelected ? '' : 'Veuillez sélectionner la bonne réponse';
};

//* Vérification des questions du formulaire de la mise à jour d'un quiz
// champs textes et groupe de boutons radio
export const validateQuestionsUp = (stateData: QuestionUp[]):ValidationQuestionUpResult => {
  // Variable qui indique si une erreur est trouvée
  let hasError = false;  
  // Tableau qui contient les erreur de chaque question
  const errors: QuestionUpError[] = stateData.map((question) => {
    const radioGroupError = getRadioGroupError(question.answers);
    const questionError = validateNotEmpty(question.question);
    // Si une erreur est trouvée, on passe hasError à true
    if (questionError !== '' || radioGroupError !== '') {
      hasError = true;
    }
    // Vérification des réponses
    const { answerErrors, answerHasError} = getAnswerErrors(question.answers);
    // Si une erreur est trouvée, on passe hasError à true
    if (answerHasError === true) {
      hasError = true;
    }
    // Retourne les erreurs de la question dans l'objet errors
    return {
      id: question.id,
      question: questionError,
      radioGroup: radioGroupError,
      answers: answerErrors,      
    };    
  }); 
  return { errors, hasError };
};

// Vérification des réponses
const getAnswerErrors = (answers: AnswerUp[]): { answerErrors: AnswerUpError[], answerHasError: boolean } => {
  let answerHasError = false;
  const answerErrors: AnswerUpError[] =  answers.map((answer) => {
    const answerError = validateNotEmpty(answer.answer);
    // Si une erreur est trouvée, on passe answerHasError à true
    if (answerError !== '') {
      answerHasError = true;
    }
    return {
      id: answer.id,
      answer: answerError,
    };
  });
  return { answerErrors, answerHasError };
};

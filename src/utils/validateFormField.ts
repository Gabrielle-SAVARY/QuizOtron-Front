import { IValidationNumberRule, IValidationRule, QuestionError } from '../@types/error';
import { Question } from '../@types/newQuiz';
import { validateNotEmpty } from './validationsRules';
// TODO supprimer les consoles log
export interface ValidationResult {
  errors: { [key: string]: string };
  hasError: boolean;
}
export interface ValidationQuestionResult {
  errors:QuestionError[];
  hasError: boolean;
}

// Vérification des champs du formulaire
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

export const validateQuestions = (stateData: Question[]):ValidationQuestionResult => {
  let hasError = false;
  // Initialisation d'un objet vide qui contiendra les messages d'erreurs
  const errors:QuestionError[] = stateData.map((question) => ({
    question: '',
    radioGroup: '',
    answers: question.answers.map(() => ({ answer: '' })),
  }));
  // Pour chaque question
  stateData.forEach((question, indexQuestion) => {
    // Validation de la question
    const questionError = validateNotEmpty(question.question);
    if (questionError !== '') {
      errors[indexQuestion].question = questionError;
      if (!hasError) {
        hasError = true;
      }
    } else {
      errors[indexQuestion].question = '';
    }
    // Validation des réponses
    question.answers.forEach((answer, indexAnswer) => {
      const answerError = validateNotEmpty(answer.answer);
      if (answerError !== '') {
        errors[indexQuestion].answers[indexAnswer].answer = answerError;
        if (!hasError) {
          hasError = true;
        }
      } else {
        errors[indexQuestion].answers[indexAnswer].answer = '';
      }
    });
    // Validation sélection d'un bouton radio
    const isRadioSelected = question.answers.some((answer) => answer.is_valid);
    if (!isRadioSelected) {
      errors[indexQuestion].radioGroup = 'Veuillez sélectionner la bonne réponse';
      if (!hasError) {
        hasError = true;
      }
    } else {
      errors[indexQuestion].radioGroup = '';
    }
  });

  return { errors, hasError };
};

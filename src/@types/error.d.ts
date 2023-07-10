//*Types des messages d'erreurs des inputs de formulaires
// Erreurs formulaire de connexion/login
export interface IerrorFormLogin {
  email: string;
  password: string;
}

// Erreurs des inputs du formulaire d'inscription/register-signUp
export interface IerrorFormRegister {
  firstname: string;
  lastname: string;
  pseudo: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

// Erreurs formulaire création d'un quiz
export interface IerrorFormNewQuiz {
  title: string;
  description: string;
  thumbnail: string;
  tag_id: string;
  level_id: string;
  questions: QuestionError[];
}
export interface QuestionError {
  question: string
  radioGroup: string
  answers: AnswerError[]
}
export interface AnswerError {
  answer: string
}

// Erreur formulaire lors de la mise à jour d'un quiz
export interface IerrorFormUpdateQuiz {
  title: string;
  description: string;
  thumbnail: string;
  tag_id: string;
  level_id: string;
  questions: QuestionUpError[];
}
export interface QuestionUpError {
  id: number
  question: string
  radioGroup: string
  answers: AnswerUpError[]
}
export interface AnswerUpError {
  id: number
  answer: string
}

//*Types des règles de validations des formulaires
// Champs texte
export interface IValidationRule {
  field: string;
  validate: (value: string) => string;
}
// Menus déroulants
export interface IValidationNumberRule {
  field: string;
  validate: (value: number) => string;
}

//*Types des résultats de la validation des formulaires
// Type les résultats de la validation des champs texte
export interface ValidationResult {
  errors: { [key: string]: string };
  hasError: boolean;
}
// Type les résultats de la validation des questions pour la création d'un quiz
export interface ValidationQuestionResult {
  errors:QuestionError[];
  hasError: boolean;
}
// Type les résultats de la validation des questions pour la mise à jour d'un quiz
export interface ValidationQuestionUpResult {
  errors:QuestionUpError[];
  hasError: boolean;
}
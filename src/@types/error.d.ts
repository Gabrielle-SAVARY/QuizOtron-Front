// Type les messages d'erreurs  des inputs du formulaire de connexion/login
export interface IerrorFormLogin {
  email: string;
  password: string;
}

// Type les messages d'erreurs  des inputs du formulaire de d'inscription/register-signUp
export interface IerrorFormRegister {
  firstname: string;
  lastname: string;
  pseudo: string;
  email: string;
  password: string;
  passwordConfirm: string;
}
// Type les messages d'erreurs  des inputs du formulaire de création de quiz
/* export interface IerrorFormNewQuiz {
  [key: string]: string;
}
 */
// Type le tableau des règles de validation pour les formulaires
export interface IValidationRule {
  field: string;
  validate: (value: string) => string;
}
export interface IValidationNumberRule {
  field: string;
  validate: (value: number) => string;
}

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

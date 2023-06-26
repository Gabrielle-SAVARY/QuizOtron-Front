// Type les messages d'erreurs  des inputs du formulaire de connexion/login
export interface IerrorFormLogin {
  email: string;
  password: string;
}
export interface IerrorFormRegister {
  firstname: string
  lastname: string
  pseudo: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export interface IerrorFormNewQuiz {
  title: string
  description: string
  thumbnail: string;
/*   questions: {
    question: string;
    answers: [string, string, string, string];
  }[]; */
}

export interface IValidationRule {
  field: string;
  validate: (value: string) => string;
}

// Type les messages d'erreurs  des inputs du formulaire de connexion/login
export interface IerrorFormLogin {
  email: string;
  password: string;
}

export interface IValidationRule {
  field: string;
  validate: (value: string) => string;
}

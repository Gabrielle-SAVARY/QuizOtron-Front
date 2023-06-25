// Règles de validation du champ `email`
const validateEmail = (value: string): string => {
  if (value.trim() === '') {
    return "L'e-mail ne peut pas être vide.!!!";
  }
  return '';
};

// Règles de validation du champ `mot de passe`
const validatePassword = (value: string): string => {
  if (value.trim() === '') {
    return 'Le mot de passe ne peut pas être vide. !!!';
  } if (value.length < 6 || value.length > 30) {
    return 'Le mot de passe doit comporter entre 6 et 30 caractères !!!.';
  }
  return '';
};

// Tableau des règles de validation pour les champs du formulaire login
export const validationRulesLogin = [
  {
    field: 'email',
    validate: validateEmail,
  },
  {
    field: 'password',
    validate: validatePassword,
  },
];

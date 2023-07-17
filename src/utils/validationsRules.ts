import validator from 'validator';
import { IValidationNumberRule, IValidationRule } from '../@types/error';

// Règles de validation du champ 'email'
const validateEmail = (value: string): string => {
  if (value.trim() === '') {
    return "L'e-mail ne peut pas être vide.";
  }
  if (!validator.isEmail(value)) {
    return "L'e-mail n'est pas valide.";
  }
  return '';
};

// Règles de validation du champ 'mot de passe'
const validatePassword = (value: string): string => {
  if (value.trim() === '') {
    return 'Le mot de passe ne peut pas être vide.';
  }
  if (value.length < 6 || value.length > 30) {
    return 'Le mot de passe doit comporter entre 6 et 30 caractères.';
  }
  return '';
};

// Règles de validation du champ 'confirmation mot de passe'
const validatePasswordConfirm = (value: string): string => {
  if (value.trim() === '') {
    return 'Le mot de passe doit être confirmé, le champs ne peut pas être vide.';
  }
  return '';
};

// Règles de validation du champ 'prénom'
const validateFirstName = (value: string): string => {
  if (value.trim() === '') {
    return 'Le champs "prénom" ne peut pas être vide.';
  }
  if (value.length < 3 || value.length > 30) {
    return 'Le champs "prénom" doit comporter entre 6 et 30 caractères.';
  }
  return '';
};
// Règles de validation du champ 'nom'
const validateLastName = (value: string): string => {
  if (value.trim() === '') {
    return 'Le champs "nom" ne peut pas être vide.';
  }
  if (value.length < 3 || value.length > 30) {
    return 'Le champs "nom" doit comporter entre 6 et 30 caractères.';
  }
  return '';
};
// Règles de validation du champ 'pseudo'
const validatePseudo = (value: string): string => {
  if (value.trim() === '') {
    return 'Le champs "pseudo" ne peut pas être vide.';
  }
  if (value.length < 3 || value.length > 30) {
    return 'Le champs "pseudo" doit comporter entre 6 et 30 caractères.';
  }
  return '';
};

// Règles de validation du champ 'title' d'un quiz
const validateTitle = (value: string): string => {
  console.log('validateTitle', value);

  if (value.trim() === '') {
    return 'Le champs "titre" ne peut pas être vide.';
  }
  if (value.length < 3 || value.length > 150) {
    return 'Le champs "titre" doit comporter entre 6 et 150 caractères.';
  }
  return '';
};
// Règles de validation du champ 'description' d'un quiz
const validateDescription = (value: string): string => {
  if (value.trim() === '') {
    return 'Le champs "description" ne peut pas être vide.';
  }
  if (value.length < 3 || value.length > 300) {
    return 'Le champs "description" doit comporter entre 6 et 300 caractères.';
  }
  return '';
};
// Règles de validation du champ 'thumbnail'/ url de l'image d'un quiz
const validateThumbnail = (value: string): string => {
  if (value.trim() === '') {
    return 'Le champs "image" ne peut pas être vide.';
  }
  return '';
};
// Règles de validation du champ 'tag'/catégorie d'un quiz
const validateCategory = (value: number): string => {
  if (value === 0) {
    return 'Veuillez sélectionner une catégorie.';
  }
  return '';
};
// Règles de validation du champ 'level'/niveau de difficulté d'un quiz
const validateLevel = (value: number): string => {
  if (value === 0) {
    return 'Veuillez sélectionner un niveau de difficulté.';
  }
  return '';
};

// Règles de validation pour les champs de type texte vides (utilisé pour les questions et réponses)
export const validateNotEmpty = (value: string): string => {
  if (value.trim() === '') {
    return 'Le champs ne peut pas être vide.';
  }
  if (value.length < 3 || value.length > 150) {
    return 'Le champs doit comporter entre 3 et 150 caractères.';
  }
  return '';
};

// Tableau des règles de validation pour les formulaires
// formulaire login/connexion
export const validationRulesLogin: IValidationRule[] = [
  {
    field: 'email',
    validate: validateEmail,
  },
  {
    field: 'password',
    validate: validatePassword,
  },
];

// formulaire signup/inscription
export const validationRulesSignup: IValidationRule[] = [
  {
    field: 'firstname',
    validate: validateFirstName,
  },
  {
    field: 'lastname',
    validate: validateLastName,
  },
  {
    field: 'pseudo',
    validate: validatePseudo,
  },
  {
    field: 'email',
    validate: validateEmail,
  },
  {
    field: 'password',
    validate: validatePassword,
  },
  {
    field: 'passwordConfirm',
    validate: validatePasswordConfirm,
  },
];

// formulaire mise à jour des informations de l'utilisateur
export const validationRulesUserUpdate: IValidationRule[] = [
  {
    field: 'emailUpdate',
    validate: validateEmail,
  },
  {
    field: 'pseudoUpdate',
    validate: validatePseudo,
  },
];

// formulaire mise à jour du mot de passe utilisateur
export const validationRulesPasswordUpdate: IValidationRule[] = [
  {
    field: 'oldPassword',
    validate: validatePassword,
  },
  {
    field: 'password',
    validate: validatePassword,
  },
  {
    field: 'passwordConfirm',
    validate: validatePasswordConfirm,
  },
];


// formulaire newQuiz/création d'un quiz
export const validationRulesNewQuiz: IValidationRule[] = [
  {
    field: 'title',
    validate: validateTitle,
  },
  {
    field: 'description',
    validate: validateDescription,
  },
  {
    field: 'thumbnail',
    validate: validateThumbnail,
  },
];

// formulaire newQuiz/création d'un quiz
export const validationRulesSelect: IValidationNumberRule[] = [
  {
    field: 'tag_id',
    validate: validateCategory,
  },
  {
    field: 'level_id',
    validate: validateLevel,
  },

];

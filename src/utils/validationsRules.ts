import { IValidationRule } from '../@types/error';

// Règles de validation du champ 'email'
const validateEmail = (value: string): string => {
  if (value.trim() === '') {
    return "L'e-mail ne peut pas être vide.";
  }
  return '';
};

// Règles de validation du champ 'mot de passe'
const validatePassword = (value: string): string => {
  if (value.trim() === '') {
    return 'Le mot de passe ne peut pas être vide.';
  } if (value.length < 6 || value.length > 30) {
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
  } if (value.length < 3 || value.length > 30) {
    return 'Le champs "prénom" doit comporter entre 6 et 30 caractères.';
  }
  return '';
};
// Règles de validation du champ 'nom'
const validateLastName = (value: string): string => {
  if (value.trim() === '') {
    return 'Le champs "nom" ne peut pas être vide.';
  } if (value.length < 3 || value.length > 30) {
    return 'Le champs "nom" doit comporter entre 6 et 30 caractères.';
  }
  return '';
};
// Règles de validation du champ 'pseudo'
const validatePseudo = (value: string): string => {
  if (value.trim() === '') {
    return 'Le champs "pseudo" ne peut pas être vide.';
  } if (value.length < 3 || value.length > 30) {
    return 'Le champs "pseudo" doit comporter entre 6 et 30 caractères.';
  }
  return '';
};

const validateTitle = (value: string): string => {
  if (value.trim() === '') {
    return 'Le champs "titre" ne peut pas être vide.';
  } if (value.length < 3 || value.length > 150) {
    return 'Le champs "titre" doit comporter entre 6 et 150 caractères.';
  }
  return '';
};
const validateDescription = (value: string): string => {
  if (value.trim() === '') {
    return 'Le champs "description" ne peut pas être vide.';
  } if (value.length < 3 || value.length > 300) {
    return 'Le champs "description" doit comporter entre 6 et 300 caractères.';
  }
  return '';
};
const validateThumbnail = (value: string): string => {
  if (value.trim() === '') {
    return 'Le champs "image" ne peut pas être vide.';
  }
  return '';
};
const validateCategory = (value: number): string => {
  if (value === 0) {
    return 'Sélectionner une catégorie.';
  }
  return '';
};
// Nom des champs texte
/* const findTextFieldName = (value: string): string => {
  let fieldName = '';
  switch (value) {
    case 'firstname':
      fieldName = 'prénom';
      break;
    case 'lastname':
      fieldName = 'nom';
      break;
    case 'pseudo':
      fieldName = 'pseudo';
      break;

    default:
      break;
  }
  // renvoie la valeur de fieldName

  return fieldName;
}; */

/* // Règles de validation des champs texte`
const validateTextField = (value: string): string => {
  const fieldName = findTextFieldName(value);
  console.log('fieldName', fieldName);
  console.log('value validateTextField', value);

  if (value.trim() === '') {
    return `Le champs ${fieldName} ne peut pas être vide.`;
  } if (value.length < 3 || value.length > 30) {
    return `Le champs ${fieldName} doit comporter entre 6 et 30 caractères.`;
  }
  return '';
}; */

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
  /*   {
    field: 'tag_id',
    validate: validateCategory,
  }, */

];

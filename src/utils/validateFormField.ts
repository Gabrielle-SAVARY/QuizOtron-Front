import { IValidationRule } from '../@types/error';

// Vérification des champs du formulaire
export const validateFormFields = (form: HTMLFormElement, validationRules: IValidationRule[]):
{ [key: string]: string } => {
  // Initialisation d'un objet vide qui contiendra les messages d'erreurs
  const errors: { [key: string]: string } = {};

  // Validation des champs du formulaire
  validationRules.forEach((rule) => {
    const { field, validate } = rule;
    const { value } = form[field];
    const error = validate(value);
    console.log('rule', rule);
    console.log('field', field);
    console.log('value', value);
    console.log('error', error);

    // Si erreur, on stocke le message d'erreur dans l'objet errors
    if (error !== '') {
      errors[field] = error;
    }
    console.log('ERRORS', errors);
    console.log('Object.keys(errors)', Object.keys(errors));
    console.log('Object.keys(errors).length', Object.keys(errors).length);
  });
  // Si pas d'erreur, on renvoi un objet vide
  return errors;
};

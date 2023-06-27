import { IValidationRule } from '../@types/error';
// TODO supprimer les consoles log

// Vérification des champs du formulaire
export const validateFormFields = (form: HTMLFormElement, validationRules: IValidationRule[]):
{ [key: string]: string } => {
  console.log('form', form);
  // Initialisation d'un objet vide qui contiendra les messages d'erreurs
  const errors: { [key: string]: string } = {};

  // Validation des champs du formulaire
  validationRules.forEach((rule) => {
    const { field, validate } = rule;
    const { value } = form[field];
    const error = validate(value);
    /*     console.log('rule', rule);
    console.log('field', field);
    console.log('value', value);
    console.log('error', error); */

    // Si erreur, on stocke le message d'erreur dans l'objet errors
    if (error !== '') {
      errors[field] = error;
    }
    /*     console.log('ERRORS', errors);
    console.log('Object.keys(errors)', Object.keys(errors));
    console.log('Object.keys(errors).length', Object.keys(errors).length); */
  });
  // Si pas d'erreur, on renvoi un objet vide
  return errors;
};

// Vérification des champs questions ou réponses du formulaire de quiz
export const validateQuiz = (
  form: HTMLFormElement,
  fieldToValidate: string,
  validationRule:(value: string) => string,
):
{ [key: string]: string } => {
  const errors: { [key: string]: string } = {};

  const fieldNames = Object.keys(form).filter((key) => {
    const element = form[key] as HTMLInputElement;
    return element && element.name && element.name.startsWith(fieldToValidate);
  }).map((key) => {
    const element = form[key] as HTMLInputElement;
    return element.name;
  });

  console.log('fieldNames !!!!!!', fieldNames);

  fieldNames.forEach((name) => {
    const { value } = form[name];
    const error = validationRule(value);

    /*     console.log('name', name);
    console.log('value', value);
    console.log('error', error); */

    // Si erreur, on stocke le message d'erreur dans l'objet errors
    if (error !== '') {
      errors[name] = error;
    }
    /*     console.log('ERRORS', errors);
    console.log('Object.keys(errors)', Object.keys(errors));
    console.log('Object.keys(errors).length', Object.keys(errors).length); */
  });
  return errors;
};

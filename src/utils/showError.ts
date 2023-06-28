import { IerrorFormNewQuiz } from '../@types/error';

export const getError = (
  errorState: IerrorFormNewQuiz,
  fieldName: string,
) => {
  const hasError = errorState[fieldName] !== undefined && errorState[fieldName] !== '';
  return hasError;
};

export const getHelperText = (
  errorState: IerrorFormNewQuiz,
  fieldName: string,
  defaultHelperText: string,
) => {
  const error = getError(errorState, fieldName);
  const helperText = error ? errorState[fieldName] : defaultHelperText;
  return helperText;
};

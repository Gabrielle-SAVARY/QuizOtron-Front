import { IerrorFormNewQuiz } from '../@types/error';

export const getError = (
  errorState: IerrorFormNewQuiz,
  fieldName: keyof IerrorFormNewQuiz,
): boolean => {
  const error = errorState[fieldName] !== undefined && errorState[fieldName] !== '';
  return error;
};

export const getHelperText = (
  errorState: IerrorFormNewQuiz,
  fieldName: keyof IerrorFormNewQuiz,
  defaultHelperText: string,
): string => {
  const error = getError(errorState, fieldName);
  const helperText = error ? errorState[fieldName] : defaultHelperText;
  return helperText;
};

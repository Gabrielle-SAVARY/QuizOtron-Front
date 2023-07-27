import { TextField } from '@mui/material';
import './styles.scss';

interface QuizInfoTextInputProps {
  inputName: string;
  inputLabel: string;
  inputValue: string;
  inputError: string;
  defaultMessage: string;
  handleChangeQuizData: (event: React.ChangeEvent<HTMLInputElement
  | HTMLTextAreaElement>, field: string) => void;
}

function QuizInfoTextInput(
  {
    inputName, inputLabel, inputValue, inputError, defaultMessage, handleChangeQuizData,
  }: QuizInfoTextInputProps,
) {
  // Première lettre en majuscule du label
  const capitalizeInputLabel = inputLabel.charAt(0).toUpperCase() + inputLabel.slice(1);

  return (
    <TextField
      id={`input-${inputName}`}
      label={`${capitalizeInputLabel} du quiz`}
      variant="outlined"
      name={inputName}
      value={inputValue}
      onChange={(event) => handleChangeQuizData(event, inputName)}
      fullWidth
      multiline={inputName === 'description'}
      rows={inputName === 'description' ? 4 : undefined}
      error={
        inputError !== undefined
        && inputError !== ''
      }
      helperText={
        inputError !== undefined
        && inputError !== ''
          ? inputError
          : defaultMessage
      }
    />
  );
}

export default QuizInfoTextInput;

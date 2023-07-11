import { FormControl, FormHelperText, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import './styles.scss';
import { ITag } from '../../@types/tag';
import { ILevel } from '../../@types/level';
import { ChangeEvent } from 'react';

interface QuizMenuDropDownProps {
  arrayList: ITag[] | ILevel[];
  item: string;
  inputLabel: string;
  inputValue: number;
  inputError: string;
  defaultMessage: string;
  handleChangeQuizData: ( event:
    SelectChangeEvent<number> |
    SelectChangeEvent<string> |
    ChangeEvent<HTMLInputElement |
    HTMLTextAreaElement>,
    field: string) => void;

}

function QuizMenuDropDown({arrayList,item, inputLabel,inputValue, inputError,defaultMessage, handleChangeQuizData
}: QuizMenuDropDownProps) {
  // Première lettre en majuscule du label
  const capitalizeInputLabel = inputLabel.charAt(0).toUpperCase() + inputLabel.slice(1);

  const inputName = `${item}_id`

  
  return (
    <FormControl
      required
      error={
        inputError !== undefined
      && inputError !== ''
      }
    >
      <InputLabel id={`label-select-${item}`}>{capitalizeInputLabel}</InputLabel>      
      {/* {selectElement}        */}
      <Select
        id={`select-${item}`}
        className={`select-${item}`}
        name={inputName}
        labelId={`label-select-${item}`}
        label={capitalizeInputLabel}
        value={inputValue}
        onChange={(event) => handleChangeQuizData(event, inputName)}
      >
        <MenuItem disabled value="0">{inputLabel}</MenuItem>
        {arrayList.map((item) => (
          <MenuItem
            key={item.id}
            value={item.id}
            className={`select-${item}`}
          >
            {item.name}
          </MenuItem>
        ))}
      </Select>      
      <FormHelperText>
        {
        inputError !== undefined
        && inputError !== ''
          ? inputError
          : defaultMessage
        }
      </FormHelperText>
    </FormControl>
  );
 
}

export default QuizMenuDropDown;

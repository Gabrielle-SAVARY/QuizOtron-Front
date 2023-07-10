import { FormControl, FormHelperText, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import './styles.scss';
import { ITag } from '../../@types/tag';
import { ILevel } from '../../@types/level';
import { ChangeEvent } from 'react';

interface QuizMenuDropDownProps {
  arrayList: ITag[] | ILevel[];
  formSituation: string;
  selectTheme: string;
  inputName: string;
  inputLabel: string;
  inputValue: number;
  inputError: string;
  handleChangeQuizData: ( event:
    SelectChangeEvent<number> |
    SelectChangeEvent<string> |
    ChangeEvent<HTMLInputElement |
    HTMLTextAreaElement>,
    field: string) => void;

}

function QuizMenuDropDown({arrayList, formSituation,selectTheme, inputName, inputLabel,inputValue, inputError,handleChangeQuizData
}: QuizMenuDropDownProps) {
  // Première lettre en majuscule du label
  const capitalizeInputLabel = inputLabel.charAt(0).toUpperCase() + inputLabel.slice(1);
  console.log('formSituation',formSituation);

  // Label de l'option par défaut du menu déroulant
  const labelDefaultOption = selectTheme === 'tag' ? 'Sélectionner une catégorie' : 'Sélectionner un niveau';

  //Different render pour l'input select en fonction de la situation du formulaire
  let selectElement
  if (formSituation === 'create quiz') {
    selectElement = (
      <Select
        id={`select-${selectTheme}`}
        className={`select-${selectTheme}`}
        name={inputName}
        labelId={`label-select-${selectTheme}`}
        label={capitalizeInputLabel}
        // For create quiz add defautltValue attribute
        defaultValue='choose option' 
        onChange={(event) => handleChangeQuizData(event, inputName)}
      >
      <MenuItem disabled value="choose option">{labelDefaultOption}</MenuItem>
      {arrayList.map((item) => (
        <MenuItem 
        key={item.id} 
        value={item.id} 
        className={`select-${selectTheme}`}
        >
          {item.name}
        </MenuItem>
      ))}
      </Select>
    )  
  } else if (formSituation === 'update quiz') {
    selectElement = (
      <Select
        id={`select-${selectTheme}`}
        className={`select-${selectTheme}`}
        name={inputName}
        labelId={`label-select-${selectTheme}`}
        label={capitalizeInputLabel}
        // For update quiz add value attribute (no defaut value)
        value={inputValue}
        onChange={(event) => handleChangeQuizData(event, inputName)}
      >
        <MenuItem disabled value="choose option">{labelDefaultOption}</MenuItem>
        {arrayList.map((item) => (
          <MenuItem
            key={item.id}
            value={item.id}
            className={`select-${selectTheme}`}
          >
            {item.name}
          </MenuItem>
        ))}
      </Select>      
    )
  }  
  

  return (
    <FormControl
      required
      error={
        inputError !== undefined
      && inputError !== ''
      }
    >
      <InputLabel id={`label-select-${selectTheme}`}>{capitalizeInputLabel}</InputLabel>      
      {selectElement}       
      <FormHelperText>
        {
        inputError !== undefined
        && inputError !== ''
          ? inputError
          : labelDefaultOption
        }
      </FormHelperText>
    </FormControl>
  );
 
}

export default QuizMenuDropDown;

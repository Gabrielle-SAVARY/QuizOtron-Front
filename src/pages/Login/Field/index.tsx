import { ChangeEvent, useId } from 'react';
import './styles.scss';

interface FieldProps {
  value: string;
  type: string;
  placeholder: string;
  onChangeField: (value: string) => void;

}

// TODO à coder et utiliser dans Login et Register pour factoriser
function Field({
  value,
  type,
  placeholder,
  onChangeField,
}: FieldProps) {
  const inputId = useId();

  function handleChangeField(event: ChangeEvent<HTMLInputElement>): void {
    onChangeField(event.target.value);
  }

  return (

    <div className="field">
      <label htmlFor={inputId} className="field__label" />
      <input
        id={inputId}
        type={type}
        value={value}
        onChange={handleChangeField}
        placeholder={placeholder}
        className="field__input"
      />
    </div>

  );
}

export default Field;

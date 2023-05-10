import { ChangeEvent, useId } from 'react';
import './styles.scss';

interface FieldProps {
  placeholderLabel: string;
  value: string;
  type: string;
  placeholder: string;
  onChange: (value: string) => void;

}

function Field({
  value,
  type,
  placeholder,
  placeholderLabel,
  onChange,
}: FieldProps) {
  const inputId = useId();

  function handleChange(event: ChangeEvent<HTMLInputElement>): void {
    onChange(event.target.value);
  }

  return (

    <div className="field">
      <label
        htmlFor={inputId}
        className="field-label"
      >
        {placeholderLabel}
      </label>

      <input
        id={inputId}
        type={type}
        value={value}
        placeholder={placeholder}
        className="field-input"
      />
    </div>

  );
}

export default Field;

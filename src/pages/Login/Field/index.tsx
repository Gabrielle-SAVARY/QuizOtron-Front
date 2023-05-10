import { useId } from 'react';
import './styles.scss';

interface FieldProps {
  placeholderLabel: string;
  value: string;
  type: string;
  placeholder: string;

}

function Field({
  value, type, placeholder, placeholderLabel,
}: FieldProps) {
  const inputId = useId();

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

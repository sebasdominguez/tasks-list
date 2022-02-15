import React, { ChangeEventHandler } from 'react';
import './styles.scss';

export interface InputProps {
  value: string;
  handleChange?: ChangeEventHandler<HTMLInputElement>;
  type: string;
  placeholder?: string;
  disabled?: boolean;
}

export const Input = ({ value, handleChange, type, disabled = false, placeholder }: InputProps) => {
  return (
    <input
      disabled={disabled}
      value={value}
      type={type}
      className={`input ${type ? `input--${type}` : ''}`}
      required={true}
      onChange={handleChange}
      placeholder={placeholder}
    />
  );
};

import React from "react";
import "./styles.scss";

export const Input = ({ value, handleChange, type, disabled, placeholder }) => {
  return (
    <input
      disabled={disabled}
      value={value}
      type={type}
      className={`input ${type ? `input--${type}` : ""}`}
      required={true}
      onChange={handleChange}
      placeholder={placeholder}
    />
  );
};

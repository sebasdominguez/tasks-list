import React from 'react';
/** styles */
import './styles.scss';

interface ButtonProps {
  text: string;
  onClick: () => void;
  className: string;
}

export const Button = ({ onClick, text, className }: ButtonProps) => {
  return (
    <button className={className} onClick={onClick}>
      {text}
    </button>
  );
};

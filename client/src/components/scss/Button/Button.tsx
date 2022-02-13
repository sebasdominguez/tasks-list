import React from 'react';
import './styles.scss';

interface ButtonProps {
  text?: string;
  onClose: () => void;
  className: string;
}

export const Button = ({ onClose, text, className }: ButtonProps) => {
  return (
    <button className={className} onClick={onClose}>
      {text}
    </button>
  );
};

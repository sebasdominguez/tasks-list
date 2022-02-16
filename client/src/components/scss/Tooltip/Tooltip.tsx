import React, { ReactNode } from 'react';
/** styles */
import './styles.scss';

interface TooltipWrapperProps {
  children: ReactNode;
  text: string;
}

export const TooltipWrapper = ({ children, text }: TooltipWrapperProps) => {
  return (
    <div className="tooltip">
      {children}
      <span data-testid="tooltip-text" className="tooltip__text">
        {text}
      </span>
    </div>
  );
};

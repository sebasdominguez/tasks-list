import React from 'react';
/** components */
import { ContentI } from '../interfaces';
/** styles */
import './styles.scss';

interface MessageProps {
  message: ContentI;
}

export const Message = ({ message }: MessageProps) => {
  const { text, visible, status } = message;

  return (
    <div className="message__container">
      {visible && <p className={`message__text ${status ? `message__text--${status}` : ''}`}>{text}</p>}
    </div>
  );
};

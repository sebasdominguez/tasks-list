import React from 'react';
import './styles.scss';

interface ContentMessageProps {
  text: string;
  visible: boolean;
  status: string;
}

interface MessageProps {
  message: ContentMessageProps;
}

export const Message = ({ message }: MessageProps) => {
  const { text, visible, status } = message;

  return (
    <div className="message__container">
      {visible && <p className={`message__text ${status ? `message__text--${status}` : ''}`}>{text}</p>}
    </div>
  );
};

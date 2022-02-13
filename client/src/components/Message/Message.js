import React from "react";
import "./styles.scss";

export const Message = ({ message }) => {
  const { text, visible, status } = message;

  return (
    <div className="message__container">
      {visible && (
        <p
          className={`message__text ${
            status ? `message__text--${status}` : ""
          }`}
        >
          {text}
        </p>
      )}
    </div>
  );
};

import React from "react";
import { Button } from "../scss/index";
import "./styles.scss";

export const TaskCard = ({ content, index, setShowModal }) => {
  return (
    <div
      className={
        content.completed
          ? "card__container card__container--completed"
          : "card__container"
      }
      onClick={() => setShowModal(true)}
    >
      <h3>Task #{index + 1}</h3>
      <p className="card__text">{content.task}</p>
    </div>
  );
};

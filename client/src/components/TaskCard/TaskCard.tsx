import React from "react";
/** interfaces */
import { TaskI } from "../interfaces";
/** styles */
import "./styles.scss";

interface TaskCardProps {
  index: number;
  setShowModal: (status: boolean) => void;
  task: TaskI;
}

export const TaskCard = ({ task, index, setShowModal }: TaskCardProps) => {
  return (
    <div
      datatest-id="task"
      className={
        task.completed
          ? "card__container card__container--completed"
          : "card__container"
      }
      onClick={() => setShowModal(true)}
    >
      <h3>Task #{index + 1}</h3>
      <p className="card__text">{task.task}</p>
    </div>
  );
};

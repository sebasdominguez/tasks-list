import React from "react";
import { Button } from "../scss/index";
import "./styles.scss";

export const ListItem = ({ task, handleUpdate, handleDelete }) => {
  return (
    <label key={task._id} className="task__container">
      <input
        type="checkbox"
        checked={task.completed}
        onClick={() => handleUpdate(task._id)}
      />
      <div
        className={
          task.completed ? "task__item task__item--completed" : "task__item"
        }
      >
        {task.task}
      </div>
      <Button handleDelete={() => handleDelete(task._id)} text={"Remove"} />
    </label>
  );
};

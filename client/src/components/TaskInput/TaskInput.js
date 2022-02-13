import React from "react";
import { Input } from "../scss/index";
import "./styles.scss";

export const TaskInput = ({
  handleSubmit,
  currentTask,
  handleChange,
  message,
}) => {
  return (
    <form
      onSubmit={handleSubmit}
      className="task__container"
      style={{ margin: "15px 0" }}
    >
      <Input
        value={currentTask}
        handleChange={handleChange}
        type={"text"}
        placeholder={"Write a task here..."}
      />
      <Input disabled={message.visible} type={"submit"} value="Add task" />
    </form>
  );
};

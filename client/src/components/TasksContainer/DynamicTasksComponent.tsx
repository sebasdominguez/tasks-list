import React, { Fragment, ChangeEventHandler } from "react";
/** components */
import { TaskList } from "../TaskList/TaskList";
/** interfaces */
import { TaskI, ContentI } from "../interfaces";
/** styles */
import "./styles.scss";
import { Message } from "..";

export interface DynamicTasksProps {
  tasks: TaskI[];
  setContentModal: (content: TaskI) => void;
  handleSubmit: ChangeEventHandler<HTMLFormElement>;
  handleChange: ChangeEventHandler<HTMLInputElement>;
  message: ContentI;
  quantity: string;
}

export const DynamicTasksComponent = React.memo(
  ({
    tasks,
    setContentModal,
    handleChange,
    handleSubmit,
    quantity,
    message,
  }: DynamicTasksProps) => {
    return (
      <Fragment>
        <header>
          <h1 className="heading heading--1">DYNAMIC TASK LIST</h1>
          <h2 className="heading heading--2">
            Place the TOTAL quantity of tasks you want. First time is 3
          </h2>
          <form onSubmit={handleSubmit} className="quantity__container">
            <input type="number" onChange={handleChange} value={quantity} />
            <input type="submit" value="GET!" />
          </form>
          {message?.text && <Message message={message} />}
        </header>
        <TaskList tasks={tasks} setContentModal={setContentModal} />
      </Fragment>
    );
  }
);

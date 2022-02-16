import React, { ChangeEventHandler } from 'react';
/** components */
import { TaskInput } from '..';
import { TaskList } from '../TaskList/TaskList';
/** interfaces */
import { TaskI, ContentI } from '../interfaces';
/** styles */
import './styles.scss';

export interface DynamicTasksProps {
  tasks: TaskI[];
  setContentModal: (content: TaskI) => void;
  message: ContentI;
  handleSubmit: ChangeEventHandler<HTMLFormElement>;
  currentTask: string;
  handleChange: ChangeEventHandler<HTMLInputElement>;
  tooltipText: boolean;
}

export const CustomTasksComponent = ({
  handleSubmit,
  currentTask,
  handleChange,
  message,
  tooltipText,
  tasks,
  setContentModal,
}: DynamicTasksProps) => {
  return (
    <header>
      <h1 className="heading heading--1">YOUR CUSTOM TASK LIST</h1>
      <TaskInput
        handleSubmit={handleSubmit}
        currentTask={currentTask}
        handleChange={handleChange}
        message={message}
        tooltipText={tooltipText}
      />
      <TaskList tasks={tasks} setContentModal={setContentModal} />
    </header>
  );
};

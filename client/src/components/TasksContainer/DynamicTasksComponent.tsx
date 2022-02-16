import React, { Fragment } from 'react';
/** components */
import { TaskList } from '../TaskList/TaskList';
/** interfaces */
import { TaskI } from '../interfaces';
/** styles */
import './styles.scss';

export interface DynamicTasksProps {
  tasks: TaskI[];
  setContentModal: (content: TaskI) => void;
}

export const DynamicTasksComponent = ({ tasks, setContentModal }: DynamicTasksProps) => {
  return (
    <Fragment>
      <header>
        <h1 className="heading heading--1">DYNAMIC TASK LIST</h1>
        <h2 className="heading heading--2">
          Place the quantity of tasks you want in the params of the url. Default is 3
        </h2>
      </header>
      <TaskList tasks={tasks} setContentModal={setContentModal} />
    </Fragment>
  );
};

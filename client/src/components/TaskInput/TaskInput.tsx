/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FormEventHandler } from 'react';
import { Input } from '../scss/index';

import './styles.scss';

interface TaskInputProps {
  handleSubmit: FormEventHandler<HTMLFormElement>;
  currentTask: string;
  handleChange: ({ currentTarget: input }: { currentTarget: any }) => void;
  message: { visible: boolean };
}
export const TaskInput = ({ handleSubmit, currentTask, handleChange, message }: TaskInputProps) => {
  return (
    <form onSubmit={handleSubmit} className="task__container" style={{ margin: '15px 0' }}>
      <Input value={currentTask} handleChange={handleChange} type={'text'} placeholder={'Write a task here...'} />
      <Input disabled={message.visible} type={'submit'} value="Add task" />
    </form>
  );
};

/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ChangeEventHandler } from 'react';
/** components */
import { Input, TooltipWrapper } from '../scss/index';
import { Message } from '..';
/** interfaces */
import { ContentI } from '../interfaces';
/** styles */
import './styles.scss';

interface TaskInputProps {
  handleSubmit: ChangeEventHandler<HTMLFormElement>;
  currentTask: string;
  handleChange: ChangeEventHandler<HTMLInputElement>;
  message: ContentI;
  tooltipText: boolean;
}

export const TaskInput = ({ handleSubmit, currentTask, handleChange, message, tooltipText }: TaskInputProps) => {
  return (
    <form data-testid="form-element" onSubmit={handleSubmit} className="task__container" style={{ margin: '15px 0' }}>
      <div className="input__container">
        <Input value={currentTask} handleChange={handleChange} type={'text'} placeholder={'Write a task here...'} />
        {tooltipText ? (
          <TooltipWrapper text="Please wait">
            <Input disabled={message.visible} type={'submit'} value="Add task" />
          </TooltipWrapper>
        ) : (
          <Input disabled={message.visible} type={'submit'} value="Add task" />
        )}
      </div>
      {message?.text && <Message message={message} />}
    </form>
  );
};

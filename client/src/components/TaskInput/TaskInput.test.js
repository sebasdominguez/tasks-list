import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TaskInput } from './TaskInput';

describe('TaskInput works as expected', () => {
  const placeholder = 'Write a task here...';
  const onSubmit = jest.fn();
  const onChange = jest.fn();

  beforeEach(() => {
    render(
      <TaskInput
        handleSubmit={onSubmit}
        currentTask="121SDSD"
        handleChange={onChange}
        message={{ visible: true }}
        tooltipText=""
      />,
    );
  });

  test('TaskInput has a placeholder', () => {
    expect(screen.getByPlaceholderText(placeholder)).toBeInTheDocument();
  });

  test('Task can be submited & input field is modifiable', () => {
    const form = screen.getByTestId('form-element');
    expect(onSubmit).not.toHaveBeenCalled();
    fireEvent.submit(form, {});
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });
});

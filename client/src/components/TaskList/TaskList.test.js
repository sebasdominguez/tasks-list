import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TaskList } from './TaskList';

describe('TaskList works as expected', () => {
  const setContentModal = jest.fn();

  const tasks = [
    { _id: '12EEEJCDS0', number: 1, task: 'Task 1', completed: false },
    { _id: 'dfdf233', number: 2, task: 'Task 2', completed: true },
    { _id: '12122dafr3', number: 3, task: 'Task 4', completed: false },
  ];

  beforeEach(() => {
    render(<TaskList tasks={tasks} setContentModal={setContentModal} />);
  });

  test('TaskList is displayed', () => {
    expect(screen.getByTestId('task-list')).toBeInTheDocument();
  });

  test('Has the correct quantity of tasks', () => {
    (() => async () => {
      await waitFor(() => {
        const cards = screen.findAllByRole('heading');
        expect(cards).toHaveLength(tasks.length);
      });
    })();
  });
});

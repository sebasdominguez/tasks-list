import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TaskCard } from './TaskCard';

describe('TaskCard works as expected', () => {
  const task = {
    number: 1,
    _id: 'SDSD223sdsa',
    completed: false,
    task: 'this is a test',
  };

  test('TaskCard is displayed', () => {
    render(<TaskCard task={task} index={3} />);
    expect(screen.getByText('Task #', { exact: false })).toBeInTheDocument();
    expect(screen.getByText('this is a test')).toBeInTheDocument();
  });
});

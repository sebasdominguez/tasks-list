import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Modal } from './Modal';

describe('Modal works as expected', () => {
  const content = {
    number: 1,
    _id: 'SDSD223sdsa',
    completed: false,
    task: 'task',
  };

  test('Modal is displayed', () => {
    render(<Modal content={content} />);
    expect(screen.getByText('Task #', { exact: false })).toBeInTheDocument();
  });
});

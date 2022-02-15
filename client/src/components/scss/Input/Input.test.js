import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Input } from './Input';

describe('Input works as expected', () => {
  test('Input is displayed', () => {
    render(<Input />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  test('Input is disabled', () => {
    render(<Input disabled />);
    expect(screen.getByRole('textbox')).toHaveAttribute('disabled');
  });
});

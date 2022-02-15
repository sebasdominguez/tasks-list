import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Button } from './Button';

describe('Button works as expected', () => {
  test('Button is displayed', () => {
    render(<Button />);
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeEnabled();
  });

  test('Button is clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick} />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('Button has dynamic text', () => {
    render(<Button text="test text" />);
    const textToFind = 'test text';
    const buttonText = screen.getByText(textToFind);
    buttonText.value = textToFind;
  });
});

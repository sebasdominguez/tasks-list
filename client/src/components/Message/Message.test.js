import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Message } from './Message';

describe('Message works as expected', () => {
  test('Message has dynamic text and is visible', () => {
    const props = { text: 'message', visible: true, status: 'success' };
    render(<Message message={{ ...props }} />);
    expect(screen.getByText('message')).toBeInTheDocument();
  });

  test('Message is not displayed wyen visible is false', () => {
    const props = { text: 'message', visible: false, status: 'success' };
    render(<Message message={{ ...props }} />);
    expect(() => screen.getByText('message')).toThrow();
  });
});

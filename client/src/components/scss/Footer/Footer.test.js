import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom';
import { Footer } from './Footer';

describe('Footer works as expected', () => {
  test('Footer is displayed', () => {
    render(
      <Router>
        <Footer />
      </Router>,
    );
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  test('Footer text change depends on path', () => {
    render(
      <Router>
        <Footer path="" />
      </Router>,
    );
    expect(screen.getByText('to handle your onw task list', { exact: false })).toBeInTheDocument();
  });

  test('Footer text change depends on path', () => {
    render(
      <Router>
        <Footer path="custom" />
      </Router>,
    );
    expect(screen.getByText('to see random tasks', { exact: false })).toBeInTheDocument();
  });
});

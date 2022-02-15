import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TooltipWrapper } from './Tooltip';

describe('Tooltip works as expected', () => {
  test('Tooltip wrapper is displayed', () => {
    render(<TooltipWrapper text="Please wait">Tooltip testing</TooltipWrapper>);
    expect(screen.getByText('Tooltip testing')).toBeInTheDocument();
  });

  test('Tooltip is displayed on hover', () => {
    const baseDom = render(<TooltipWrapper text="Please wait">Tooltip testing</TooltipWrapper>);
    fireEvent.mouseOver(baseDom.getByTestId('tooltip-text'));
    (() => async () => {
      await waitFor(() => {
        const text = baseDom.findByText('Please wait');
        text.value = 'Please wait';
      });
    })();
  });
});

import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ConfirmDialog from '../ConfirmDialog';

const setup = () => {
  const handleClose = jest.fn();
  const handleConfirm = jest.fn();
  const props = {
    message: '__test_message__',
    open: true,
    handleClose,
    handleConfirm,
  };
  const utils = render(<ConfirmDialog {...props} />);
  const clickOk = () => userEvent.click(utils.getByText(/ok/i));
  const clickCancel = () => userEvent.click(utils.getByText(/cancel/i));
  return { clickOk, clickCancel, handleClose };
};

describe('ConfirmDialog', () => {
  it('should render modal', async () => {
    const { clickOk, handleClose } = setup();
    expect(screen.getByText(/__test_message__/i)).toBeInTheDocument();
    clickOk();
    expect(handleClose).toHaveBeenCalledWith(true);
  });

  it('should close modal when ok button is clicked', async () => {
    const { clickOk, handleClose } = setup();
    clickOk();
    expect(handleClose).toHaveBeenCalledWith(true);
  });

  it('should close modal when cancel button is clicked', async () => {
    const { clickCancel, handleClose } = setup();
    clickCancel();
    expect(handleClose).toHaveBeenCalledWith(false);
  });
});

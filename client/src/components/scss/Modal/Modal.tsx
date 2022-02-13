import React, { useEffect, Fragment } from 'react';
import { Button } from '../index';
import './styles.scss';

interface Content {
  number: number | undefined;
  _id: string;
  task: string;
  completed: boolean;
}

interface ModalProps {
  onClose: (id?: string) => void;
  handleUpdate: (id: string) => void;
  handleDelete: (id: string) => void;
  content: Content;
}

export const Modal = ({ content, onClose, handleUpdate, handleDelete }: ModalProps) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const closeOnEscapeKeyDown = (_e: any) => {
    if ((_e.charCode || _e.keyCode) === 27) {
      onClose();
    }
  };

  useEffect(() => {
    document.body.addEventListener('keydown', closeOnEscapeKeyDown);
    return function cleanup() {
      document.body.removeEventListener('keydown', closeOnEscapeKeyDown);
    };
  });

  return (
    <Fragment>
      <div className="modal__bg" onClick={() => onClose()} />
      <div className="modal--centered">
        <div className="modal">
          <div className="modal__header">
            <h5>Task #{content.number}</h5>
          </div>
          <Button onClose={() => onClose(content._id)} className="modal__close" />
          <button className="modal__close" onClick={() => onClose()}>
            <span style={{ marginBottom: '-3px' }}>X</span>
          </button>
          <div className="modal__content">{content.task} </div>
          <div className="modal__actions">
            <div className="modal__actions-container">
              <button className="modal__delete-btn" onClick={() => handleDelete(content._id)}>
                Remove
              </button>
              <button className="modal__update-btn" onClick={() => handleUpdate(content._id)}>
                {!content.completed ? 'Completed!' : 'Reset'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Modal;

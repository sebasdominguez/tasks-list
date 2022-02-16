import React, { useEffect, Fragment } from 'react';
/** components */
import { Button } from '../index';
/** styles */
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
  param: string;
}

export const Modal = ({ content, onClose, handleUpdate, handleDelete, param }: ModalProps) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const closeOnEscapeKeyDown = (_e: any) => {
    if (_e.key === 'Escape') {
      onClose();
    }
  };

  useEffect(() => {
    document.body.addEventListener('keydown', closeOnEscapeKeyDown);
    return function cleanup() {
      document.body.removeEventListener('keydown', closeOnEscapeKeyDown);
    };
  });

  console.log('render modal');

  return (
    <Fragment>
      <div className="modal__bg" onClick={() => onClose()} />
      <div className="modal--centered">
        <div className="modal">
          <div className="modal__header">
            <h5>Task #{content.number}</h5>
          </div>
          <Button onClick={() => onClose(content._id)} className="modal__close" text="X" />
          <div className="modal__content">{content.task} </div>
          <div className="modal__actions">
            <div className="modal__actions-container">
              {param === 'custom' ? (
                <Button onClick={() => handleDelete(content._id)} className="modal__delete" text="Remove" />
              ) : (
                <Button onClick={() => onClose(content._id)} className="modal__delete" text="Close" />
              )}
              <Button
                onClick={() => handleUpdate(content._id)}
                className="modal__update"
                text={!content.completed ? 'Completed!' : 'Reset'}
              />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Modal;

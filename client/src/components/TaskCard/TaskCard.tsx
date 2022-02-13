import React from 'react';
import './styles.scss';

interface Content {
  number?: number;
  _id: string;
  task?: string;
  completed: boolean;
}

interface TaskCardProps {
  index: number;
  setShowModal: (status: boolean) => void;
  content: Content;
}

export const TaskCard = ({ content, index, setShowModal }: TaskCardProps) => {
  return (
    <div
      className={content.completed ? 'card__container card__container--completed' : 'card__container'}
      onClick={() => setShowModal(true)}
    >
      <h3>Task #{index + 1}</h3>
      <p className="card__text">{content.task}</p>
    </div>
  );
};

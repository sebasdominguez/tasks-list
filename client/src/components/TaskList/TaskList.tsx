import React from "react";
/** components */
import { TaskCard } from "..";
/** interfaces */
import { TaskI } from "../interfaces";
/** styles */
import "./styles.scss";

interface TaskListProps {
  tasks: TaskI[];
  setContentModal: (content: TaskI) => void;
}

export const TaskList = React.memo(
  ({ setContentModal, tasks }: TaskListProps) => {
    return (
      <main data-testid="task-list" className="tasklist">
        {tasks?.length > 0 &&
          tasks.map((task, index: number) => (
            <TaskCard
              key={task._id}
              index={index}
              task={task}
              setShowModal={() =>
                setContentModal({ ...task, number: index + 1 })
              }
            />
          ))}
      </main>
    );
  }
);

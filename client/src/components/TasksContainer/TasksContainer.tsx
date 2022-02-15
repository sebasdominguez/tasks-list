import React, { useState, useEffect, Fragment, ChangeEvent, SetStateAction, Dispatch } from 'react';
import { addTask, getTasks, updateTask, deleteTask } from '../../services/taskServices';
import { Modal } from '../scss';
import { TaskCard, Message, TaskInput } from '..';
import './styles.scss';

interface Task {
  _id: string;
  number: number | undefined;
  task: string;
  completed: boolean;
}

interface Message {
  text: string;
  status: string;
  visible: boolean;
}

const createMessage = (setState: Dispatch<SetStateAction<Message>>, text: string, visible: boolean, status: string) => {
  setState({
    text,
    visible,
    status,
  });
};

const resetContentModal = (setState: Dispatch<SetStateAction<Task>>) => {
  setState({
    number: undefined,
    _id: '',
    task: '',
    completed: false,
  });
};

export const Tasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [message, setMessage] = useState<Message>({
    text: '',
    visible: false,
    status: '',
  });
  const [currentTask, setCurrentTask] = useState('');
  const [contentModal, setContentModal] = useState<Task>({
    number: undefined,
    _id: '',
    task: '',
    completed: false,
  });

  useEffect(() => {
    (async function getData() {
      try {
        createMessage(setMessage, 'Loading tasks...', true, 'info');
        const { data } = await getTasks();
        setTasks(data);
        createMessage(setMessage, '', false, '');
      } catch (error) {
        handleMessage('Failed to get tasks. Try again', 'error');
        console.error(error);
      }
    })();
  }, []);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCurrentTask(event.currentTarget.value);
  };

  const handleSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const { data } = await addTask({ task: currentTask });
      if (data.status === 400) {
        handleMessage(data.message, 'error');
      } else {
        setTasks((prevTasks) => [...prevTasks, data]);
        handleMessage('Task created!', 'success');
      }
    } catch (error) {
      console.error(error);
      handleMessage('Task not created, try again.', 'error');
    }
  };

  const handleUpdate = async (currentTask: string) => {
    const newTasks = [...tasks];
    try {
      const index = newTasks.findIndex((task) => task._id === currentTask);
      newTasks[index] = { ...newTasks[index] };
      newTasks[index].completed = !newTasks[index].completed;
      await updateTask(currentTask, {
        completed: newTasks[index].completed,
      });
      setTasks(newTasks);
      resetContentModal(setContentModal);
    } catch (error) {
      setTasks(tasks);
      console.error(error);
      handleMessage('Task not updated, try again.', 'error');
    }
  };

  const handleDelete = async (currentTask: string) => {
    try {
      const { data } = await deleteTask(currentTask);
      resetContentModal(setContentModal);
      setTasks(data);
    } catch (error) {
      console.error(error);
      handleMessage('Task not deleted, try again.', 'error');
    }
  };

  const handleMessage = (text: string, status: string) => {
    setCurrentTask('');
    createMessage(setMessage, text, true, status);
    setTimeout(() => {
      createMessage(setMessage, '', false, '');
    }, 2000);
  };

  return (
    <Fragment>
      <TaskInput
        handleSubmit={handleSubmit}
        currentTask={currentTask}
        handleChange={handleChange}
        message={message}
        tooltipText={!!message.text}
      />
      {message?.text && <Message message={message} />}
      <div className="tasklist">
        {tasks.map((task, index: number) => (
          <TaskCard
            key={task._id}
            index={index}
            content={task}
            setShowModal={() => setContentModal({ ...task, number: index + 1 })}
          />
        ))}
      </div>
      {contentModal?._id && (
        <Modal
          content={contentModal}
          onClose={() =>
            setContentModal({
              number: undefined,
              _id: '',
              task: '',
              completed: false,
            })
          }
          handleUpdate={handleUpdate}
          handleDelete={handleDelete}
        />
      )}
    </Fragment>
  );
};

/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, Fragment } from 'react';
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
        const { data } = await getTasks();
        setTasks(data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = ({ currentTarget: input }: any) => {
    setCurrentTask(input.value);
  };

  const handleSubmit = async (event: any) => {
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
      setContentModal({
        number: undefined,
        _id: '',
        task: '',
        completed: false,
      });
    } catch (error) {
      setTasks(tasks);
      console.error(error);
    }
  };

  const handleDelete = async (currentTask: string) => {
    try {
      const { data } = await deleteTask(currentTask);
      setContentModal({
        number: undefined,
        _id: '',
        task: '',
        completed: false,
      });
      setTasks(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleMessage = (text: string, status: string) => {
    setCurrentTask('');
    setMessage({
      text,
      visible: true,
      status,
    });
    setTimeout(() => {
      setMessage({
        text: '',
        visible: false,
        status: '',
      });
    }, 2000);
  };

  return (
    <Fragment>
      <TaskInput handleSubmit={handleSubmit} currentTask={currentTask} handleChange={handleChange} message={message} />
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

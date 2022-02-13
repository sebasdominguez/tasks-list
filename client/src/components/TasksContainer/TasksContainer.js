import { useState, useEffect, Fragment } from "react";
import {
  addTask,
  getTasks,
  updateTask,
  deleteTask,
} from "../../services/taskServices";
import { Modal } from "../scss";
import { TaskCard, Message, TaskInput } from "..";
import "./styles.scss";

export const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [message, setMessage] = useState({
    text: "",
    visible: false,
    status: "",
  });
  const [currentTask, setCurrentTask] = useState("");
  const [contentModal, setContentModal] = useState({});

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

  const handleChange = ({ currentTarget: input }) => {
    setCurrentTask(input.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await addTask({ task: currentTask });
      if (data.status === 400) {
        handleMessage(data.message, "error");
      } else {
        setTasks((prevTasks) => [...prevTasks, data]);
        handleMessage("Task created!", "success");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = async (currentTask) => {
    const newTasks = [...tasks];
    try {
      const index = newTasks.findIndex((task) => task._id === currentTask);
      newTasks[index] = { ...newTasks[index] };
      newTasks[index].completed = !newTasks[index].completed;
      await updateTask(currentTask, {
        completed: newTasks[index].completed,
      });
      setTasks(newTasks);
      setContentModal({});
    } catch (error) {
      setTasks(tasks);
      console.error(error);
    }
  };

  const handleDelete = async (currentTask) => {
    try {
      const { data } = await deleteTask(currentTask);
      setContentModal({});
      setTasks(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleMessage = (text, status) => {
    setCurrentTask("");
    setMessage({
      text,
      visible: true,
      status,
    });
    setTimeout(() => {
      setMessage({
        text: "",
        visible: false,
        status: "",
      });
    }, 2000);
  };

  return (
    <Fragment>
      <TaskInput
        handleSubmit={handleSubmit}
        currentTask={currentTask}
        handleChange={handleChange}
        message={message}
      />
      {message?.text && <Message message={message} />}
      <div className="tasklist">
        {tasks.map((task, index) => (
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
          onClose={() => setContentModal({})}
          handleUpdate={handleUpdate}
          handleDelete={handleDelete}
        />
      )}
    </Fragment>
  );
};

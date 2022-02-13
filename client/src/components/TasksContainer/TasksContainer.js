import { useState, useEffect, Fragment } from "react";
import {
  addTask,
  getTasks,
  updateTask,
  deleteTask,
} from "../../services/taskServices";
import { ListItem, Message, TaskInput } from "..";
import "./styles.scss";

export const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [message, setMessage] = useState({
    text: "",
    visible: false,
    status: "",
  });
  const [currentTask, setCurrentTask] = useState("");

  useEffect(() => {
    (async function getData() {
      try {
        const { data } = await getTasks();
        setTasks(data);
      } catch (error) {
        console.log(error);
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
      console.log("data", data);
      if (data.status === 400) {
        handleMessage(data.message, "error");
      } else {
        setTasks((prevTasks) => [...prevTasks, data]);
        handleMessage("Task created!", "success");
        setCurrentTask("");
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
    } catch (error) {
      setTasks(tasks);
      console.log(error);
    }
  };

  const handleDelete = async (currentTask) => {
    try {
      const { data } = await deleteTask(currentTask);
      setTasks(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleMessage = (text, status) => {
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
        {tasks.map((task) => (
          <ListItem
            task={task}
            handleUpdate={handleUpdate}
            handleDelete={handleDelete}
          />
        ))}
      </div>
    </Fragment>
  );
};

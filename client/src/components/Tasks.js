import { useState, useEffect } from "react";
import {
  addTask,
  getTasks,
  updateTask,
  deleteTask,
} from "../services/taskServices";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
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
      setTasks((prevTasks) => [...prevTasks, data]);
      setCurrentTask("");
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
    console.log(currentTask);
    const newTasks = [...tasks];
    try {
      const data = await deleteTask(currentTask);
      console.log("tasksAfterDelete", data);
      // const tasks = newTasks.filter((task) => task._id !== currentTask);
      //  setTasks(data);
    } catch (error) {
      setTasks(newTasks);
      console.error(error);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex"
        style={{ margin: "15px 0" }}
      >
        <input
          type="text"
          style={{ width: "80%" }}
          value={currentTask}
          required={true}
          onChange={handleChange}
          placeholder="Add New TO-DO"
        />
        <input style={{ height: "40px" }} type="submit" />
      </form>
      <div>
        {tasks.map((task) => (
          <div key={task._id} className="flex task_container">
            <input
              type="checkbox"
              checked={task.completed}
              onClick={() => handleUpdate(task._id)}
            />
            <div className={task.completed ? "task line_through" : "task"}>
              {task.task}
            </div>
            <button onClick={() => handleDelete(task._id)}>delete</button>
          </div>
        ))}
      </div>
    </>
  );
};

export default Tasks;

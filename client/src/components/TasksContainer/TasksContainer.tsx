import React, {
  useState,
  useEffect,
  ChangeEvent,
  SetStateAction,
  Dispatch,
} from "react";

import { useParams } from "react-router-dom";

import {
  addTask,
  getTasks,
  updateTask,
  deleteTask,
} from "../../services/taskServices";
import { CustomTasksComponent as CustomTasks } from "./CustomTasksComponent";
import { DynamicTasksComponent as DynamicTasks } from "./DynamicTasksComponent";

import { TaskI, MessageI } from "../interfaces";

import { Modal, Footer } from "../scss";
import "./styles.scss";

/* Utils functions here to avoid redeclare them when re-render */
const createMessage = (
  setState: Dispatch<SetStateAction<MessageI>>,
  text: string,
  visible: boolean,
  status: string
) => {
  setState({
    text,
    visible,
    status,
  });
};

const resetContentModal = (setState: Dispatch<SetStateAction<TaskI>>) => {
  setState({
    number: undefined,
    _id: "",
    task: "",
    completed: false,
  });
};

const checkParamAndSetState = async (
  params: { param?: string },
  setState: Dispatch<SetStateAction<TaskI[]>>,
  quantity: string,
  setMessage: Dispatch<SetStateAction<MessageI>>,
  handleMessage: (text: string, status: string) => void,
  firstRender: boolean
) => {
  if (params.param === "custom") {
    const { data } = await getTasks(params.param, firstRender);
    console.log("data", data);
    setState(data);
    createMessage(setMessage, "", false, "");
  } else {
    const data = await getTasks(quantity, firstRender);
    console.log("DATADATA", data);
    if (data.status === 201 && data.data) {
      console.log(data.data.message);
      setState(data.data.tasks);
      data.data.message
        ? handleMessage(data.data.message, "error")
        : createMessage(setMessage, "", false, "");
    } else if (data.status === 200) {
      setState(data.data);
      createMessage(setMessage, "", false, "");
    }
  }
};

const getData = async (
  setMessage: Dispatch<SetStateAction<MessageI>>,
  params: { param?: string | undefined },
  setTasks: Dispatch<SetStateAction<TaskI[]>>,
  handleMessage: (text: string, status: string) => void,
  quantity: string,
  firstRender: boolean
) => {
  try {
    createMessage(setMessage, "Loading tasks...", true, "info");
    checkParamAndSetState(
      params,
      setTasks,
      quantity,
      setMessage,
      handleMessage,
      firstRender
    );
  } catch (error) {
    handleMessage("Failed to get tasks. Try again", "error");
    console.error(error);
  }
};

/* Main Container Component */
export const Tasks = () => {
  const [tasks, setTasks] = useState<TaskI[]>([]);
  const [message, setMessage] = useState<MessageI>({
    text: "",
    visible: false,
    status: "",
  });
  const [currentTask, setCurrentTask] = useState("");
  const [contentModal, setContentModal] = useState<TaskI>({
    number: undefined,
    _id: "",
    task: "",
    completed: false,
  });
  const [quantity, setQuantity] = useState("3");
  const params = useParams();

  /* Start handlers to custom tasks */
  const handleChangeCustom = (event: ChangeEvent<HTMLInputElement>) => {
    setCurrentTask(event.currentTarget.value);
  };

  const handleSubmitCustom = async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const { data } = await addTask({ task: currentTask });
      if (data.status === 400) {
        handleMessage(data.message, "error");
      } else {
        // Add the new tasks to the exising ones, or put ir alone
        let newTasks = [];
        if (tasks.length > 0) {
          newTasks = [...tasks, data];
        } else {
          newTasks = [data];
        }
        setTasks(newTasks);
        handleMessage("Task created!", "success");
      }
    } catch (error) {
      console.error(error);
      handleMessage("Task not created, try again.", "error");
    }
  };
  /* End handlers to custom tasks */

  /* Start handlers to dynamic tasks */
  const handleChangeDynamic = (event: ChangeEvent<HTMLInputElement>) => {
    setQuantity(event.currentTarget.value);
  };

  const handleSubmitDynamic = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    getData(setMessage, params, setTasks, handleMessage, quantity, false);
    setQuantity("");
  };
  /* End handlers to custom tasks */

  /* Start handlers to Tasks modal  */
  const handleUpdate = async (currentTask: string) => {
    const newTasks = [...tasks];
    try {
      const index = newTasks.findIndex((task) => task._id === currentTask);
      newTasks[index] = { ...newTasks[index] };
      newTasks[index].completed = !newTasks[index].completed;
      await updateTask(currentTask, {
        completed: newTasks[index].completed,
      });
      console.log("Task successfully updated");
      setTasks(newTasks);
      resetContentModal(setContentModal);
    } catch (error) {
      setTasks(tasks);
      console.error(error);
      handleMessage("Task not updated, try again.", "error");
    }
  };

  const handleDelete = async (currentTask: string) => {
    try {
      const { data } = await deleteTask(currentTask);
      resetContentModal(setContentModal);
      setTasks(data);
    } catch (error) {
      console.error(error);
      handleMessage("Task not deleted, try again.", "error");
    }
  };
  /* End handlers to Tasks modal */

  const handleMessage = (text: string, status: string) => {
    setCurrentTask("");
    createMessage(setMessage, text, true, status);
    setTimeout(() => {
      createMessage(setMessage, "", false, "");
    }, 2000);
  };

  useEffect(() => {
    getData(setMessage, params, setTasks, handleMessage, quantity, true);
    setQuantity("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log("render task container");
  return (
    <div className="container">
      {params.param === "custom" ? (
        <CustomTasks
          handleSubmit={handleSubmitCustom}
          currentTask={currentTask}
          handleChange={handleChangeCustom}
          message={message}
          tasks={tasks}
          tooltipText={!!message.text}
          setContentModal={setContentModal}
        />
      ) : (
        <DynamicTasks
          tasks={tasks}
          setContentModal={setContentModal}
          handleChange={handleChangeDynamic}
          message={message}
          handleSubmit={handleSubmitDynamic}
          quantity={quantity}
        />
      )}

      {contentModal?._id && (
        <Modal
          content={contentModal}
          onClose={() =>
            setContentModal({
              number: undefined,
              _id: "",
              task: "",
              completed: false,
            })
          }
          handleUpdate={handleUpdate}
          handleDelete={handleDelete}
        />
      )}
      <Footer path={params?.param === "custom" ? "custom" : "/"} />
    </div>
  );
};

import { useEffect } from "react";
import "./styles.scss";

export const Modal = ({ content, onClose, handleUpdate, handleDelete }) => {
  const closeOnEscapeKeyDown = (e) => {
    if ((e.charCode || e.keyCode) === 27) {
      onClose();
    }
  };

  useEffect(() => {
    document.body.addEventListener("keydown", closeOnEscapeKeyDown);
    return function cleanup() {
      document.body.removeEventListener("keydown", closeOnEscapeKeyDown);
    };
  }, []);

  return (
    <>
      <div className="darkBg" onClick={() => onClose()} />
      <div className="centered">
        <div className="modal">
          <div className="modalHeader">
            <h5 className="heading2">Task #{content.number}</h5>
          </div>
          <button className="closeBtn" onClick={() => onClose()}>
            <span style={{ marginBottom: "-3px" }}>X</span>
          </button>
          <div className="modalContent">{content.task} </div>
          <div className="modalActions">
            <div className="actionsContainer">
              <button
                className="deleteBtn"
                onClick={() => handleDelete(content._id)}
              >
                Remove
              </button>
              <button
                className="completedBtn"
                onClick={() => handleUpdate(content._id)}
              >
                {!content.completed ? "Completed!" : "Reset"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;

import React from "react";
import "./styles.scss";

export const Button = ({ handleDelete, text }) => {
  return (
    <button className="button" onClick={(id) => handleDelete(id)}>
      {text}
    </button>
  );
};

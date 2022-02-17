import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("H1 is found", () => {
  render(<App />);
  const titleText = "YOUR TASK LIST";
  const title = screen.getByRole("heading", { level: 1 });
  title.value = titleText;
});

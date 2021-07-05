import React from "react";
import ReactDOM from "react-dom";
import UiTPasSearchEmbeddedApp from "./UiTPasSearchApp";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<UiTPasSearchEmbeddedApp />, div);
});

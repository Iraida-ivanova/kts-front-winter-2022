import React from "react";

import ReactDOM from "react-dom";

import "@styles/index.module.scss";
import "@styles/variables.module.scss";
import "@config/configureMobX";
import App from "./App/App";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

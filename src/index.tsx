import * as React from "react";

import { render } from "react-dom";

import "styles/index.module.scss";
import "styles/variables.module.scss";
import "config/configureMobX";
import App from "./App/App";
import "regenerator-runtime";

render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

if (module.hot) {
  module.hot.accept();
}


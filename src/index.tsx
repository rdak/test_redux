import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import { App } from "./App";
import { createAppStore } from "./store";
import "../scss/main.scss";

window.onload = () => {
  // Create store
  const store = createAppStore();

  // Render app
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>
    , document.getElementById("app-container"));
};

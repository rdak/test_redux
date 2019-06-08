import React from "react";
import ReactDOM from "react-dom";

import "../scss/main.scss";
import { App } from "./App";

window.onload = () => {
  // Render app
  ReactDOM.render(
    <App />
    , document.getElementById("app-container"));
};
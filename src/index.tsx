import React from "react";
import { render } from "react-dom";
import "@/assets/reset.scss";
import { createStore } from "redux";
import { Provider } from "react-redux";
import App from "./App";
import reducer from "./reducers";
import { tool } from "./utils/index";
import reportWebVitals from "./reportWebVitals";

const { local } = tool;

const initList = local.get("store", "{}");

const store = createStore(reducer, initList);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

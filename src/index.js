import React from "react";
import ReactDOM from "react-dom";
import Main from "./Main";
import { StoreProvider } from "easy-peasy";
import store from "../src/components/store";
ReactDOM.render(
  <StoreProvider store={store}>
    <Main></Main>
  </StoreProvider>,
  document.getElementById("root")
);

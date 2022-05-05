import React from "react";
import { createRoot } from "react-dom/client";
import Main from "./Main.js";
import { StoreProvider } from "easy-peasy";
import store from "./components/store";

const root = createRoot(document.getElementById("root"));
root.render(
  <StoreProvider store={store}>
    <Main />
  </StoreProvider>
);

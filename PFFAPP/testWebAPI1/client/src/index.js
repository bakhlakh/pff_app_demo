import React from "react";
import { createRoot } from "react-dom/client";
import Main from "./Main.js";
import { StoreProvider } from "easy-peasy";
import store from "./components/store";
import { AuthProvider } from "./context/AuthProvider";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const root = createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <AuthProvider>
      <StoreProvider store={store}>
        <Routes>
          <Route path="/*" element={<Main />} />
        </Routes>
      </StoreProvider>
    </AuthProvider>
  </BrowserRouter>
);

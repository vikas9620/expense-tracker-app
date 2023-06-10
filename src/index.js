import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ExpenseProvider } from "./cart-context/CartContex";
import { BrowserRouter } from "react-router-dom";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <ExpenseProvider>
      <App />
    </ExpenseProvider>
  </BrowserRouter>
);

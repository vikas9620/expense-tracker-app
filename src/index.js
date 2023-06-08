import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ExpenseProvider } from "./cart-context/CartContex";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ExpenseProvider>
    <App />
  </ExpenseProvider>
);

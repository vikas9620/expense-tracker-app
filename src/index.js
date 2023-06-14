import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ExpenseProvider } from "./cart-context/CartContex";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/Index";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <ExpenseProvider>
        <App />
      </ExpenseProvider>
    </BrowserRouter>
  </Provider>
);

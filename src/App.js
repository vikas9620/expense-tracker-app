import "./App.css";
import Auth from "./component/authentication/Auth";
import { Route, Routes, Outlet, Navigate } from "react-router";
import MainPage from "./component/welcome-page/MainPage";
import React, { useContext } from "react";
import Profile from "./component/profile/Profile";

import ForgotPassword from "./component/authentication/PasswordReset";
import { ExpenseContext } from "./cart-context/CartContex";
import Login from "./component/authentication/Login";

function App() {
  const {isLoggedIn} = useContext(ExpenseContext)
  return (
    <React.Fragment>
      <Outlet />
      <Routes>
       {isLoggedIn && <Route path="/" element={<MainPage />} exact />}
        <Route path="/auth" element={<Auth />} exact/>
        <Route path="/profile" element={<Profile />} />
        <Route path="/auth/login" element={<Login/>} />
        <Route path="/passwordreset" element={<ForgotPassword />} />
        <Route path="*" element={<Navigate replace to="/auth/login" />} />
      </Routes>
    </React.Fragment>
  );
}

export default App;

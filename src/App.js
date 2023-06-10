import "./App.css";
import Auth from "./component/authentication/Auth";
import { Route, Routes, Outlet, Navigate } from "react-router";
import MainPage from "./component/welcome-page/MainPage";
import React, { useContext } from "react";
import Profile from "./component/profile/Profile";
import Login from "./component/authentication/Login";
import ForgotPassword from "./component/authentication/PasswordReset";
import { ExpenseContext } from "./cart-context/CartContex";
function App() {
  const {isLoggedIn} = useContext(ExpenseContext)
  return (
    <React.Fragment>
      <Outlet />
      <Routes>
       {isLoggedIn && <Route path="/" element={<MainPage />} exact />}
        <Route path="/auth" element={<Auth />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/passwordreset" element={<ForgotPassword />} />
        <Route path="*" element={<Navigate replace to="/login" />} />
      </Routes>
    </React.Fragment>
  );
}

export default App;

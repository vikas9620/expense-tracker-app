import "./App.css";
import Auth from "./component/authentication/Auth";
import { Route, Routes, Outlet, Navigate } from "react-router";
import MainPage from "./component/welcome-page/MainPage";
import React from "react";
import Profile from "./component/profile/Profile";

import ForgotPassword from "./component/authentication/PasswordReset";

import Login from "./component/authentication/Login";
import { useSelector } from "react-redux";
import { ThemeProvider } from "styled-components";
import { GlobalStyle, darkTheme, lightTheme } from "./component/themeChanger/ThemeChanger";

function App() {
  const auth = useSelector(state => state.auth.isLoggedIn)
  const theme = useSelector((state) => state.theme.darkMode);

  return (
    
  
    <ThemeProvider theme={theme ? darkTheme : lightTheme}>
    <GlobalStyle />
      <Outlet />
      <Routes>
       {auth && <Route path="/" element={<MainPage />} exact />}
        <Route path="/auth" element={<Auth />} />
        {auth &&  <Route path="/profile" element={<Profile />} />}
        <Route path="/login" element={<Login/>} />
        <Route path="/passwordreset" element={<ForgotPassword />} />
        <Route path="*" element={<Navigate replace to="/auth" />} />
      </Routes></ThemeProvider>
    
  );
}

export default App;

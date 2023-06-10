
import './App.css';
import Auth from './component/authentication/Auth';
import {Route, Routes, Outlet, Navigate} from 'react-router';
import MainPage from './component/welcome-page/MainPage'; 
import React from 'react';
import Profile from './component/profile/Profile';
import Login from './component/authentication/Login';
import ForgotPassword from './component/authentication/PasswordReset';
function App() {

  return (
  <React.Fragment>
    <Outlet />
    <Routes>
<Route path="/" element={<MainPage />} exact/>
    <Route path="/auth" element={<Auth />} />
    <Route path="/profile" element={<Profile />} />
 <Route path="/login" element={<Login />} />
 <Route path='/passwordreset' element={<ForgotPassword/>} />
    <Route path='*' element={<Navigate replace to="/" />}  />
    </Routes>
    </React.Fragment>
  );
}

export default App;

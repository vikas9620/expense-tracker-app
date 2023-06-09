import { useNavigate } from "react-router";
import React, { useState } from "react";
export const ExpenseContext = React.createContext({

    signUp: ()=>{},
login: ()=>{},
isLoggedIn: 'isLoggedIn',
logout: ()=>{},
})

export const ExpenseProvider = (props)=>{
const navigate = useNavigate()
  const initialToken = localStorage.getItem('token')
  const [token, setToken] = useState(initialToken);
  const userIsLoggedIn = !!token;
 
  const logoutHandler = () => {
    setToken(null);
localStorage.removeItem('token');
navigate('/auth')
  };
const signUpHandler = async (data)=>{

    try {
        const res = await fetch(
          'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBphrrbbsyooJ1nCbT9FWa8yGRWWExaVco',
          {
            method: 'POST',
            body: JSON.stringify({...data, returnSecureToken: true}),
            headers: { 'Content-Type': 'application/json' },
           
          }
        );
        if (res.ok) {
          console.log('User has successfully signed up.');
          navigate('/login')
        } else {
          console.log('Failed to sign up.');
        }
      } catch (error) {
        console.error(error);
      }

}
const loginHandler = async (data) => {
  try {
    const res = await fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBphrrbbsyooJ1nCbT9FWa8yGRWWExaVco',
      {
        method: 'POST',
        body: JSON.stringify({ ...data, returnSecureToken: true }),
        headers: { 'Content-Type': 'application/json' },
      }
    );

    if (res.ok) {
      const responseData = await res.json();
      console.log('User has successfully logged in.');
      console.log('User ID:', responseData.localId);
      console.log('Token:', responseData.idToken);
      navigate('/')
      setToken(token);
      localStorage.setItem('token', token);
    } else {
      console.log('Failed to log in.');
    }
  } catch (error) {
    console.error(error);
  }
};
    return (
        <ExpenseContext.Provider value={{ signUp: signUpHandler, login: loginHandler, isLoggedIn: userIsLoggedIn, logout: logoutHandler }}>
      {props.children}
    </ExpenseContext.Provider>
      );
}
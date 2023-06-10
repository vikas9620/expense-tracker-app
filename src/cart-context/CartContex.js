import { useNavigate } from "react-router";
import React, { useState } from "react";
export const ExpenseContext = React.createContext({
  token: null,
  signUp: () => {},
  login: () => {},
  isLoggedIn: "isLoggedIn",
  logout: () => {},
  profileUpdate: () => {},
  isEmailSent: "false",
  error: null,
  emailVerified: () => {},
});

export const ExpenseProvider = (props) => {
  const navigate = useNavigate();
  const initialToken = localStorage.getItem("token");
  const [token, setToken] = useState(initialToken);
  const userIsLoggedIn = !!token;
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [error, setError] = useState(null);

  const handleSendVerificationEmail = async () => {
    try {
      const idToken = localStorage.getItem("token");
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBphrrbbsyooJ1nCbT9FWa8yGRWWExaVco`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            requestType: "VERIFY_EMAIL",
            idToken: idToken,
          }),
        }
      );

      if (response.ok) {
        setIsEmailSent(true);
        const emailVerified = await checkEmailVerification(idToken);
        if (emailVerified) {
          navigate("/profile");
        }
      } else {
        const responseData = await response.json();
        setError(responseData.error.message);
      }
    } catch (error) {
      setError(error.message);
    }
  };
  const checkEmailVerification = async (idToken) => {
    try {
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyBphrrbbsyooJ1nCbT9FWa8yGRWWExaVco`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            idToken: idToken,
          }),
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        const emailVerified = responseData.users[0].emailVerified;
        return emailVerified;
      } else {
        throw new Error("Unable to check email verification status");
      }
    } catch (error) {
      console.error(error);
      return false;
    }
  };
  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem("token");
    navigate("/auth");
  };
  const signUpHandler = async (data) => {
    try {
      const res = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBphrrbbsyooJ1nCbT9FWa8yGRWWExaVco",
        {
          method: "POST",
          body: JSON.stringify({ ...data, returnSecureToken: true }),
          headers: { "Content-Type": "application/json" },
        }
      );
      if (res.ok) {
        console.log("User has successfully signed up.");
        navigate("/login");
      } else {
        console.log("Failed to sign up.");
      }
    } catch (error) {
      console.error(error);
    }
  };
  const loginHandler = async (data) => {
    try {
      const res = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBphrrbbsyooJ1nCbT9FWa8yGRWWExaVco",
        {
          method: "POST",
          body: JSON.stringify({ ...data, returnSecureToken: true }),
        }
      );

      if (res.ok) {
        const responseData = await res.json();
        console.log("User has successfully logged in.");
        console.log("User ID:", responseData.localId);
        console.log("Token:", responseData.idToken);

        setToken(responseData.idToken); // Update the token value
        localStorage.setItem("token", responseData.idToken);
        navigate("/");
      } else {
        console.log("Failed to log in.");
      }
    } catch (error) {
      console.error(error);
    }
  };
  const profileUpdateHandler = async (data, token) => {
    try {
      const res = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBphrrbbsyooJ1nCbT9FWa8yGRWWExaVco`,
        {
          method: "POST",
          body: JSON.stringify({
            idToken: token,
            displayName: data.name,
            photoUrl: data.profileImage,
            returnSecureToken: true,
          }),
          headers: { "Content-Type": "application/json" },
        }
      );
      if (res.ok) {
        const responseData = await res.json();
        console.log("User has successfully updated profile.");
        console.log("User ID:", responseData);
        console.log("Token:", responseData.idToken);
      } else {
        console.log("Failed to update.");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <ExpenseContext.Provider
      value={{
        signUp: signUpHandler,
        login: loginHandler,
        isLoggedIn: userIsLoggedIn,
        logout: logoutHandler,
        profileUpdate: profileUpdateHandler,
        token: token,
        emailVerified: handleSendVerificationEmail,
        isEmailSent: isEmailSent,
        error: error,
      }}
    >
      {props.children}
    </ExpenseContext.Provider>
  );
};

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
  addExpense: () => {},
  fetchExpenses: () => {},
  expense: null,
  deleteExpense: () => {},
  updateExpense: () => {},
});

export const ExpenseProvider = (props) => {
  const navigate = useNavigate();
  const initialToken = localStorage.getItem("token");
  const [token, setToken] = useState(initialToken);
  const userIsLoggedIn = !!token;
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [error, setError] = useState(null);
  const [expense, setExpense] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
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
    setUserEmail(null);
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
        navigate("/auth/login");
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

        setUserEmail(responseData.email.replace(/[@.]/g, ""));
        console.log("User ID:");

        setToken(responseData.idToken); // Update the token value
        localStorage.setItem("token", responseData.idToken);
        navigate("/");
        fetchExpenseDataHandler()
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

  const addExpenseHandler = async (expense) => {
    try {
      const res = await fetch(
        `https://expense-tracker-app-146b8-default-rtdb.firebaseio.com/expense${userEmail}.json`,
        {
          method: "POST",
          body: JSON.stringify({
            id: expense.expenseId,
            amount: expense.expAmount,
            description: expense.expDescription,
            category: expense.expCategory,
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );
      if (res.ok) {
        const responseData = await res.json();
        console.log("User has successfully added expense.");
        console.log("User ID:", responseData);
        fetchExpenseDataHandler();
      } else {
        console.log("Failed to add expense.");
      }
    } catch (error) {
      console.log("Failed to connect.");
    }
  };
  const fetchExpenseDataHandler = async () => {
    try {
      const response = await fetch(
        `https://expense-tracker-app-146b8-default-rtdb.firebaseio.com/expense${userEmail}.json`
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        if (data) {
          const expenseItems = Object.values(data);
          setExpense(expenseItems);
          console.log(expenseItems);
        } else {
          setExpense([]);
          console.log("expenseItems");
        }
        // Process the expenseData retrieved from the database
      } else {
        console.log("Failed to fetch expense data.");
      }
    } catch (error) {
      console.log("Failed to connect to the database.");
    }
  };
  const deleteExpenseHandler = async (id) => {
    try {
      const response = await fetch(
        `https://expense-tracker-app-146b8-default-rtdb.firebaseio.com/expense${userEmail}.json`
      );

      if (response.ok) {
        const existingItems = await response.json();

        // Find the item key based on the provided id
        const itemKey = Object.keys(existingItems).find(
          (key) => existingItems[key].id === id
        );

        if (itemKey) {
          const deleteResponse = await fetch(
            `https://expense-tracker-app-146b8-default-rtdb.firebaseio.com/expense${userEmail}/${itemKey}.json`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          if (deleteResponse.ok) {
            setExpense((prevExpense) =>
              prevExpense.filter((expense) => expense.id !== id)
            );
            fetchExpenseDataHandler();
            console.log(`Expense with id ${id} deleted successfully`);
            // Perform any additional actions as needed
          } else {
            console.log(`Failed to delete expense with id ${id}`);
            // Perform any additional actions as needed
          }
        } else {
          console.log(`Expense with id ${id} not found`);
          // Perform any additional actions as needed
        }
      } else {
        console.log("Failed to fetch existing expenses");
        // Perform any additional actions as needed
      }
    } catch (error) {
      console.log("Failed to connect to the database.");
      // Perform any additional actions as needed
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
        addExpense: addExpenseHandler,
        fetchExpenses: fetchExpenseDataHandler,
        expense: expense,
        deleteExpense: deleteExpenseHandler,
      }}
    >
      {props.children}
    </ExpenseContext.Provider>
  );
};

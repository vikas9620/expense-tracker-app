
import React from "react";
export const ExpenseContext = React.createContext({

    signUp: ()=>{}

})

export const ExpenseProvider = (props)=>{

const signUpHandler = async (data)=>{

    try {
        const res = await fetch(
          'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBphrrbbsyooJ1nCbT9FWa8yGRWWExaVco',
          {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' },
          }
        );
        if (res.ok) {
          console.log('User has successfully signed up.');
        } else {
          console.log('Failed to sign up.');
        }
      } catch (error) {
        console.error(error);
      }

}

    return (
        <ExpenseContext.Provider value={{ signUp: signUpHandler }}>
      {props.children}
    </ExpenseContext.Provider>
      );
}
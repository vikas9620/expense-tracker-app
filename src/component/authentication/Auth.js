import React, {useContext, useState} from "react"
import Login from "./Login"
import SignUp from "./SignUp"
import { ExpenseContext } from "../../cart-context/CartContex";
import { Navigate } from "react-router";



const Auth = ()=>{
    const [isLogin, setIsLogin] = useState(true);
const {isLoggedIn}= useContext(ExpenseContext)
    const switchAuthModeHandler = () => {
      setIsLogin((prevState) => !prevState);
    };
  
    return  <React.Fragment>
    {isLoggedIn ? (
      <Navigate replace to="/" />
    ) : (
      <React.Fragment>
        {isLogin && <Login onChange={switchAuthModeHandler} />}
        {!isLogin && <SignUp onChange={switchAuthModeHandler} />}
      </React.Fragment>
    )}
  </React.Fragment>
}

export default Auth
import React, {useState} from "react"
import Login from "./Login"
import SignUp from "./SignUp"

import { Navigate } from "react-router";
import { useSelector } from "react-redux";



const Auth = ()=>{
  
  const auth = useSelector(state => state.auth.isLoggedIn)
    const [isLogin, setIsLogin] = useState(true);

    const switchAuthModeHandler = () => {
      setIsLogin((prevState) => !prevState);
    };
  
    return  <React.Fragment>
    {auth ? (
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
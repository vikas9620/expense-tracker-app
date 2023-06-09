import { Button } from "@mui/material";
import React, { useContext } from "react";
import { ExpenseContext } from "../../cart-context/CartContex";



const MainPage = ()=>{
const {logout} = useContext(ExpenseContext)

    return(
        <React.Fragment><div>
        welcome to expense tracker!!!</div><Button onClick={()=>{logout()}}>Logout</Button>
        </React.Fragment>)
}
export default MainPage
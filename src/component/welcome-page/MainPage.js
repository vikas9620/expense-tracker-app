import { Button } from "@mui/material";
import React, { useContext } from "react";
import { ExpenseContext } from "../../cart-context/CartContex";
import { Link } from "react-router-dom";

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import AccountCircle from '@mui/icons-material/AccountCircle';



const MainPage = ()=>{
const {logout} = useContext(ExpenseContext)

 


  return (
    <Box sx={{ flexGrow: 0.5 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
  
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
         <h3> welcome to expense tracker!!!</h3>
          </Typography>
      (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                
                color="inherit"
              >
                <AccountCircle /><h5>your profile is incomplete</h5><Link to='/profile'>Complete Now</Link>
              </IconButton>
              <Button color="error" variant="contained" onClick={()=>{logout()}}>Logout</Button>
            </div>
          )
        </Toolbar>
      </AppBar>
    </Box>
  );
}
export default MainPage
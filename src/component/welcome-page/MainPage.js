import { Button } from "@mui/material";
import React, { useContext } from "react";
import { ExpenseContext } from "../../cart-context/CartContex";
import { Link } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";

import AccountCircle from "@mui/icons-material/AccountCircle";
import VerifyEmailButton from "../authentication/EmailVerification";
import ExpenseForm from "../expenseForm/ExpenseForm";

const MainPage = () => {
  const { logout, isEmailSent, isLoggedIn } = useContext(ExpenseContext);

  return (
    <React.Fragment>
      <Box sx={{ flexGrow: 0.5 }}>
        <AppBar
          position="static"
          style={{
            background:
              "linear-gradient(90deg, rgba(134,182,224,1) 8%, rgba(92,191,252,1) 67%)",
          }}
        >
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            ></IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <h3> welcome to expense tracker!!!</h3>
            </Typography>
            <div>
              {isLoggedIn && (
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  color="inherit"
                >
                  <AccountCircle />
                  <h5>your profile is incomplete</h5>
                  <Link to="/profile">Complete Now</Link>
                </IconButton>
              )}
              {isLoggedIn &&   <Button
                color="error"
                variant="contained"
                onClick={() => {
                  logout();
                }}
              >
                Logout
              </Button>}
            </div>
          </Toolbar>
        </AppBar>
      </Box>
      {isEmailSent && <VerifyEmailButton />}
      {isLoggedIn &&  <ExpenseForm />}
    </React.Fragment>
  );
};
export default MainPage;

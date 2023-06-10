import React, { useContext, useRef } from "react";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Button, Paper } from "@mui/material";
import { ExpenseContext } from "../../cart-context/CartContex";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2196f3", // Blue color
    },
    background: {
      default: "#fff", // White color
    },
  },
});

const SignUp = (props) => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const { signUp } = useContext(ExpenseContext);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (passwordRef.current.value === confirmPasswordRef.current.value) {
      const data = {
        email: emailRef.current.value,
        password: passwordRef.current.value,
        confirmPassword: confirmPasswordRef.current.value,
      };
      signUp(data);
      console.log(data);
      emailRef.current.value = "";
      passwordRef.current.value = "";
      confirmPasswordRef.current.value = "";
    } else {
      console.log();
      console.log("Password and Confirm Password do not match.");
    }
  };
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Paper elevation={2} sx={{ p: 4 }}>
            <Avatar
              sx={{ m: 1, bgcolor: "primary.main", margin: "0 auto" }}
            ></Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box component="div" noValidate sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    name="email"
                    autoComplete="email"
                    inputRef={emailRef}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    inputRef={passwordRef}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    id="confirmPassword"
                    autoComplete="new-password"
                    inputRef={confirmPasswordRef}
                  />
                </Grid>
              </Grid>
              <Grid marginTop="1rem">
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={handleSubmit}
                >
                  Sign Up
                </Button>
              </Grid>
            </Box>
          </Paper>

          <Grid container justifyContent="center" mt={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={props.onChange}
            >
              Already have an account? Sign in
            </Button>
          </Grid>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default SignUp;

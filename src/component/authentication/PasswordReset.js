import {
  Button,
  TextField,
  CircularProgress,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const handleResetPassword = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBphrrbbsyooJ1nCbT9FWa8yGRWWExaVco`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            requestType: "PASSWORD_RESET",
          }),
        }
      );

      if (response.ok) {
        setSuccessMessage(
          "A password reset link has been sent to your email. Please check your inbox."
        );
        setTimeout(() => {
          navigate("/login");
        }, 5000);
        setErrorMessage("");
      } else {
        const responseData = await response.json();
        setErrorMessage(responseData.error.message);
        setSuccessMessage("");
      }
      setIsLoading(false);
    } catch (error) {
      setErrorMessage(error.message);
      setSuccessMessage("");
      setIsLoading(false);
    }
  };

  return (
    <Card
      style={{
        margin: "20rem",
        background:
          "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(196,245,239,1) 0%, rgba(0,168,255,1) 96%)",
      }}
    >
      <CardContent
        style={{
          margin: "0 auto",
          width: "50%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography
          variant="h5"
          component="div"
          style={{ marginBottom: "1rem" }}
        >
          Forgot Password
        </Typography>
        <TextField
          style={{ marginBottom: "1rem" }}
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button
          style={{ marginBottom: "1rem" }}
          variant="contained"
          color="error"
          disabled={isLoading || !email}
          onClick={handleResetPassword}
        >
          {isLoading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Reset Password"
          )}
        </Button>
        {successMessage && <p>{successMessage}</p>}
        {errorMessage && <p>{errorMessage}</p>}
      </CardContent>
    </Card>
  );
};

export default ForgotPassword;

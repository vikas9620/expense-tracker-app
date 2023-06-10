import { Button } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router";

const VerifyEmailButton = () => {
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [error, setError] = useState(null);
const navigate =useNavigate();
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
          navigate("/profile");}
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

  return (
    <div>
      {isEmailSent ? (
        <p>
          Check your email, you should have received a verification link. Click
          on it to verify your email address.
        </p>
      ) : (
        <>
          <Button style={{width: '300px', margin: '0 auto'}}
            variant="contained"
            color="primary"
            onClick={handleSendVerificationEmail}
          >
            Verify Email
          </Button>
          {error && <p>Error: {error}</p>}
        </>
      )}
    </div>
  );
};

export default VerifyEmailButton;

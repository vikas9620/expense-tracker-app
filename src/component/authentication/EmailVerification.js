import { Button } from "@mui/material";
import { useContext } from "react";
import { ExpenseContext } from "../../cart-context/CartContex";

const VerifyEmailButton = () => {
  const { handleSendVerificationEmail, error, isEmailSent } =
    useContext(ExpenseContext);

  return (
    <div style={{ width: "40%", margin: "0 auto", padding: "3rem" }}>
      {isEmailSent ? (
        <p>
          Check your email, you should have received a verification link. Click
          on it to verify your email address.
        </p>
      ) : (
        <div>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSendVerificationEmail}
          >
            Verify Email
          </Button>
          {error && <p>Error: {error}</p>}
        </div>
      )}
    </div>
  );
};

export default VerifyEmailButton;

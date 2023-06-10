import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ExpenseContext } from "../../cart-context/CartContex";

const MainNavigation = () => {
  const AuthCtx = useContext(ExpenseContext);
  const isLoggedIn = AuthCtx.isLoggedIn;
  const navigate = useNavigate();
  const logoutHandler = () => {
    AuthCtx.logout();
    navigate("/auth");
  };
  return (
    <header>
      <nav>
        <ul>
          {!isLoggedIn && (
            <li>
              <Link to="/auth">Login</Link>
            </li>
          )}

          {isLoggedIn && (
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;

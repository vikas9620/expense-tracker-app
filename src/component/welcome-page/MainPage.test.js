import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import MainPage from "./MainPage";
import { ExpenseContext } from "../../cart-context/CartContex";


import rootReducer from "../../store";

describe("MainPage", () => {
  const mockLogout = jest.fn();
  const mockIsEmailSent = false;
  const mockIsLoggedIn = true;
  const mockProfileUpdated = true;

  const renderWithExpenseContext = (
    component,
    { logout = mockLogout, isEmailSent = mockIsEmailSent, isLoggedIn = mockIsLoggedIn, profileUpdated = mockProfileUpdated } = {}
  ) => {
    return render(
      <ExpenseContext.Provider value={{ logout, isEmailSent, isLoggedIn }}>
        <Provider store={createStore(rootReducer)}>
          {component}
        </Provider>
      </ExpenseContext.Provider>
    );
  };

  test("renders welcome message correctly", () => {
    renderWithExpenseContext(<MainPage />);
    
   
    expect(screen.getByText("welcome to expense tracker!!!")).toBeInTheDocument();
  });

  test("renders profile completion message when profile is incomplete", () => {
    renderWithExpenseContext(<MainPage />);
    
  
    expect(screen.getByText("your profile is incomplete")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Complete Now" })).toBeInTheDocument();
  });

  test("does not render profile completion message when profile is complete", () => {
    renderWithExpenseContext(<MainPage />, { profileUpdated: false });
    
    
    expect(screen.queryByText("your profile is incomplete")).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "Complete Now" })).not.toBeInTheDocument();
  });

  test("calls logout correctly", () => {
    renderWithExpenseContext(<MainPage />);
    
  
    fireEvent.click(screen.getByRole("button", { name: "Logout" }));

  
    expect(mockLogout).toHaveBeenCalled();
  });

  test("does not render VerifyEmailButton when isEmailSent is false", () => {
    renderWithExpenseContext(<MainPage />);

    expect(screen.queryByText("Verify Email")).not.toBeInTheDocument();
  });

  test("renders VerifyEmailButton when isEmailSent is true", () => {
    renderWithExpenseContext(<MainPage />, { isEmailSent: true });
    
  
    expect(screen.getByText("Verify Email")).toBeInTheDocument();
  });

  test("does not render ExpenseForm when isLoggedIn is false", () => {
    renderWithExpenseContext(<MainPage />, { isLoggedIn: false });
    
   
    expect(screen.queryByLabelText("Expense Name")).not.toBeInTheDocument();
  });

  test("renders ExpenseForm when isLoggedIn is true", () => {
    renderWithExpenseContext(<MainPage />);
    
 
    expect(screen.getByLabelText("Expense Name")).toBeInTheDocument();
  });
});

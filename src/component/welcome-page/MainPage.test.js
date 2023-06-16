import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import MainPage from "./MainPage";

describe("MainPage", () => {
  

  test("renders welcome message correctly", () => {
    render(<MainPage />);
    
    expect(screen.getByText("welcome to expense tracker!!!")).toBeInTheDocument();
  });

  test("renders profile completion message when profile is incomplete", () => {
    render(<MainPage />);
    

    expect(screen.getByText("your profile is incomplete")).toBeInTheDocument();

  });

  test("does not render profile completion message when profile is complete", () => {
    render(<MainPage />);
    
   
    expect(screen.queryByText("your profile is incomplete")).not.toBeInTheDocument();

  });

 
  test("does not render VerifyEmailButton when isEmailSent is false", () => {
    render(<MainPage />);
    
   
    expect(screen.queryByText("Verify Email")).not.toBeInTheDocument();
  });

  test("renders VerifyEmailButton when isEmailSent is true", () => {
    render(<MainPage />);
    

    expect(screen.getByText("Verify Email")).toBeInTheDocument();
  });

  test("does not render ExpenseForm when isLoggedIn is false", () => {
    render(<MainPage />);
    

    expect(screen.queryByLabelText("Expense Name")).not.toBeInTheDocument();
  });

  test("renders ExpenseForm when isLoggedIn is true", () => {
    render(<MainPage />);
    
    expect(screen.getByLabelText("Expense Name")).toBeInTheDocument();
  });
});

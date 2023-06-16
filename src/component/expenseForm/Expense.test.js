import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ExpenseForm from "./ExpenseForm";

describe("ExpenseForm", () => {
  test("renders expense form correctly", () => {
    render(<ExpenseForm />);
    

    expect(screen.getByLabelText("Amount Spent")).toBeInTheDocument();
    expect(screen.getByLabelText("Description")).toBeInTheDocument();
    expect(screen.getByLabelText("Category")).toBeInTheDocument();
    expect(screen.getByText("Add Expense")).toBeInTheDocument();
    expect(screen.getByText("Expense List")).toBeInTheDocument();
  });

  test("adds an expense correctly", () => {
    render(<ExpenseForm />);
    
  
    fireEvent.click(screen.getByText("Add Expense"));


    expect(screen.getByText("Food")).toBeInTheDocument();
  });

  test("edits an expense correctly", () => {
    render(<ExpenseForm />);
    

    fireEvent.click(screen.getByText("Edit"));

   
    expect(screen.getByLabelText("Category")).toHaveValue("Food");
  });

  test("deletes an expense correctly", () => {
    render(<ExpenseForm />);
    
    fireEvent.click(screen.getByText("Delete"));

  
    expect(screen.queryByText("Food")).not.toBeInTheDocument();
  });
});

import React, { useContext, useState, useEffect } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Paper,
} from "@mui/material";
import { ExpenseContext } from "../../cart-context/CartContex";

function ExpenseForm() {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
 
const {addExpense,expense, fetchExpenses } = useContext(ExpenseContext)
  const handleAddExpense = (event) => {
    event.preventDefault();

    // Create a new expense object
    const newExpense = {
     expAmount: amount,
      expDescription: description,
      expCategory: category,
    };
addExpense(newExpense);
    // Add the new expense to the expenses list
    

    // Clear the form inputs
    setAmount("");
    setDescription("");
    setCategory("");
  };
useEffect(() => {fetchExpenses()},[]);
  return (
    <Container maxWidth="sm">
      <div style={{ marginTop: "2rem" }}>
        <Paper style={{ margin: "0 auto", padding: "1rem" }}>
          <Typography variant="h5" component="h2" gutterBottom>
            Add Expense
          </Typography>
          <form onSubmit={handleAddExpense}>
            <TextField
              style={{ marginTop: "1rem" }}
              label="Amount Spent"
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
              required
            />
            <TextField
              style={{ marginTop: "1rem" }}
              label="Description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              fullWidth
              required
            />
            <FormControl fullWidth required>
              <InputLabel style={{ marginTop: "1rem" }}>Category</InputLabel>
              <Select
                style={{ marginTop: "1rem" }}
                value={category}
                onChange={(event) => setCategory(event.target.value)}
              >
                <MenuItem value="Food">Food</MenuItem>
                <MenuItem value="Petrol">Petrol</MenuItem>
                <MenuItem value="Salary">Salary</MenuItem>
                {/* Add more options as needed */}
              </Select>
            </FormControl>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ marginTop: "1rem" }}
            >
              Add Expense
            </Button>
          </form>
        </Paper>
        <div style={{ marginTop: "2rem" }}>
          <Typography variant="h5" component="h2" gutterBottom>
            Expense List
          </Typography>
          {expense ? (
            <ul>
              {expense.map((expense, index) => (
                <li key={index}>
                  Amount: {expense.amount}, Description: {expense.description},
                  Category: {expense.category}
                </li>
              ))}
            </ul>
          ) : (
            <Typography variant="body1">No expenses added yet.</Typography>
          )}
        </div>
      </div>
    </Container>
  );
}

export default ExpenseForm;

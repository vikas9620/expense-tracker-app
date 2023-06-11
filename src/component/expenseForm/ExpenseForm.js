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
  Chip,
  Box,
} from "@mui/material";
import { ExpenseContext } from "../../cart-context/CartContex";
import DeleteIcon from "@mui/icons-material/Delete";
function ExpenseForm() {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const { addExpense, expense, fetchExpenses, deleteExpense } =
    useContext(ExpenseContext);
  const handleAddExpense = (event) => {
    event.preventDefault();

    const newExpense = {
      expenseId: Date.now(),
      expAmount: amount,
      expDescription: description,
      expCategory: category,
    };
    addExpense(newExpense);
    setAmount("");
    setDescription("");
    setCategory("");
  };

  const editHandler = (selectedExpense) => {
    setAmount(selectedExpense.amount);
    setDescription(selectedExpense.description);
    setCategory(selectedExpense.category);
    deleteExpense(selectedExpense.id);
  };

  console.log(expense);
  useEffect(() => {
    fetchExpenses();
  }, []);
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
          <Paper style={{ marginBottom: "1rem", padding: "1rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Chip label="Amount" color="primary" />

              <Chip label="Description" color="primary" />
              <Chip label="Expense category" color="primary" />
              <Chip label="Edit expense" color="success" />
              <Chip label="Delete expense" color="error" />
            </div>
          </Paper>
          {expense ? (
            expense.map((expense, index) => (
              <Paper
                key={index}
                style={{
                  marginBottom: "1rem",
                  padding: "1rem",
                  display: "flex",
                  justifyContent: "space-around",
                }}
              >
                <Chip
                  label={expense.amount}
                  color="primary"
                  variant="outlined"
                />
                <Box width={100}>
                  <Chip
                    sx={{
                      height: "auto",
                      "& .MuiChip-label": {
                        display: "block",
                        whiteSpace: "normal",
                      },
                    }}
                    label={expense.description}
                    variant="outlined"
                    color="primary"
                  />
                </Box>
                <Chip
                  label={expense.category}
                  color="primary"
                  variant="outlined"
                />

                <Button
                  variant="outlined"
                  style={{
                    padding: "4px",
                    minWidth: "unset",
                    minHeight: "unset",
                    fontSize: "0.75rem",
                  }}
                  color="success"
                  onClick={() => editHandler(expense)}
                >
                  Edit
                </Button>
                <Button
                  variant="outlined"
                  style={{
                    padding: "2px",
                    minWidth: "unset",
                    minHeight: "unset",
                    fontSize: "0.75rem",
                  }}
                  color="error"
                  startIcon={<DeleteIcon />}
                  onClick={() => {
                    deleteExpense(expense.id);
                  }}
                >
                  Delete
                </Button>
              </Paper>
            ))
          ) : (
            <Typography variant="body1">No expenses added yet.</Typography>
          )}
        </div>
      </div>
    </Container>
  );
}

export default ExpenseForm;

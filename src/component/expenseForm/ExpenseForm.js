import React, { Fragment, useContext, useState } from "react";
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
import { useSelector } from "react-redux";
import MaterialUISwitch from "../themeChanger/ThemeChanger";
import { useDispatch } from 'react-redux';
import { themeAction } from '../../store/Theme';
import ExpenseDownload from "../expense-download/ExpenseDownload";
function ExpenseForm() {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [rendered, setRendered] = useState(false);
  const dispatch = useDispatch()
  const activePremium = useSelector(state => state.theme.premium);
  
  const { addExpense, deleteExpense, fetchExpenses } =
    useContext(ExpenseContext);
  const expense = useSelector((state) => state.expense.expense);
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
  const handleInitialRender = () => {
    if (!rendered) {
      fetchExpenses();
      setRendered(true);
    }
  };
  handleInitialRender();
  console.log(expense);


const handleDarkModeToggle = () => {dispatch(themeAction.toggleTheme())

console.log("darkMode toggle");
}
  let Premium = "";
  if (expense) {
    const totalExpense = expense.reduce(
      (acc, expense) => acc + expense.amount,
      0
    );
    if (totalExpense > 10000) {
      Premium = (<Fragment>
        <Button
          color="secondary"
          size="small"
          variant="contained"
          style={{ marginLeft: "2rem" }}
          onClick={()=>{
            dispatch(themeAction.activatePremium());
          }}
        >
          activate Premium
        </Button>
   {activePremium &&     <MaterialUISwitch onChange={handleDarkModeToggle} />}
   {activePremium &&   <ExpenseDownload />}
        </Fragment>
      );
    }
    else{
      Premium = null;
    }
  }

  return (
    <Container maxWidth="sm">
      <div style={{ marginTop: "2rem" }}> <Typography variant="h7" component="h2" gutterBottom style={{ display: "flex", justifyContent: "center" }}>
      <Chip label="Add Expense" color="primary" size="large"></Chip>
    </Typography>
        <Paper style={{ margin: "0 auto", padding: "1rem",  background:
        "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(196,245,239,1) 0%, rgba(0,168,255,1) 96%)", }}>
         
          <form onSubmit={handleAddExpense}>
            <TextField
              style={{ marginTop: "1rem" }}
              label="Amount Spent"
              value={amount}
              type="number"
              onChange={(event) => setAmount(event.target.value)}
              required
            />
            <TextField
              style={{ marginTop: "1rem" }}
              label="Description"
              type="text"
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
              size="small"
            >
              Add Expense
            </Button>
          </form>
        </Paper>

        <div style={{ marginTop: "2rem" }}>
          <Typography
            variant="h7 large"
            component="h2"
            gutterBottom
            style={{ display: "flex", justifyContent: "center" }}
          >
            <Chip label="Expense List" color="primary" size="large" /> {Premium}
          </Typography>
          <Paper style={{ marginBottom: "1rem", padding: "1rem",  background:
          "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(196,245,239,1) 0%, rgba(0,168,255,1) 96%)", }}>
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
                  background:
                  "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(196,245,239,1) 0%, rgba(0,168,255,1) 96%)",
                }}
              >
                <Chip
                  label={expense.amount}
                  color="default"
                  variant="contained"
                />
                <Box width={80}>
                  <Chip
                    sx={{
                      height: "auto",
                      "& .MuiChip-label": {
                        display: "block",
                        whiteSpace: "normal",
                      },
                    }}
                    label={expense.description}
                    variant="contained"
                    color="default"
                  />
                </Box>
                <Chip
                  label={expense.category}
                  color="default"
                  variant="contained"
                />

                <Button
                  variant="contained"
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
                  variant="contained"
                  size="small"
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

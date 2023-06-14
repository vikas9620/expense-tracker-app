// App.js (continued)
import { Button } from '@mui/material';
import { saveAs } from 'file-saver';
import { useSelector } from 'react-redux';

const exportExpensesAsCSV = (expenses) => {
  let csvContent = 'description,Amount,category\n'

  expenses.forEach((expense) => {
    csvContent += `${expense.description},${expense.amount},${expense.category}\n`;
  });

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
  saveAs(blob, 'expenses.csv');
};

const ExpenseDownload = () => {
  // ...

  const expenses = useSelector((state) => state.expense.expense);

  const handleExportExpenses = () => {
    exportExpensesAsCSV(expenses);
  };

  return (
    <div >
      {/* ... */}
      <Button variant='contained' color='secondary' onClick={handleExportExpenses}>Download Expenses</Button>
      {/* ... */}
    </div>
  );
};

export default ExpenseDownload;

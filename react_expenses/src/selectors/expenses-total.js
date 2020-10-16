// Sum up number of expenses and total amount of expenses
export default (expenses) => {
    return expenses.reduce((sum, expense) => {
            return sum + expense.amount;
        },0);
  };
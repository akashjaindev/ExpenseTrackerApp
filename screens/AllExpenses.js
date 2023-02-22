import { useContext } from "react";
import ExpenseOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpenseContext } from "../store/expenses-context";

export default function AllExpenses(params) {
  const expensesCtx=useContext(ExpenseContext)
  return <ExpenseOutput expensesPeriodName="Total" expenses={expensesCtx.expenses} fallbackText="No Expenses registered found"/>;
}

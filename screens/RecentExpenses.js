import { useContext } from "react";
import ExpenseOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpenseContext } from "../store/expenses-context";
import { getDateMinusDays } from "../util/date";

export default function RecentExpenses(params) {
  const expensesCtx = useContext(ExpenseContext);
  const recentExpenses = expensesCtx.expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);
    return expense.date >= date7DaysAgo;
  });
  return (
    <ExpenseOutput expensesPeriodName="Last 7 Days" expenses={recentExpenses} fallbackText="No Expenses registered for last 7 days"/>
  );
}

import { useContext, useEffect, useState } from "react";
import ExpenseOutput from "../components/ExpensesOutput/ExpensesOutput";
import { fetchExpenses } from "../network/http";
import { ExpenseContext } from "../store/expenses-context";
import ErrorOverlay from "../ui/ErrorOverlay";
import LoadingOverlay from "../ui/LoadingOverlay";
import { getDateMinusDays } from "../util/date";

export default function RecentExpenses() {
  const expensesCtx = useContext(ExpenseContext);
  const [isFetching,setFetching] = useState(true)
  const [error,setError]=useState()
  useEffect(()=>{
    async function getExpenses(){
      setFetching(true)
      try{
        const expenses = await fetchExpenses()
        expensesCtx.setExpenses(expenses)
      }catch(error){
        setError('Could not fetch expenses')
      }
      setFetching(false)
    }
    getExpenses()
  },[])

  function errorHandler() {
    setError(null)
  }

  if(error && !isFetching){
    return <ErrorOverlay message={error} onConfirm={errorHandler}/>
  }

  if(isFetching){
   return <LoadingOverlay/> 
  }
  const recentExpenses = expensesCtx.expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);
    return expense.date >= date7DaysAgo;
  });
  return (
    <ExpenseOutput expensesPeriodName="Last 7 Days" expenses={recentExpenses} fallbackText="No Expenses registered for last 7 days"/>
  );
}

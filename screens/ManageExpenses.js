import { useContext, useLayoutEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import { GlobalStyles } from "../constants/styles";
import { deleteExpense, storeExpense, updateExpense } from "../network/http";
import { ExpenseContext } from "../store/expenses-context";
import ErrorOverlay from "../ui/ErrorOverlay";
import IconButton from "../ui/IconButton";
import LoadingOverlay from "../ui/LoadingOverlay";

export default function ManageExpenses({ navigation, route }) {
  const [isSubmitting,setSubmiting] = useState(false)
  const expenseCtx = useContext(ExpenseContext);
  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;
  const selectedExp = expenseCtx.expenses.find((expense) => expense.id === editedExpenseId);
  const [error,setError]=useState()

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  async function deleteExpenseHandler() {
    setSubmiting(true)
    try{
      await expenseCtx.deleteExpense(editedExpenseId);
      deleteExpense(editedExpenseId)
    }catch(error){
      setError("Could not delete expense")
    }
    setSubmiting(false)
    cancelHandler();
  }

  function cancelHandler() {
    navigation.goBack();
  }

  async function confirmHandler(expenseData) {
    setSubmiting(true)
    try{
      if (isEditing) {
          await updateExpense(editedExpenseId,expenseData)
          expenseCtx.updateExpense(editedExpenseId, expenseData);
      } else {
          const id = await storeExpense(expenseData)
          expenseCtx.addExpense({...expenseData,id:id});
      }
      cancelHandler();
    }catch(error){
      setError("Could not save expense. Please try again later")
    }
    setSubmiting(false)
  }

  function errorHandler() {
    setError(null)
  }

  if(error && !isSubmitting){
    return <ErrorOverlay message={error} onConfirm={errorHandler}/>
  }

  if(isSubmitting){
    return <LoadingOverlay/>
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        defaultValue={selectedExp}
        onCancel={cancelHandler}
        onConfirm={confirmHandler}
        submitButtonLabel={isEditing ? "Update" : "Add"}
      />

      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon={"trash"}
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});

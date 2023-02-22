import { StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import ExpenseList from "./ExpenseList";
import ExpenseSummary from "./ExpenseSummary";

export default function ExpenseOutput({ expenses, expensesPeriodName,fallbackText }) {
  let content =<Text style={styles.infoText}>{fallbackText}</Text>
  if(expenses.length>0){
    content = <ExpenseList expenses={expenses} />
  }
  return (
    <View style={styles.container}>
      <ExpenseSummary
        periodName={expensesPeriodName}
        expenses={expenses}
      />
     {content}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    backgroundColor: GlobalStyles.colors.primary700,
  },
  infoText: {
    color:'white',
    fontSize:16,
    textAlign:"center",
    marginTop:32
  },
});

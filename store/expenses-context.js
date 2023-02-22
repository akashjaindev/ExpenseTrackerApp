import { createContext, useReducer } from "react";

export const DUMMY_EXPENSE = [
  {
    id: "e1",
    description: "A pair of shoes",
    amount: 59.99,
    date: new Date("2023-12-19"),
  },
  {
    id: "e2",
    description: "A pair of trousers",
    amount: 89.29,
    date: new Date("2023-01-05"),
  },
  {
    id: "e3",
    description: "Some Banana",
    amount: 5.99,
    date: new Date("2023-12-01"),
  },
  {
    id: "e4",
    description: "A Book",
    amount: 14.99,
    date: new Date("2023-02-19"),
  },
  {
    id: "e5",
    description: "Another Book",
    amount: 18.59,
    date: new Date("2023-02-18"),
  },
  {
    id: "e6",
    description: "A pair of shoes",
    amount: 59.99,
    date: new Date("2023-12-19"),
  },
  {
    id: "e7",
    description: "A pair of trousers",
    amount: 89.29,
    date: new Date("2023-01-05"),
  },
  {
    id: "e8",
    description: "Some Banana",
    amount: 5.99,
    date: new Date("2023-12-01"),
  },
  {
    id: "e9",
    description: "A Book",
    amount: 14.99,
    date: new Date("2023-02-19"),
  },
  {
    id: "e10",
    description: "Another Book",
    amount: 18.59,
    date: new Date("2023-02-18"),
  },
  {
    id: "e11",
    description: "A pair of shoes",
    amount: 59.99,
    date: new Date("2023-12-19"),
  },
  {
    id: "e12",
    description: "A pair of trousers",
    amount: 89.29,
    date: new Date("2023-01-05"),
  },
  {
    id: "e13",
    description: "Some Banana",
    amount: 5.99,
    date: new Date("2023-12-01"),
  },
  {
    id: "e14",
    description: "A Book",
    amount: 14.99,
    date: new Date("2023-02-19"),
  },
  {
    id: "e15",
    description: "Another Book",
    amount: 18.59,
    date: new Date("2023-02-18"),
  },
];

export const ExpenseContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, amount, date }) => {},
});

function expenseReducer(state, action) {
  switch (action.type) {
    case "ADD": {
      const id = new Date().toString() + Math.random().toString();
      return [{ ...action.payload, id: id }, ...state];
    }
    case "UPDATE": {
      const updatableExpenseIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      );
      const updatableExpense = state[updatableExpenseIndex];
      const updateItem = { ...updatableExpense, ...action.payload.data };
      const updatedExpense = [...state];
      updatedExpense[updatableExpenseIndex] = updateItem;
      return updatedExpense;
    }
    case "DELETE": {
      return state.filter((expense) => expense.id !== action.payload);
    }
    default:
      return state;
  }
}

export function ExpensesContextProvider({ children }) {
  const [expenseState, dispatch] = useReducer(expenseReducer, DUMMY_EXPENSE);

  function addExpense(expenseData) {
    dispatch({ type: "ADD", payload: expenseData });
  }
  function deleteExpense(id) {
    dispatch({ type: "DELETE", payload: id });
  }
  function updateExpense(id, expenseData) {
    dispatch({ type: "UPDATE", payload: { id: id, data: expenseData } });
  }
  const value = {
    expenses: expenseState,
    addExpense: addExpense,
    deleteExpense: deleteExpense,
    updateExpense: updateExpense,
  };
  return (
    <ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>
  );
}

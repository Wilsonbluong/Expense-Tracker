import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";

// initial state
// any GLOBAL STATE would go into this object
// this will give us access to this everywhere
const initialState = {
  transactions: [],
};

// Create context
// passing in initialState to context
export const GlobalContext = createContext(initialState);

// Provider Component
// this will allow other componesnts to access our global state
// by wrapping other components in a global component and passing to
// its children which is passed in using destructuring
// useReducer to access state and dispatch
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // actions
  // will make calls to the reducer
  function deleteTransaction(id) {
    dispatch({
      type: "DELETE_TRANSACTION",
      payload: id,
    });
  }

  function addTransaction(transaction) {
    dispatch({
      type: "ADD_TRANSACTION",
      payload: transaction,
    });
  }

  return (
    <GlobalContext.Provider
      value={{
        transactions: state.transactions,
        deleteTransaction,
        addTransaction,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

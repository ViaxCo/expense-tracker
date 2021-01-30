import axios from "axios";
import { createContext, FC, ReactNode, useReducer } from "react";
import AppReducer from "./AppReducer";
import * as actions from "./actionTypes";
import getSymbolFromCurrency from "currency-symbol-map";

// Transaction type
export type Transaction = {
  _id?: string;
  text: string;
  amount: number;
};
// State type
export type State = {
  transactions: Transaction[];
  error?: string | null;
  isLoading?: boolean;
  currencySymbol: string | undefined;
  getTransactions?: () => Promise<void>;
  addTransaction?: (transaction: Transaction) => Promise<void>;
  deleteTransaction?: (_id: string) => Promise<void>;
  setCurrencySymbol?: (currency: string) => void;
};
// Initial state
const initialState: State = {
  transactions: [],
  error: null,
  isLoading: true,
  currencySymbol: "$",
};

// Create context
export const GlobalContext = createContext(initialState);

// Provider component
export const Provider: FC<ReactNode> = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);
  // Actions
  const getTransactions = async () => {
    try {
      const res = await axios.get("/api/transactions");
      const currencySymbol = getSymbolFromCurrency(res.data.data.currency);
      dispatch({
        type: actions.GET_TRANSACTIONS,
        payload: { transactions: res.data.data.transactions, currencySymbol },
      });
    } catch (err) {
      dispatch({
        type: actions.TRANSACTION_ERROR,
        payload: err.response.data.error,
      });
    }
  };
  const addTransaction = async (transaction: Transaction) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post("/api/transactions", transaction, config);
      dispatch({ type: actions.ADD_TRANSACTION, payload: res.data.data });
    } catch (err) {
      dispatch({
        type: actions.TRANSACTION_ERROR,
        payload: err.response.data.error,
      });
    }
  };
  const deleteTransaction = async (id: string) => {
    try {
      dispatch({ type: actions.DELETE_TRANSACTION, payload: id });
      await axios.delete(`/api/transactions/${id}`);
    } catch (err) {
      dispatch({
        type: actions.TRANSACTION_ERROR,
        payload: err.response.data.error,
      });
    }
  };

  const setCurrencySymbol = (currency: string) => {
    const currencySymbol = getSymbolFromCurrency(currency);
    dispatch({
      type: actions.SET_CURRENCY_SYMBOL,
      payload: currencySymbol as string,
    });
  };

  return (
    <GlobalContext.Provider
      value={{
        transactions: state.transactions,
        error: state.error,
        isLoading: state.isLoading,
        currencySymbol: state.currencySymbol,
        getTransactions,
        addTransaction,
        deleteTransaction,
        setCurrencySymbol,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

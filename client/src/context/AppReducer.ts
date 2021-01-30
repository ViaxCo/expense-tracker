import { State, Transaction } from "./GlobalState";
import * as actions from "./actionTypes";

interface TransactionsAndCurrency {
  transactions: Transaction[];
  currencySymbol: string | undefined;
}

type TransactionAction = {
  type: string;
  payload: string | Transaction | TransactionsAndCurrency;
};

const reducer = (state: State, action: TransactionAction) => {
  switch (action.type) {
    case actions.GET_TRANSACTIONS:
      return {
        ...state,
        isLoading: false,
        transactions: (action.payload as TransactionsAndCurrency).transactions,
        currencySymbol: (action.payload as TransactionsAndCurrency)
          .currencySymbol,
      };
    case actions.ADD_TRANSACTION:
      return {
        ...state,
        transactions: [...state.transactions, action.payload as Transaction],
      };
    case actions.DELETE_TRANSACTION:
      return {
        ...state,
        transactions: state.transactions.filter(
          transaction => transaction._id !== action.payload
        ),
      };
    case actions.SET_CURRENCY_SYMBOL:
      return {
        ...state,
        currencySymbol: action.payload as string,
      };
    case actions.TRANSACTION_ERROR:
      return {
        ...state,
        error: action.payload as string,
      };
    default:
      return state;
  }
};
export default reducer;

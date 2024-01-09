import { toBeEnabled } from "@testing-library/jest-dom/matchers";
import { useReducer } from "react";

const initialState = {
  balance: 0,
  loan: 0,
  isOpen: false,
};
function reducer(state, action) {
  switch (action.type) {
    case "open":
      if (state.isOpen) return { ...state };
      return { ...initialState, isOpen: true, balance: 500 };

    case "deposit":
      return { ...state, balance: state.balance + action.payload };
    case "withdraw":
      if (state.balance <= 0) return { ...state };
      return { ...state, balance: state.balance - action.payload };
    case "request loan":
      return {
        ...state,
        balance: state.balance + action.payload,
        loan: state.loan + action.payload,
      };
    case "pay loan":
      if (state.balance < state.loan) return { ...state };
      return {
        ...state,
        balance: state.balance - state.loan,
        loan: 0,
      };
    case "close":
      if (state.balance || state.loan) return { ...state };
      return { ...initialState };
    default:
      throw new Error("Invalid action type");
  }
}
function App() {
  function helpDispatch(type, payload) {
    dispatch({ type: type, payload: payload ? payload : null });
  }
  const [{ balance, loan, isOpen }, dispatch] = useReducer(
    reducer,
    initialState
  );

  return (
    <div>
      <h1>useReducer Bank Account</h1>
      <p>Balance: {balance}</p>
      <p>Loan: {loan}</p>
      <button
        onClick={() => {
          helpDispatch("open");
        }}
      >
        Open Account
      </button>
      <button
        disabled={!isOpen}
        onClick={() => {
          helpDispatch("deposit", 150);
        }}
      >
        Deposit 150
      </button>
      <button
        disabled={!isOpen}
        onClick={() => {
          helpDispatch("withdraw", 50);
        }}
      >
        Withdraw 50
      </button>
      <button
        disabled={!isOpen}
        onClick={() => {
          helpDispatch("request loan", 5000);
        }}
      >
        Request Loan 5000
      </button>
      <button
        disabled={!isOpen}
        onClick={() => {
          helpDispatch("pay loan");
        }}
      >
        Pay Loan
      </button>
      <button
        onClick={() => {
          helpDispatch("close");
        }}
        disabled={!isOpen}
      >
        Close Account
      </button>
    </div>
  );
}

export default App;

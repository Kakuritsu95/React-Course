import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};
const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    deposit(state, action) {
      state.balance = state.balance + action.payload;
      state.isLoading = false;
    },
    withdraw(state, action) {
      state.balance = state.balance - action.payload;
    },
    requestLoan(state, action) {
      if (state.loan > 0) return;
      state.loan = state.loan + action.payload.loanAmount;
      state.loanPurpose = action.payload.loanPurpose;
      state.balance = state.balance + action.payload.loanAmount;
    },
    payLoan(state) {
      if (state.balance < state.loan) return;
      state.loanPurpose = "";
      state.balance = state.balance - state.loan;
      state.loan = 0;
    },
    convertingCurrency(state) {
      state.loading = true;
    },
    toggleLoading(state) {
      state.isLoading = !state.isLoading;
    },
  },
});

export const { withdraw, requestLoan, payLoan, toggleLoading } =
  accountSlice.actions;
export function deposit(amount, currency) {
  if (currency === "USD") return { type: "account/deposit", payload: amount };
  return async function (dispatch, getState) {
    try {
      dispatch({ type: "account/toggleLoading" });
      const res = await fetch(
        `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
      );
      const data = await res.json();
      const converted = data.rates.USD;
      dispatch({ type: "account/deposit", payload: converted });
    } catch (err) {}
  };
}
export default accountSlice.reducer;
//BEFORE REDUX TOOLKIT
// export default function accountReducer(state = initialState, action) {
//   switch (action.type) {
//     case "account/deposit":
//       return {
//         ...state,
//         balance: state.balance + action.payload,
//         isLoading: false,
//       };
//     case "account/withdraw":
//       return { ...state, balance: state.balance - action.payload };
//     case "account/requestLoan":
//       if (state.loan > 0) return state;

//       return {
//         ...state,
//         loan: state.loan + action.payload.amount,
//         loanPurpose: action.payload.purpose,
//         balance: state.balance + action.payload.amount,
//       };
//     case "account/payLoan":
//       if (state.loan > state.balance) return;
//       return {
//         ...state,
//         loan: 0,
//         loanPurpose: "",
//         balance: state.balance - state.loan,
//       };
//     case "account/toggleLoading":
//       return { ...state, isLoading: !state.isLoading };
//     default:
//       return state;
//   }
// }

// export function deposit(amount, currency) {
//   if (currency === "USD") return { type: "account/deposit", payload: amount };
//   return async function (dispatch, getState) {
//     try {
//       dispatch({ type: "account/toggleLoading" });
//       const res = await fetch(
//         `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
//       );
//       const data = await res.json();
//       const converted = data.rates.USD;
//       dispatch({ type: "account/deposit", payload: converted });
//     } catch (err) {}
//   };
// }
// export function withdraw(amount) {
//   return { type: "account/withdraw", payload: amount };
// }
// export function requestLoan(amount, purpose) {
//   return {
//     type: "account/requestLoan",
//     payload: { amount: amount, purpose: purpose },
//   };
// }
// export function payLoan() {
//   return { type: "account/payLoan" };
// }

import { configureStore } from "@reduxjs/toolkit";

// Reducer function
const counterReducer = (state = { count: 0 }, action) => {
  switch (action.type) {
    case "INCREMENT":
      return { count: state.count + 1 };
    case "DECREMENT":
      return { count: state.count - 1 };
    default:
      return state;
  }
};

// Create Redux store
const store = configureStore({
  reducer: counterReducer,
});

export default store;

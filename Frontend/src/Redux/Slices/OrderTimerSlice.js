import { createSlice } from "@reduxjs/toolkit";

// Load the timer state from localStorage or set the default state
const loadFromLocalStorage = () => {
  const timerState = localStorage.getItem('timerState') || "0-false"; // Default value corrected
  return { timerState };
};

const initialState = loadFromLocalStorage();

export const OrderTimerSlice = createSlice({
  name: "timerState",
  initialState,
  reducers: {
    setTimerState: (state, action) => {
      state.timerState = action.payload; // Update Redux state
      localStorage.setItem('timerState', action.payload); // Persist to localStorage
    },
    resetTimerState: (state) => {
      state.timerState = "0-false"; // Reset state in Redux
      localStorage.setItem('timerState', "0-false"); // Reset in localStorage
    },
  },
});


// Action to update the timer state
export const { setTimerState,resetTimerState  } = OrderTimerSlice.actions;

// Selector to get the current timer state from the Redux store
export const selectTimerState = (state) => state.timerState.timerState;

export default OrderTimerSlice.reducer;



import { configureStore } from "@reduxjs/toolkit";

import TimerReducer from "./Slices/OrderTimerSlice.js"
export const store = configureStore({
  reducer: {
    
    timerState:TimerReducer
  },
});
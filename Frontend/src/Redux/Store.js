import { configureStore } from "@reduxjs/toolkit";

import LoginReducer from "./Slices/LogiinSlice"
export const store = configureStore({
  reducer: {
    
    loginslice:LoginReducer
  },
});
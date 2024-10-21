import { createSlice } from "@reduxjs/toolkit";

const loadFromLocalStorage = () => {
  const email = localStorage.getItem('email') || ""; 
  const role = localStorage.getItem('role') || ""; 
  const token= localStorage.getItem("token") || false;
  return { email, role,token };
};

const initialState = loadFromLocalStorage();

export const LoginSlice = createSlice({
  name: "loginslice",
  initialState,
  reducers: {
    setLoginValue: (state, action) => {
      const { email, role ,token} = action.payload;
      state.email = email; 
      state.role = role;
      state.token = token;
      localStorage.setItem('email', email); 
      localStorage.setItem('role', role); 
      localStorage.setItem('token', token); 
    },
    logoutFun: (state) => {
      state.email = ""; 
      state.role = "";
      state.token = false;

      localStorage.removeItem('email');
      localStorage.removeItem('role');
      localStorage.removeItem('token');

      if(localStorage.getItem('email') &&
      localStorage.getItem('role')){

        console.log("LocalStorege value  removed");
      }else{
        console.log("LocalStorege value not removed");
      }

    },
  },
});

export const { setLoginValue, logoutFun } = LoginSlice.actions;


export const selectEmail = (state) => state.loginslice.email;
export const selectRole = (state) => state.loginslice.role;
export const selectToken = (state) => state.loginslice.token;

export default LoginSlice.reducer;

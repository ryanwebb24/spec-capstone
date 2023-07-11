import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    username: "",
    token: "",
    isLoggedIn: false
  },
  reducers: {
    login: state => {
      state.isLoggedIn = true
      
    },
  }
})
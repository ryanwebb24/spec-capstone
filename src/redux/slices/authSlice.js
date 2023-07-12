import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    userId: "",
    token: "",
    isLoggedIn: false
  },
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn
      state.userId = action.payload.userId
      state.token = action.payload.token
    },
    logout: state => {
      state.isLoggedIn = false
      state.userId = ""
      state.token = ""
      console.log("logout ran")
    }
  }
})

export const { login, logout } = authSlice.actions
export const selectIsloggedIn = (state) => state.auth.isLoggedIn
export const selectToken = (state) => state.auth.token
export const selectUserId = (state) => state.auth.userId
export default authSlice.reducer
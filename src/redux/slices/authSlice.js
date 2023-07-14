import { createSlice } from "@reduxjs/toolkit";

function calculateRemainingTime(exp) {
  const currentTime = new Date().getTime()
  const expTime = exp
  const remainingTime = expTime - currentTime
  return remainingTime
}

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    userId: "",
    token: "",
    isLoggedIn: false,
    exp: 0
  },
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn
      state.userId = action.payload.userId
      state.token = action.payload.token
      state.exp = action.exp
      localStorage.setItem("userId", action.payload.userId)
      localStorage.setItem("token", action.payload.token)
      localStorage.setItem("exp", action.payload.exp)
      localStorage.setItem("isLoggedIn", action.payload.isLoggedIn)
    },
    logout: state => {
      state.isLoggedIn = false
      state.userId = ""
      state.token = ""
      state.exp = 0
      console.log("logout ran")
      localStorage.removeItem("userId")
      localStorage.removeItem("token")
      localStorage.removeItem("exp")
      localStorage.removeItem("isLoggedIn")
    },
    persistData: state => {
      let remainingTime = calculateRemainingTime(localStorage.getItem("exp")) 
      if (remainingTime <= 1000 * 60 * 30) {
        localStorage.removeItem("token")
        localStorage.removeItem("exp")
        localStorage.removeItem("userId")
        localStorage.removeItem("isLoggedIn")
      } else {
        state.isLoggedIn = localStorage.getItem("isLoggedIn")
        state.userId = localStorage.getItem("userId")
        state.token = localStorage.getItem("token")
        state.exp = remainingTime
      }
    }
  }
})

export const { login, logout, persistData } = authSlice.actions
export const selectIsloggedIn = (state) => state.auth.isLoggedIn
export const selectToken = (state) => state.auth.token
export const selectUserId = (state) => state.auth.userId
export default authSlice.reducer
import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { login, logout } from "../../../redux/slices/authSlice"

function Login() {
  const [ username, setUsername ] = useState("")
  const [ password, setPassword ] = useState("")
  const [ message, setMessage ] = useState({status: "", text: ""})
  const navigate = useNavigate()
  const dispatch = useDispatch()

  function submitHandler(event) {
    event.preventDefault()
    let body = {
      username, 
      password
    }
    axios.post("http://localhost:5000/login", body)
    .then(res => {
      let {userId, username, token, exp} = res.data
      setUsername("")
      setPassword("")
      dispatch(login({userId, token, isLoggedIn: true, exp}))
      navigate("/feed")
      // make sure that the returned is added to redux and that isLoggedIn is set to true
    })
    .catch(err => {setMessage({status: "error", text: err.response.data})})
  }

  return (
    <form onSubmit={submitHandler}>
      <input type="text" placeholder="Username" value={username} onChange={(event) => {setUsername(event.target.value)}}/>
      <input type="password" placeholder="Password" value={password} onChange={(event) => {setPassword(event.target.value)}}/>
      <button type="submit">login</button>
      <p>{message.text}</p>
    </form>
  )
}

export default Login
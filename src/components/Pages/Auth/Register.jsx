import React, { useState } from 'react'
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { login, logout } from "../../../redux/slices/authSlice"
import { useNavigate } from "react-router-dom"

function Register() {
  const [ username, setUsername ] = useState("")
  const [ password, setPassword ] = useState("")
  const [ secondPassword, setSecondPassword ] = useState("")
  const [ email, setEmail ] = useState("")
  const [ message, setMessage ] = useState({status: "", text: ""})
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  function submitHandler(event) {
    event.preventDefault()
    if (password === secondPassword) {
      let body = {
        email,
        username,
        password
      }
      axios.post("http://localhost:5000/register", body)
      .then((res) => {
        console.log(res.data)
        let {exp, token, userId, username} = res.data
        setUsername("")
        setEmail("")
        setPassword("")
        setSecondPassword("")
        setMessage({status: "success", text: "Created user"})
        dispatch(login({userId, token, isLoggedIn: true, exp}))
        navigate("/feed")
      })
      .catch(err => console.log(err))
    } else {
      setMessage({status: "error", text: "Passwords dont match"})
    }
  }

  return (
    <form onSubmit={submitHandler}>
      <input type="text" placeholder="Email" value={email} onChange={ event => setEmail(event.target.value)}/>
      <input type="text" placeholder="Username" value={username} onChange={ event => setUsername(event.target.value)}/>
      <input type="password" placeholder="Password" value={password} onChange={ event => setPassword(event.target.value)}/>
      <input type="password" placeholder="Type password again" value={secondPassword} onChange={ event => setSecondPassword(event.target.value)}/>
      <button type="submit">Create account</button>
      <p>{message.text}</p>
    </form>
  )
}

export default Register
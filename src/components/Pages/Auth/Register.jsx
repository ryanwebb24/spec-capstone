import React, { useState } from 'react'
import axios from "axios"
import { useDispatch} from "react-redux"
import { login} from "../../../redux/slices/authSlice"
import { useNavigate } from "react-router-dom"
import styles from "./Register.module.css"

function Register({ setLogin }) {
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
      axios.post("https://specserver.thewebbdeveloper.com/register", body)
      .then((res) => {
        let {exp, token, userId, username} = res.data
        setUsername("")
        setEmail("")
        setPassword("")
        setSecondPassword("")
        setMessage({status: "success", text: "Created user"})
        dispatch(login({userId, token, isLoggedIn: true, exp}))
        navigate("/")
      })
      .catch(err => console.log(err))
    } else {
      setMessage({status: "error", text: "Passwords dont match"})
    }
  }

  return (
    <form className={styles.registerForm} onSubmit={submitHandler}>
      <input className={styles.email} type="text" placeholder="Email" value={email} onChange={ event => setEmail(event.target.value)}/>
      <input className={styles.username} type="text" placeholder="Username" value={username} onChange={ event => setUsername(event.target.value)}/>
      <input className={styles.password} type="password" placeholder="Password" value={password} onChange={ event => setPassword(event.target.value)}/>
      <input className={styles.secondPassword} type="password" placeholder="Type password again" value={secondPassword} onChange={ event => setSecondPassword(event.target.value)}/>
      <p className={styles[message.status]}>{message.text}</p>
      <button className={styles.createBtn} type="submit">Create account</button>
      <p className={styles.text}>Already have an account?</p>
      <button className={styles.loginBtn} type="button" onClick={() => {setLogin(true)}}>Login</button>
    </form>
  )
}

export default Register
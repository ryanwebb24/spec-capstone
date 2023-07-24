import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { useDispatch} from "react-redux"
import { login} from "../../../redux/slices/authSlice"
import styles from "./Login.module.css"

function Login({ setLogin }) {
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
      let {userId, token, exp} = res.data
      setUsername("")
      setPassword("")
      dispatch(login({userId, token, isLoggedIn: true, exp}))
      navigate("/")
      // make sure that the returned is added to redux and that isLoggedIn is set to true
    })
    .catch(err => {setMessage({status: "error", text: err.response.data})})
  }

  return (
    <form className={styles.loginForm} onSubmit={submitHandler}>
      <input className={styles.username} type="text" placeholder="Username" value={username} onChange={(event) => {setUsername(event.target.value)}}/>
      <input className={styles.password} type="password" placeholder="Password" value={password} onChange={(event) => {setPassword(event.target.value)}}/>
      <p className={styles[message.status]}>{message.text}</p>
      <button className={styles.loginBtn} type="submit">login</button>
      <p className={styles.text}>Don't have an acount?</p>
      <button className={styles.registerBtn} onClick={() => {setLogin(false)}}>register</button>
    </form>
  )
}

export default Login
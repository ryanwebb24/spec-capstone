import React, { useState } from 'react'
import Login from "./Login"
import Register from "./Register"

function Auth() {
  const [ login, setLogin ] = useState(true)
  return (
    <>
      {login ? <Login /> : <Register />}
      <button onClick={() => setLogin(prevValue => !prevValue)}>{login ? "Register" : "Login"}</button>
    </>
  )
}

export default Auth
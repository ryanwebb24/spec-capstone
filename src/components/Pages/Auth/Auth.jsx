import React, { useState } from 'react'
import Login from "./Login"
import Register from "./Register"

function Auth() {
  const [ login, setLogin ] = useState(true)
  return (
    <>
      {login ? <Login setLogin={setLogin} /> : <Register setLogin={setLogin} />}
    </>
  )
}

export default Auth
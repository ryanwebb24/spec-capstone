import React from "react"
import { NavLink, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import styles from "./Header.module.css"
import { selectIsloggedIn, selectUserId } from "../../redux/slices/authSlice"
import { logout } from "../../redux/slices/authSlice"

function Header() {
  const isLoggedIn = useSelector(selectIsloggedIn)
  const userId = useSelector(selectUserId)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  function clickHandler() {
    dispatch(logout())
    navigate("/")
  }
  return (
    <header className={styles.header}>
      <div className={styles.leftNav}>
        <NavLink to="">Home</NavLink>
        {isLoggedIn && (
          <>
            <NavLink to={`profile/${userId}`}>Profile</NavLink>
            <NavLink to="post">New Post</NavLink>
          </>
        )}
      </div>
      <div className={styles.middleNav}>
          <h1>Trip Bliss</h1>
      </div>
      <div className={styles.rightNav}>
        {isLoggedIn ? (
          <button onClick={clickHandler}>Logout</button>
        ) : (
          <NavLink className={styles.login} to="login">Login</NavLink>
        )}
      </div>
    </header>
  )
}

export default Header

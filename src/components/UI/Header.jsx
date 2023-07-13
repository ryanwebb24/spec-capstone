import React from "react"
import { NavLink, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import styles from "./Header.module.css"
import { selectIsloggedIn } from "../../redux/slices/authSlice"
import { logout } from "../../redux/slices/authSlice"

function Header() {
  const isLoggedIn = useSelector(selectIsloggedIn)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  function clickHandler() {
    dispatch(logout())
    navigate("/feed")
  }
  return (
    <header className={styles.header}>
      <NavLink to="feed">{isLoggedIn ? "Feed" : "Home"}</NavLink>
      {isLoggedIn && (
        <>
          <NavLink to="profile">Profile</NavLink>
          <NavLink to="post">New Post</NavLink>
        </>
      )}
      {isLoggedIn ? (
        <button onClick={clickHandler}>Logout</button>
      ) : (
        <NavLink to="login">Login</NavLink>
      )}
    </header>
  )
}

export default Header

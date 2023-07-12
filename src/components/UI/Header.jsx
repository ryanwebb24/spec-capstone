import React from 'react'
import { NavLink } from "react-router-dom"
import { useSelector } from "react-redux"
import styles from "./Header.module.css"
import { selectIsloggedIn } from "../../redux/slices/authSlice"

function Header() {
  const isLoggedIn = useSelector(selectIsloggedIn)
  return (
    <header className={styles.header}>
      <NavLink to="feed">Feed</NavLink>
      <NavLink to="profile">Profile</NavLink>
      <NavLink to="post">New Post</NavLink>
      {isLoggedIn ? <NavLink to="logout">Logout</NavLink> : <NavLink to="login">Login</NavLink> }
    </header>
  )
}

export default Header
import React from 'react'
import { NavLink } from "react-router-dom"

function Header() {
  return (
    <div>
      <NavLink to="feed">Feed</NavLink>
      <NavLink to="profile">Profile</NavLink>
      <NavLink to="post">New Post</NavLink>
      <NavLink to="login">Login</NavLink>
    </div>
  )
}

export default Header
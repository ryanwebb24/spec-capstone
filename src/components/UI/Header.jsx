import React from 'react'
import { NavLink } from "react-router-dom"

function Header() {
  return (
    <div>
      <NavLink to="feed">Feed</NavLink>
      <NavLink to="profile">Profile</NavLink>
    </div>
  )
}

export default Header
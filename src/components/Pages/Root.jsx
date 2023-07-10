import React from 'react'
import Header from "../UI/Header"
import Footer from "../UI/Footer"
import {Outlet} from "react-router-dom"

function Root() {
  return (
    <>
      <Header />
      <Outlet/>
      <Footer />
    </>
  )
}

export default Root
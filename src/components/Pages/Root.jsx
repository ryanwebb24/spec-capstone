import React from 'react'
import Header from "../UI/Header"
import Footer from "../UI/Footer"
import {Outlet} from "react-router-dom"
import styles from "./Root.module.css"

function Root() {
  return (
    <div className={styles.mainContent}>
      <Header />
      <div className={styles.outlet}>
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default Root
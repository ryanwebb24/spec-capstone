import React from 'react'
import styles from "./Footer.module.css"

function Footer() {
  return (
    <div className={styles.footer}>
      <p>Contact me <br /> ryan.jwebb19@gmail.com</p>
      <div>
        <p>Trip Bliss</p>
        <a className={styles.github} href="https://github.com/ryanwebb24/spec-capstone">Github</a>
      </div>
      <p>Made by Ryan Webb 2023</p>
    </div>
  )
}

export default Footer
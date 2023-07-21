import React, { useEffect, useState, useCallback } from "react"
import { useNavigate, Link } from "react-router-dom"
import axios from "axios"
import styles from "./Home.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStar, faLocationDot } from "@fortawesome/free-solid-svg-icons"
import IndividualPost from "./IndividualPost/IndividualPost"

function Home() {
  const [posts, setPosts] = useState([])
  
  useEffect(() => {
    axios
      .get("http://localhost:5000/posts")
      .then((res) => {
        setPosts(res.data)
        console.log(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])
  
  return (
    <main className={styles.feedContent}>
      {posts
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .map((post) => (
          <IndividualPost post={post} key={post.id} style="feed"/>
        ))}
    </main>
  )
}

export default Home

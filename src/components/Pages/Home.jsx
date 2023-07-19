import React, { useEffect, useState, useCallback } from "react"
import { useNavigate, Link } from "react-router-dom"
import axios from "axios"
import styles from "./Home.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStar, faLocationDot } from "@fortawesome/free-solid-svg-icons"

function Home() {
  const [posts, setPosts] = useState([])
  const navigate = useNavigate()
  useEffect(() => {
    axios
      .get("http://localhost:5000/posts")
      .then((res) => {
        setPosts(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])
  let starRating = useCallback((amount) => {
    let stars = []
    for (let i = 0; i < amount; i++) {
      stars.push(<FontAwesomeIcon className={styles.star} icon={faStar} />)
    }
    return stars
  })
  return (
    <main className={styles.feedContent}>
      {posts
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .map((post) => (
          <div className={styles.post} key={post.id}>
            <div className={styles.topPost}>
              <Link className={styles.username} to={`/profile/${post.user.id}`}>
                {post.user.username}
              </Link>
              <div className={styles.locationContainer} onClick={() => {navigate(`/locations/${post.location.id}`)}}>
              <FontAwesomeIcon className={styles.locationPin} icon={faLocationDot}/>
                <p className={styles.location}>
                  {post.location.name}
                </p>
              </div>
            </div>
            <div
              className={styles.MainPost}
              onClick={() => {
                navigate(`/posts/${post.id}`)
              }}
            >
              <img className={styles.image} src={post.url} alt="img" />
              <h2 className={styles.title}>{post.title}</h2>
              <p className={styles.date}>
                {new Date(post.createdAt)
                  .toDateString()
                  .split(" ")
                  .splice(1, 3)
                  .join(" ")}
              </p>
              <div className={styles.rating}>
                {starRating(post.locationRating)}
              </div>
              <p className={styles.content}>{post.content}</p>
              <p className={styles.likes}>
                {post.likes.length === 1
                  ? post.likes.length + " like"
                  : post.likes.length + " likes"}
              </p>
            </div>
          </div>
        ))}
    </main>
  )
}

export default Home

import React from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState, useCallback } from "react"
import axios from "axios"
import styles from "./Location.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLocationDot, faStar } from "@fortawesome/free-solid-svg-icons"

function Location() {
  const params = useParams()
  const navigate = useNavigate()
  const [location, setLocation] = useState({ name: "", address: "", posts: [] })
  let starRating = useCallback((amount) => {
    let stars = []
    for (let i = 0; i < amount; i++) {
      stars.push(
        <FontAwesomeIcon className={styles.star} icon={faStar} key={i} />
      )
    }
    return stars
  })
  useEffect(() => {
    axios
      .get(`https://specserver.thewebbdeveloper.com/locations/${params.id}`)
      .then((res) => {
        setLocation(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])
  return (
    <div className={styles.locationContainer}>
      <h2 className={styles.name}>{location.name}</h2>
      <div className={styles.fullLocation}>
        <FontAwesomeIcon className={styles.locationPin} icon={faLocationDot} />
        <p className={styles.address}>{location.address}</p>
      </div>
      <div className={styles.rating}>
        {starRating(
          Math.round(
            location.posts.reduce((acc, curr) => acc + curr.locationRating, 0) /
              location.posts.length
          )
        )}
      </div>
      <div className={styles.imageContainer}>
        {location.posts.map((post) => (
          <img className={styles.image} src={post.url} alt="img" />
        ))}
      </div>
      <h2>Posts:</h2>
      <div className={styles.postContainer}>
        {location.posts.map((post) => (
          <div
            className={styles.post}
            key={post.id}
            onClick={() => {
              navigate(`/posts/${post.id}`)
            }}
          >
            <h3 className={styles.username}>{post.user.username}</h3>
            <div className={styles.mainPost}>
              <div>
                <h3 className={styles.postTitle}>{post.title}</h3>
                <div className={styles.rating}>
                  {starRating(post.locationRating)}
                </div>
              </div>
              <p className={styles.postContent}>{post.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Location

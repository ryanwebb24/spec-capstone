import React from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectToken } from "../../../redux/slices/authSlice"
import styles from "./IndividualPostForm.module.css"

function IndividualPostForm({ id, post, setPost, setEdit }) {
  const token = useSelector(selectToken)
  const navigate = useNavigate()

  function submitHandler(event) {
    event.preventDefault()
    axios
      .put(`http://44.202.237.178:5000/posts/${id}`, post, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        setEdit(false)
      })
      .catch((err) => console.log(err))
  }
  return (
    <div className={styles.editFormContainer}>
      <form className={styles.editForm} onSubmit={submitHandler}>
        <img className={styles.locationImg} src={post.url} alt="img" />
        <label className={styles.label} htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          className={styles.title}
          value={post.title}
          placeholder="Title"
          onChange={(event) => {
            setPost((prevValue) => {
              return {
                title: event.target.value,
                content: prevValue.content,
                url: prevValue.url,
                likes: prevValue.likes,
                // add address
                locationRating: prevValue.locationRating,
                createdAt: prevValue.createdAt,
                userId: prevValue.createdAt,
                user: prevValue.user,
                location: prevValue.location,
                likes: prevValue.likes,
                comments: prevValue.comments
              }
            })
          }}
        />
        <label className={styles.label} htmlFor="caption">Caption:</label>
        <input
          type="text"
          id="caption"
          className={styles.content}
          value={post.content}
          placeholder="Caption"
          onChange={(event) => {
            setPost((prevValue) => {
              return {
                title: prevValue.title,
                content: event.target.value,
                url: prevValue.url,
                likes: prevValue.likes,
                // add address
                locationRating: prevValue.locationRating,
                createdAt: prevValue.createdAt,
                userId: prevValue.createdAt,
                user: prevValue.user,
                location: prevValue.location,
                likes: prevValue.likes,
                comments: prevValue.comments
              }
            })
          }}
        />
        <label className={styles.label} htmlFor="rating">Rating:</label>
        <input
          type="number"
          id="rating"
          className={styles.locationRating}
          value={post.locationRating}
          max={5}
          min={1}
          placeholder="Rating(1-5)"
          onChange={(event) => {
            setPost((prevValue) => {
              return {
                title: prevValue.title,
                content: prevValue.content,
                url: prevValue.url,
                likes: prevValue.likes,
                // add address
                locationRating: +event.target.value,
                createdAt: prevValue.createdAt,
                userId: prevValue.createdAt,
                user: prevValue.user,
                location: prevValue.location,
                likes: prevValue.likes,
                comments: prevValue.comments
              }
            })
          }}
        />
        {/* add location address */}
        <button className={styles.submitBtn} type="submit">Save</button>
      </form>
    </div>
  )
}

export default IndividualPostForm

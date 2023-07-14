import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectUserId, selectToken } from "../../redux/slices/authSlice"
import axios from "axios"

function IndividualPost() {
  const params = useParams()
  const userId = useSelector(selectUserId)
  const token = useSelector(selectToken)
  // add address
  const [post, setPost] = useState({
    title: "",
    content: "",
    url: "",
    likes: "",
    locationRating: "",
    createdAt: "",
    userId: "",
  })
  const [edit, setEdit] = useState(false)
  function getPost() {
    axios
      .get(`http://localhost:5000/posts/${params.id}`)
      .then((res) => {
        setPost(res.data)
      })
      .catch((err) => console.log(err))
  }
  useEffect(() => {
    getPost()
  }, [])
  function submitHandler(event) {
    event.preventDefault()
    axios
      .put(`http://localhost:5000/posts/${params.id}`, post, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        console.log(res.data)
        getPost()
        // add put to send back the updated file
        setEdit(false)
      })
      .catch((err) => console.log(err))
  }
  return (
    <>
      {edit ? (
        <form onSubmit={submitHandler}>
          <input
            type="text"
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
                }
              })
            }}
          />
          <img src={post.url} alt="img" />
          <input
            type="text"
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
                }
              })
            }}
          />
          <input
            type="number"
            value={post.locationRating}
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
                }
              })
            }}
          />
          {/* add location address */}
          <button type="submit">Save</button>
        </form>
      ) : (
        <div>
          <h2>{post.title}</h2>
          <p>
            {new Date(post.createdAt)
              .toDateString()
              .split(" ")
              .splice(1, 3)
              .join(" ")}
          </p>
          <img src={post.url} alt="img" />
          <p>{post.content}</p>
          <p>{post.locationRating}</p>
          <p>{post.likes}</p>
          {post.userId === userId ? (
            <button
              onClick={() => {
                setEdit(true)
              }}
            >
              Edit Post
            </button>
          ) : null}
        </div>
      )}
    </>
  )
}

export default IndividualPost

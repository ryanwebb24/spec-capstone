import React from "react"
import axios from "axios"
import { useSelector } from "react-redux"
import { selectToken } from "../../../redux/slices/authSlice"

function IndividualPostForm({ id, post, setPost, setEdit }) {
  const token = useSelector(selectToken)

  function submitHandler(event) {
    event.preventDefault()
    axios
      .put(`http://localhost:5000/posts/${id}`, post, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        setPost(res.data.post)
        setEdit(false)
      })
      .catch((err) => console.log(err))
  }
  return (
    <div>
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
    </div>
  )
}

export default IndividualPostForm

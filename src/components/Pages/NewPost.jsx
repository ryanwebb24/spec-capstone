import React, { useState } from "react"
import axios from "axios"
import { useSelector } from "react-redux"
import { selectUserId, selectToken } from "../../redux/slices/authSlice"
function NewPost() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [address, setAddress] = useState("")
  const [url, setUrl] = useState("")
  const [rating, setRating] = useState("")
  const [locationName, setLocationName] = useState("")
  const userId = useSelector(selectUserId)
  const token = useSelector(selectToken)

  function submitHandler(event) {
    event.preventDefault()
    let body = {
      title,
      content,
      address,
      locationName,
      url,
      rating,
      userId,
    }
    axios
      .post("http://localhost:5000/posts", body, {
        headers: {
          Authorization: token,
        },
      })
      .then(() => {
        setAddress("")
        setContent("")
        setTitle("")
        setUrl("")
        setRating("")
        setLocationName("")
      })
      .catch((err) => {
        console.log(err)
      })
  }
  return (
    <>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(event) => {
            setTitle(event.target.value)
          }}
        />
        <input
          type="text"
          placeholder="Caption"
          value={content}
          onChange={(event) => {
            setContent(event.target.value)
          }}
        />
        <input
          type="text"
          placeholder="Location Name"
          value={locationName}
          onChange={(event) => {
            setLocationName(event.target.value)
          }}
        />
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(event) => {
            setAddress(event.target.value)
          }}
        />
        <input
          type="text"
          placeholder="Image URL"
          value={url}
          onChange={(event) => {
            setUrl(event.target.value)
          }}
        />
        <input
          type="number"
          placeholder="Rating(1-5)"
          max={5}
          min={1}
          value={rating}
          onChange={(event) => {
            setRating(event.target.value)
          }}
        />
        <button type="submit">Post</button>
      </form>
    </>
  )
}

export default NewPost

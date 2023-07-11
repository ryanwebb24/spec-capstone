import React, { useState } from 'react'
import axios from "axios"

function NewPost() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [address, setAddress] = useState("")
  const [url, setUrl] = useState("")
  const [rating, setRating] = useState("")

  function submitHandler(event) {
    event.preventDefault()
    let body = {
      title,
      content,
      address,
      url,
      rating
    }
    axios.post("http://localhost:5000/posts", body)
    .then(() => {
      setAddress("")
      setContent("")
      setTitle("")
      setUrl("")
      setRating("")
    })
    .catch(err => {console.log(err)})
  }
  return (
    <>
      <form onSubmit={submitHandler}>
        <input type="text" placeholder="Title" value={title} onChange={(event) => {setTitle(event.target.value)}}/>
        <input type="text" placeholder="Description" value={content} onChange={(event) => {setContent(event.target.value)}}/>
        <input type="text" placeholder="Address" value={address} onChange={(event) => {setAddress(event.target.value)}}/>
        <input type="text" placeholder="Image URL" value={url} onChange={(event) => {setUrl(event.target.value)}}/>
        <input type="number" placeholder="Rating(1-5)" value={rating} onChange={(event) => {setRating(event.target.value)}}/>
        <button type="submit">Post</button>
      </form>
    </>
  )
}

export default NewPost
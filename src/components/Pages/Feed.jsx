import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"


function Feed() {
  const [ posts, setPosts ] = useState([])
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
  return (
    <div>
      {posts.map((post) => (
        <div key={post.id} onClick={() => {navigate(`/posts/${post.id}`)}} >
        {/* add location address */}
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          <p>{post.locationRating}</p>
          <p>{post.likes.length}</p>
          <img src={post.url} alt="img" />
        </div>
      ))}
    </div>
  )
}

export default Feed

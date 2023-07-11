import React, { useEffect, useState } from "react"
import axios from "axios"

function Feed() {
  const [posts, setPosts] = useState([])
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
        <div key={post.id}> {/* change to actual id for each post */}
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          <p>{post.address}</p>
          <p>{post.likes}</p>
          <p>{post.locationRating}</p>
          <img src={post.url} alt="img" />
        </div>
      ))}
    </div>
  )
}

export default Feed

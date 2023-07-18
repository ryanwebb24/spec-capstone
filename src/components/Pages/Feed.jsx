import React, { useEffect, useState } from "react"
import { useNavigate, Link } from "react-router-dom"
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
      {posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((post) => (
        <div key={post.id} onClick={() => {navigate(`/posts/${post.id}`)}} >
          <Link to={`/profile/${post.user.id}`}>{post.user.username}</Link>
          <h2>{post.title}</h2>
          <Link to={`/locations/${post.location.id}`}>{post.location.name}</Link>
          <p> 
                {new Date(post.createdAt)
                  .toDateString()
                  .split(" ")
                  .splice(1, 3)
                  .join(" ")}
          </p>
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

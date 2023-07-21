import React from 'react'
import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import styles from "./Location.module.css"

function Location() {
  const params = useParams()
  const navigate = useNavigate()
  const [location, setLocation] = useState({name: "", address: "", posts: []})
  useEffect(() => {
    axios.get(`http://localhost:5000/locations/${params.id}`)
    .then(res => {
      setLocation(res.data)
    })
    .catch(err => {
      console.log(err)
    })
  },[])
  return (
    <>
      <h2>{location.name}</h2>
      <p>{location.address}</p>
      <div>
        {location.posts.map(post => (<img className={styles.image} src={post.url} alt="img"/>))}
      </div>
      <p>Rating: {Math.round((location.posts.reduce((acc, curr) => (acc + curr.locationRating), 0)) / location.posts.length)}</p>
      {location.posts.map(post => (
        <div key={post.id} onClick={() => {navigate(`/posts/${post.id}`)}}>
          <h3>{post.title}</h3>
          <p>{post.locationRating}</p>
          <p>{post.content}</p>
        </div>
      ))}
    </>
  )
}

export default Location
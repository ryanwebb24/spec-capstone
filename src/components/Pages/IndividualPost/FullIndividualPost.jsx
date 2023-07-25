import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectUserId } from "../../../redux/slices/authSlice"
import axios from "axios"
import IndividualPostForm from "./IndividualPostForm"
import IndividualPost from "./IndividualPost"
import styles from "./FullIndividualPost.module.css"

function FullIndividualPost() {
  const userId = useSelector(selectUserId)
  const params = useParams()
  const [post, setPost] = useState({
    title: "",
    content: "",
    url: "",
    locationRating: "",
    createdAt: "",
    userId: "",
    location: {},
    user: {}, 
    comments: [],
    likes: []
  })
  const [edit, setEdit] = useState(false)
  function getPost() {
    axios
      .get(`http://44.202.237.178:5000/posts/${params.id}`)
      .then((res) => {
        setPost(res.data)
        console.log(res.data)
      })
      .catch((err) => console.log(err))
  }
  useEffect(() => {
    getPost()
  }, [])
  return (
    <div className={styles.postContainer}>
      {edit ? (
        <IndividualPostForm id={params.id} post={post} setPost={setPost} setEdit={setEdit}/>
      ) : 
        <>
          <IndividualPost post={post} style="post"/>
          {userId === post.user.id ? <button className={styles.editBtn} onClick={() => {setEdit(true)}}>Edit Post</button> : null}
        </>
      }
    </div>
  )
}

export default FullIndividualPost

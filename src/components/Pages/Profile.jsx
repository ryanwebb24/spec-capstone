import React from "react"
import { useEffect, useState } from "react"
import axios from "axios"
import { useSelector } from "react-redux"
import { selectToken, selectUserId } from "../../redux/slices/authSlice"
import { useParams } from "react-router-dom"
import IndividualPost from "./IndividualPost/IndividualPost"
import styles from "./Profile.module.css"

function Profile() {
  const params = useParams()
  const userId = useSelector(selectUserId)
  const token = useSelector(selectToken)
  const [profile, setProfile] = useState({user: {}, posts: []})
  const [isPublic, setIsPublic] = useState(true)
  const [bio, setBio] = useState("")
  const [editBio, setEditBio] = useState(false)

  useEffect(() => {
    axios
      .get(`https://specserver.thewebbdeveloper.com/profile/${params.id}`)
      .then((res) => {
        setProfile(res.data)
        setBio(res.data.bio)
        setIsPublic(res.data.isPublic)
      })
      .catch((err) => console.log(err))
  }, [])
  function deleteHandler(id) {
    axios
      .delete(`https://specserver.thewebbdeveloper.com/posts/${id}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        setProfile((prevValue) => {
          return {
            user: prevValue.user,
            posts: prevValue.posts.filter((post) => post.id !== id),
          }
        })
      })
      .catch((err) => console.log(err))
  }
  function editBioHandler() {
    let body = {
      bio
    }
    axios.put(`https://specserver.thewebbdeveloper.com/profile/${userId}`, body, {
      headers: {
        Authorization: token
      }
    })
    .then(res => {
      setBio(res.data.bio)
      setEditBio(false)
    })
    .catch(err => {
      console.log(err)
    })
  }
  function editIsPublicHandler(bool) {
    let body = {
      isPublic: bool
    }
    axios.put(`https://specserver.thewebbdeveloper.com/profile/${userId}`, body, {
      headers: {
        Authorization: token
      }
    })
    .then(res => {
      setIsPublic(res.data.isPublic)
    })
    .catch(err => {
      console.log(err)
    })
  }
  return (
    <div className={styles.profilePage}>
      <div className={styles.profileContainer}>
        <h2 className={styles.username}>{profile.username}</h2>
        <p className={styles.date}>
          Member since{" "}
          {`${new Date(profile.createdAt)
            .toDateString()
            .split(" ")
            .splice(1, 3)
            .join(" ")}`}
        </p>
        {userId === profile.id ? <p className={styles.email}>{profile.email}</p> : null}
        {profile.id === userId && (isPublic ? (<button className={styles.btn} onClick={() => {editIsPublicHandler(false)}}>Set to private</button>) : (<button className={styles.btn} onClick={() => {editIsPublicHandler(true)}}>Set to Public</button>))}
        {bio !== "" && !editBio ? (<p className={styles.bio}>{bio}</p>): null}
        {profile.id === userId ? (!editBio ?  (
          <button className={styles.btn} onClick={() => {setEditBio(true)}}>Edit bio</button>
        ) : (
          <div className={styles.editBio}>
            <textarea className={styles.newBio} placeholder="bio" onChange={(event) => {setBio(event.target.value)}}/>
            <button className={styles.btn} onClick={editBioHandler}>Save</button>
          </div>
        )) : null}
      </div>
      <div className={styles.postContainer}>
        <h2 className={styles.postTitle}>My Posts</h2>
        {profile.posts
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .map((post) => (
            <IndividualPost post={post} style="post"/>
          ))}
      </div>
    </div>
  )
}
export default Profile

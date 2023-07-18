import React from "react"
import { useEffect, useState } from "react"
import axios from "axios"
import { useSelector } from "react-redux"
import { selectToken, selectUserId } from "../../redux/slices/authSlice"
import { useParams, useNavigate } from "react-router-dom"

function Profile() {
  const params = useParams()
  const navigate = useNavigate()
  const userId = useSelector(selectUserId)
  const token = useSelector(selectToken)
  const [profile, setProfile] = useState({user: {}, posts: []})
  const [isPublic, setIsPublic] = useState(true)
  const [bio, setBio] = useState("")
  const [editBio, setEditBio] = useState(false)

  useEffect(() => {
    axios
      .get(`http://localhost:5000/profile/${params.id}`)
      .then((res) => {
        setProfile(res.data)
        setBio(res.data.bio)
        setIsPublic(res.data.isPublic)
      })
      .catch((err) => console.log(err))
  }, [])
  function deleteHandler(id) {
    axios
      .delete(`http://localhost:5000/posts/${id}`, {
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
    axios.put(`http://localhost:5000/profile/${userId}`, body, {
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
    axios.put(`http://localhost:5000/profile/${userId}`, body, {
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
    <>
      <div>
        <h2>{profile.username}</h2>
        <p>
          Memeber since{" "}
          {`${new Date(profile.createdAt)
            .toDateString()
            .split(" ")
            .splice(1, 3)
            .join(" ")}`}
        </p>
        <p>{profile.email}</p>
        {profile.id === userId && (isPublic ? (<button onClick={() => {editIsPublicHandler(false)}}>Set to Private</button>) : (<button onClick={() => {editIsPublicHandler(true)}}>Set to Public</button>))}
        {bio !== "" && !editBio ? (<p>{bio}</p>): null}
        {profile.id === userId ? (!editBio ?  (
          <button onClick={() => {setEditBio(true)}}>Edit bio</button>
        ) : (
          <div>
            <input type="text" placeholder="bio" onChange={(event) => {setBio(event.target.value)}}/>
            <button onClick={editBioHandler}>Save</button>
          </div>
        )) : null}
      </div>
      <div>
        <h2>My Posts</h2>
        {profile.posts
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .map((post) => (
            <div key={post.id} onClick={() => {navigate(`/posts/${post.id}`)}}>
              <h3>{post.title}</h3>
              <p> 
                {new Date(post.createdAt)
                  .toDateString()
                  .split(" ")
                  .splice(1, 3)
                  .join(" ")}
              </p>
              {/* add location address */}
              <p>likes: {post.likes.length}</p>
              <p>{post.content}</p>
              <img src={post.url} alt="img" />
              <p>Rating: {post.locationRating}</p>
              {profile.id === userId && <button
                onClick={() => {
                  deleteHandler(post.id)
                }}
              >
                Delete Post
              </button>}
            </div>
          ))}
      </div>
    </>
  )
}
export default Profile

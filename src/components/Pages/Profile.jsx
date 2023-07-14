import React from "react"
import { useEffect, useState } from "react"
import axios from "axios"
import { useSelector } from "react-redux"
import { selectToken, selectUserId } from "../../redux/slices/authSlice"

function Profile() {
  const userId = useSelector(selectUserId)
  const token = useSelector(selectToken)
  const [profile, setProfile] = useState({})

  useEffect(() => {
    axios
      .get(`http://localhost:5000/profile/${userId}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        setProfile(res.data)
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
  // function updateHandler(id) {
  //   axios.put(`http://localhost:5000/posts/${id}`, {
  //     headers: {
  //       Authorization: token,
  //     },
  //   })
  // }

  return (
    <>
      <div>
        <h2>{`${profile?.user?.username}`}</h2>
        <p>
          Memeber since{" "}
          {`${new Date(profile?.user?.createdAt)
            .toDateString()
            .split(" ")
            .splice(1, 3)
            .join(" ")}`}
        </p>
        <p>{`${profile?.user?.email}`}</p>
        <button>{profile?.user?.isPublic ? "Public" : "Private"}</button>
        {profile?.user?.bio === "" ? (
          <button>add bio</button>
        ) : (
          <p>{profile?.user?.bio}</p>
        )}
      </div>
      <div>
        <h2>My Posts</h2>
        {profile?.posts
          ?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .map((post) => (
            <div key={post.id}>
              <h3>{post.title}</h3>
              <p>
                {new Date(post.createdAt)
                  .toDateString()
                  .split(" ")
                  .splice(1, 3)
                  .join(" ")}
              </p>
              {/* add location address */}
              <p>likes: {post.likes}</p>
              <p>{post.content}</p>
              <img src={post.url} alt="img" />
              <p>Rating: {post.locationRating}</p>
              <button
                onClick={() => {
                  deleteHandler(post.id)
                }}
              >
                Delete Post
              </button>
            </div>
          ))}
      </div>
    </>
  )
}
export default Profile

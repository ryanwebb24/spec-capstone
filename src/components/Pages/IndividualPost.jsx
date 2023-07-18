import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectUserId, selectToken } from "../../redux/slices/authSlice"
import axios from "axios"

function IndividualPost() {
  const params = useParams()
  const userId = useSelector(selectUserId)
  const token = useSelector(selectToken)
  // add address
  const [post, setPost] = useState({
    title: "",
    content: "",
    url: "",
    likes: "",
    locationRating: "",
    createdAt: "",
    userId: "",
  })
  const [edit, setEdit] = useState(false)
  const [addComment, setAddComment] = useState(false)
  const [userComment, setUserComment] = useState("")
  const [allComments, setAllComments] = useState([])
  const [allLikes, setAllLikes] = useState([])
  const [liked, setLiked] = useState(false)
  const [likedId, setLikedId] = useState("")
  function getPost() {
    axios
      .get(`http://localhost:5000/posts/${params.id}`)
      .then((res) => {
        setPost(res.data.post)
        setAllComments(res.data.comments)
        setAllLikes(res.data.likes)
      })
      .catch((err) => console.log(err))
  }
  useEffect(() => {
    getPost()
  }, [])
  function submitHandler(event) {
    event.preventDefault()
    axios
      .put(`http://localhost:5000/posts/${params.id}`, post, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        setPost(res.data.post)
        console.log(res.data.comments)
        setAllComments(res.data.comments)
        setAllLikes(res.data.likes)
        setEdit(false)
      })
      .catch((err) => console.log(err))
  }
  function addCommentHandler() {
    let body = {
      content: userComment,
      postId: params.id,
      userId,
    }
    axios
      .post("http://localhost:5000/comments", body, {
        headers: {
          Authorization: token,
        },
      })
      .then(() => {
        setAddComment(false)
        getPost()
      })
      .catch((err) => {
        console.log(err)
      })
  }
  function deleteHandler(id) {
    axios
      .delete(`http://localhost:5000/comments/${id}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        console.log(res.data)
        getPost()
      })
      .catch((err) => {
        console.log(err)
      })
  }
  function likeHandler(postId) {
    let body = {
      postId,
      userId,
    }
    axios
      .post(`http://localhost:5000/likes`, body, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        console.log(res.data)
        setLikedId(res.data)
        setLiked(true)
        getPost()
      })
      .catch((err) => {
        console.log(err)
      })
  }
  function unlikeHandler(id) {
    axios
      .delete(`http://localhost:5000/likes/${id}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        console.log(res.data)
        setLiked(false)
        getPost()
      })
      .catch((err) => {
        console.log(err)
      })
  }
  return (
    <>
      {edit ? (
        <form onSubmit={submitHandler}>
          <input
            type="text"
            value={post.title}
            placeholder="Title"
            onChange={(event) => {
              setPost((prevValue) => {
                return {
                  title: event.target.value,
                  content: prevValue.content,
                  url: prevValue.url,
                  likes: prevValue.likes,
                  // add address
                  locationRating: prevValue.locationRating,
                  createdAt: prevValue.createdAt,
                  userId: prevValue.createdAt,
                }
              })
            }}
          />
          <img src={post.url} alt="img" />
          <input
            type="text"
            value={post.content}
            placeholder="Caption"
            onChange={(event) => {
              setPost((prevValue) => {
                return {
                  title: prevValue.title,
                  content: event.target.value,
                  url: prevValue.url,
                  likes: prevValue.likes,
                  // add address
                  locationRating: prevValue.locationRating,
                  createdAt: prevValue.createdAt,
                  userId: prevValue.createdAt,
                }
              })
            }}
          />
          <input
            type="number"
            value={post.locationRating}
            placeholder="Rating(1-5)"
            onChange={(event) => {
              setPost((prevValue) => {
                return {
                  title: prevValue.title,
                  content: prevValue.content,
                  url: prevValue.url,
                  likes: prevValue.likes,
                  // add address
                  locationRating: +event.target.value,
                  createdAt: prevValue.createdAt,
                  userId: prevValue.createdAt,
                }
              })
            }}
          />
          {/* add location address */}
          <button type="submit">Save</button>
        </form>
      ) : (
        <div>
          <h2>{post.title}</h2>
          <p>
            {new Date(post.createdAt)
              .toDateString()
              .split(" ")
              .splice(1, 3)
              .join(" ")}
          </p>
          <img src={post.url} alt="img" />
          <p>{post.content}</p>
          <p>{post.locationRating}</p>
          <p>{allLikes.length}</p>
          {liked ? (
            <button
              onClick={() => {
                unlikeHandler(likedId)
              }}
            >
              Unlike
            </button>
          ) : (
            <button
              onClick={() => {
                likeHandler(post.id)
              }}
            >
              Like
            </button>
          )}
          {allComments.map((comment) => (
            <div key={comment.id}>
              <p>{comment.content}</p>
              {comment.userId === userId && <button
                onClick={() => {
                  deleteHandler(comment.id)
                }}
              >
                Delete Comment
              </button>}
            </div>
          ))}
          {addComment ? (
            <div>
              <input
                type="text"
                placeholder="comment here"
                onChange={(event) => {
                  setUserComment(event.target.value)
                }}
              />
              <button onClick={addCommentHandler}>Save</button>
            </div>
          ) : (
            <button
              onClick={() => {
                setAddComment(true)
              }}
            >
              Add Comment
            </button>
          )}
          {post.userId === userId ? (
            <button
              onClick={() => {
                setEdit(true)
              }}
            >
              Edit Post
            </button>
          ) : null}
        </div>
      )}
    </>
  )
}

export default IndividualPost

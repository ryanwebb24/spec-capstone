import React, { useCallback, useState, useEffect } from "react"
import styles from "./IndividualPost.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStar, faLocationDot } from "@fortawesome/free-solid-svg-icons"
import { Link, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectUserId, selectToken } from "../../../redux/slices/authSlice"
import axios from "axios"

function IndividualPost({ post, style }) {
  const navigate = useNavigate()
  const [liked, setLiked] = useState(false)
  const [likedId, setLikedId] = useState("")
  const [allLikes, setAllLikes] = useState([])
  const [allComments, setAllComments] = useState([])
  const [commentIsShown, setCommentIsShown] = useState(false)
  const [userComment, setUserComment] = useState("")
  const userId = useSelector(selectUserId)
  const token = useSelector(selectToken)

  let starRating = useCallback((amount) => {
    let stars = []
    for (let i = 0; i < amount; i++) {
      stars.push(
        <FontAwesomeIcon className={styles.star} icon={faStar} key={i} />
      )
    }
    return stars
  })

  function checkLiked() {
    let filteredList = post.likes.filter((like) => like.userId === userId)
    if (filteredList.length > 0) {
      setLiked(true)
      setLikedId(filteredList[0].id)
    }
  }
  useEffect(() => {
    checkLiked()
    setAllLikes(post.likes)
    setAllComments(post.comments)
  }, [post])

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
        setLikedId(res.data.id)
        setLiked(true)
        setAllLikes((prevValues) => [...prevValues, res.data])
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
      .then(() => {
        setLiked(false)
        setLikedId("")
        let filteredLikes = allLikes.filter((like) => like.id !== id)
        setAllLikes(filteredLikes)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  function addCommentHandler(id) {
    let body = {
      content: userComment,
      postId: id,
      userId,
    }
    axios
      .post("http://localhost:5000/comments", body, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        setAllComments((prevValues) => [...prevValues, res.data])
        setUserComment("")
      })
      .catch((err) => {
        console.log(err)
      })
  }
  function deleteCommentHandler(id) {
    axios
      .delete(`http://localhost:5000/comments/${id}`, {
        headers: {
          Authorization: token,
        },
      })
      .then(() => {
        let filteredComments = allComments.filter(comment => comment.id !== id)
        setAllComments(filteredComments)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  return (
    <div className={styles[style]} key={post.id}>
      <div className={styles.topPost}>
        <Link className={styles.username} to={`/profile/${post.user.id}`}>
          {post.user.username}
        </Link>
        <div
          className={styles.locationContainer}
          onClick={() => {
            navigate(`/locations/${post.location.id}`)
          }}
        >
          <FontAwesomeIcon
            className={styles.locationPin}
            icon={faLocationDot}
          />
          <p className={styles.location}>{post.location.name}</p>
        </div>
      </div>
      <div
        className={styles.MainPost}
        onClick={() => {
          navigate(`/posts/${post.id}`)
        }}
      >
        <img className={styles.image} src={post.url} alt="img" />
        <h2 className={styles.title}>{post.title}</h2>
        <p className={styles.date}>
          {new Date(post.createdAt)
            .toDateString()
            .split(" ")
            .splice(1, 3)
            .join(" ")}
        </p>
        <div className={styles.rating}>{starRating(post.locationRating)}</div>
        <p className={styles.content}>{post.content}</p>
        <p className={styles.likes}>
          {allLikes.length === 1
            ? allLikes.length + " like"
            : allLikes.length + " likes"}
        </p>
      </div>
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
      {!commentIsShown && (
        <button
          onClick={() => {
            setCommentIsShown(true)
          }}
        >
          View comments
        </button>
      )}
      <div className={styles.commentContainer}>
        {commentIsShown ? (
          allComments.length > 0 ? (
            [
              ...allComments.map((comment) => (
                <div>
                  <p>{comment.content}</p>
                  {comment.userId === userId ? <button onClick={() => {deleteCommentHandler(comment.id)}}>x</button> : null}
                </div>
              )),
              <button
                onClick={() => {
                  setCommentIsShown(false)
                }}
              >
                Hide Comments
              </button>,
            ]
          ) : (
            <>
              <p>No Comments Yet</p>
              <button
                  onClick={() => {
                    setCommentIsShown(false)
                  }}
                >
                  Hide Comments
              </button>
            </>
          )
        ) : null}
      </div>
      <div className={styles.addComment}>
        <input
          type="text"
          value={userComment}
          placeholder="Add a comment..."
          onChange={(event) => {
            setUserComment(event.target.value)
          }}
        />
        <button
          onClick={() => {
            addCommentHandler(post.id)
          }}
        >
          +
        </button>
      </div>
    </div>
  )
}

export default IndividualPost

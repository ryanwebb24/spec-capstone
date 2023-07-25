import React, { useCallback, useState, useEffect } from "react"
import styles from "./IndividualPost.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faStar,
  faLocationDot,
  faHeart as faSolidHeart,
  faMessage as faSolidMessage,
} from "@fortawesome/free-solid-svg-icons"
import {
  faHeart as faHollowHeart,
  faMessage as faHollowMessage,
} from "@fortawesome/free-regular-svg-icons"
import { Link, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectUserId, selectToken, selectIsloggedIn } from "../../../redux/slices/authSlice"
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
  const isLoggedIn = useSelector(selectIsloggedIn)

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
      .post(`http://44.202.237.178:5000/likes`, body, {
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
      .delete(`http://44.202.237.178:5000/likes/${id}`, {
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
    if (userComment.length > 0) {
      axios
        .post("http://44.202.237.178:5000/comments", body, {
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
  }
  function deleteCommentHandler(id) {
    axios
      .delete(`http://44.202.237.178:5000/comments/${id}`, {
        headers: {
          Authorization: token,
        },
      })
      .then(() => {
        let filteredComments = allComments.filter(
          (comment) => comment.id !== id
        )
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
        <img className={styles.image} src={post.url} alt="img" />
      </div>
      <div className={styles.bottomPost}>
        <div
          className={styles.mainPost}
          onClick={() => {
            navigate(`/posts/${post.id}`)
          }}
        >
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
            className={`${styles.unlikeBtn} ${styles.btn}`}
            onClick={() => {
              unlikeHandler(likedId)
            }}
          >
            <FontAwesomeIcon icon={faSolidHeart} />
          </button>
        ) : (
          <button
            className={`${styles.likeBtn} ${styles.btn}`}
            onClick={() => {
              likeHandler(post.id)
            }}
          >
            <FontAwesomeIcon icon={faHollowHeart} />
          </button>
        )}
        {!commentIsShown ? (
          <button
            className={`${styles.commentBtn} ${styles.btn}`}
            onClick={() => {
              setCommentIsShown(true)
            }}
          >
            <FontAwesomeIcon icon={faHollowMessage} />
          </button>
        ) : (
          <button
            className={styles.btn}
            onClick={() => {
              setCommentIsShown(false)
            }}
          >
            <FontAwesomeIcon icon={faSolidMessage} />
          </button>
        )}
        <div className={styles.commentContainer}>
          {commentIsShown ? (
            allComments.length > 0 ? (
              allComments.map((comment) => (
                <div className={styles.individualComment}>
                  <p>{comment.content}</p>
                  {comment.userId === userId ? (
                    <button
                      className={styles.btn}
                      onClick={() => {
                        deleteCommentHandler(comment.id)
                      }}
                    >
                      x
                    </button>
                  ) : null}
                </div>
              ))
            ) : (
              <p>No Comments Yet</p>
            )
          ) : null}
        </div>
        <div className={styles.addComment}>
          {isLoggedIn && <textarea
            className={styles.commentBox}
            value={userComment}
            placeholder="Add a comment..."
            onChange={(event) => {
              setUserComment(event.target.value)
            }}
          />}
          {userComment.length > 0 ? (
            <button
              className={`${styles.btn} ${styles.addCommentBtn}`}
              onClick={() => {
                addCommentHandler(post.id)
              }}
            >
              +
            </button>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default IndividualPost

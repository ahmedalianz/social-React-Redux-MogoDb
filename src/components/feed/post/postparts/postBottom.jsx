import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux';
import PeopleWhoLike from './likerbox';
export default function PostBottom({ post }) {
    const url = process.env.REACT_APP_URL;
    const { user } = useSelector(state => state.user)
    const [currentPost, setCurrentPost] = useState(post)
    const [likingRunning, setLiking] = useState(false)
    const [isLiked, setIsLiked] = useState(currentPost.likes.includes(user._id))
    const [first, setFirst] = useState(true)
    const [likeText1, setText1] = useState('')
    const [likeCount, setLikeCount] = useState(currentPost.likes.length)
    const [likeText2, setText2] = useState(' People like this')
    const [noComment, setNoComment] = useState('')
    useEffect(() => {
        setNoComment(currentPost.comments.length > 0 ? "" : 'd-none')
        if (first) {
            if (likeCount > 1) {
                setText1(isLiked ? "You and " : "")
                setLikeCount(isLiked ? (currentPost.likes.length - 1) : likeCount)
            } else if (likeCount === 1) {
                setText1(isLiked ? "You" : "")
                setLikeCount(isLiked ? 0 : likeCount)
                setText2(isLiked ? ' Like this' : " People like this")
            } else {
                setText2("")
            }
            setFirst(false)
        }
    }, [currentPost.likes.length, isLiked, currentPost.comments.length, likeCount, first])

    const handleLike = async () => {
        setLiking(true)
        let res = await axios.put(`${url}posts/likepost/${post._id}`, { userId: user._id })
        setCurrentPost(res.data)
        if (isLiked) {
            setText1("")
            setText2(currentPost.likes.length > 1 ? ' People Like this' : "")
        } else {
            if (likeCount === 0) {
                setText1("You Like this")
            } else {
                setText1("You and ")
            }
        }
        setIsLiked(!isLiked)
        setLiking(false)
    }

    return (
        <div className="post-bottom">
            <div className="post-bottom-left">
                <button className="post-like-button" disabled={likingRunning} onClick={handleLike}>
                    <img className="post-like" src='https://firebasestorage.googleapis.com/v0/b/sprout-sociaz.appspot.com/o/main%2Flike.png?alt=media&token=fb44b149-4fa4-4fe5-addd-71d3b2957294' alt='like' />
                </button>
                <PeopleWhoLike
                    likeCount={likeCount}
                    likeText1={likeText1}
                    likeText2={likeText2}
                    postLikers={post.likes}
                />
            </div>
            <div className={`post-bottom-right ${noComment}`}>
                <span className="post-comment-counter">
                    {post.comments.length} comments
                </span>
            </div>
        </div>
    )
}

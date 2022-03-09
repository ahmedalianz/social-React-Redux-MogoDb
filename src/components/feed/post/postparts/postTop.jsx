import React from 'react'
import { Dots } from '../../../icons'
import { Link } from 'react-router-dom';
import { format } from 'timeago.js';
import soon from '../../../soon'
// import axios from 'axios'
// import { useDispatch } from 'react-redux'
// import { setPostsInStore } from '../../../../redux/posts/posts'
export default function PostTop({ postUser, post }) {
    const url = process.env.REACT_APP_URL;
    // const dispatch = useDispatch()
    const handlePostDelete = async () => {
        // try {
        //     let res = await axios.delete(`${url}posts/deletepost/${post._id}`)
        //     dispatch(setPostsInStore(res.data.sort((p1, p2) =>
        //         new Date(p2.createdAt) - new Date(p1.createdAt)
        //     )))
        // }
        // catch (err) {
        //     console.log(err)
        // }
        soon()
        console.log('this will be delete')
    }

    return (
        <div className="post-top">
            <div className="post-top-left">
                <Link to={`/profile/${postUser.username}`}>
                    <img className="post-profile" alt='post userProfile' src={postUser.profilePicture || 'https://firebasestorage.googleapis.com/v0/b/sprout-sociaz.appspot.com/o/main%2FnoAvatar.png?alt=media&token=2d9631c1-69bd-46ba-94fe-78e2bc2872c4'} />
                </Link>
                <Link to={`/profile/${postUser.username}`}>
                    <span className="post-username">{postUser.username}</span>
                </Link>
                <span className="post-date">{format(post.createdAt)}</span>
            </div>
            <div className="post-top-right" onClick={handlePostDelete}>
                <Dots />
            </div>
        </div>
    )
}

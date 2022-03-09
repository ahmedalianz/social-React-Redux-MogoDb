import React, { useState, useEffect } from 'react'
import { format } from 'timeago.js';
import axios from 'axios';
import './comment.css'
import { Link } from 'react-router-dom'
import { MyLoader2 } from '../../../loader'
export default function Comment({ comment }) {
    const url = process.env.REACT_APP_URL;
    const [commenter, setCommenter] = useState(null)
    useEffect(() => {
        let mounted = true;
        async function fetchComments() {
            let res = await axios(`${url}users/?userId=${comment.userId}`)
            if (mounted) {
                setCommenter(res.data)
            }
        }
        fetchComments()
        return () => mounted = false
    }, [url, comment.userId])
    return commenter ? (
        <li className="comment-item">
            <div className='comment-left'>
                <Link to={`profile/${commenter.username}`}>
                    <img alt="commenter" src={commenter.profilePicture || 'https://firebasestorage.googleapis.com/v0/b/sprout-sociaz.appspot.com/o/main%2FnoAvatar.png?alt=media&token=2d9631c1-69bd-46ba-94fe-78e2bc2872c4'} />
                </Link>
            </div>
            <div>
                <Link to={`profile/${commenter.username}`}>
                    <div className="comment-user">
                        {commenter.username}
                    </div>
                </Link>
                <span>{comment.comment}</span>
            </div>
            <div className='comment-right text-muted'>
                {format(comment.date)}
            </div>
        </li>
    ) : (
        <MyLoader2 />
    )
}

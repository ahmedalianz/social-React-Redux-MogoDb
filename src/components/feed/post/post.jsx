import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './post.css'
import PostTop from './postparts/postTop';
import PostCenter from './postparts/postCenter';
import PostBottom from './postparts/postBottom';
import PostComments from './comments/postComments';
import CommentInput from './comments/commentInput';
import MyLoader from '../../loader';
export default function Post({ post }) {
    const url = process.env.REACT_APP_URL;
    const [postUser, setPostUser] = useState(null)

    useEffect(() => {
        let mounted = true;
        async function fetchUser() {
            let res = await axios(`${url}users/?userId=${post.userId}`)
            if (mounted) {
                setPostUser(res.data)
            }
        }
        fetchUser()
        return () => mounted = false
    }, [post.userId, url])



    return postUser ? (
        <div className="post-container">
            <div className="post-wrapper">
                <PostTop
                    postUser={postUser}
                    post={post} />
                <PostCenter post={post} />
                <PostBottom post={post} />
                <hr className="post-comments-line" />
                {post.comments.length > 0 &&
                    <PostComments post={post} />
                }
                <CommentInput post={post} />
            </div>


        </div>
    ) : (
        <MyLoader />
    )
}

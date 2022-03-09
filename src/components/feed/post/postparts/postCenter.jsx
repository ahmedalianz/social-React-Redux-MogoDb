import React, { useState, useEffect } from 'react'

export default function PostCenter({ post }) {
    const [noImage, setNoImage] = useState('')
    useEffect(() => {
        setNoImage(post.image ? "" : 'd-none')
    }, [post.image])
    return (
        <div className="post-center">
            <span className="post-text" dir='auto'>
                {post?.desc}
            </span>
            <div className={`post-center-img-container ${noImage}`}>
                <img src={post.image} alt='post' />
            </div>
        </div>
    )
}

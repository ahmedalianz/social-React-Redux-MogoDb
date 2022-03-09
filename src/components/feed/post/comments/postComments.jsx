import React from 'react'
import Comment from './comment'
import { v4 as uuid } from 'uuid'

export default function PostComments({ post }) {
    return (
        <div className="post-comments-container ">
            <ul>
                {post.comments.map(commentItem => (
                    <Comment
                        key={uuid()}
                        comment={commentItem}
                    />
                ))}
            </ul>
        </div>
    )
}

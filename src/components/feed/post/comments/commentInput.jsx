import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { setPostsInStore } from '../../../../redux/posts/posts'
import { toast } from 'react-toastify'
import axios from 'axios'

export default function CommentInput({ post }) {
    const [comment, setComment] = useState('')
    const { user } = useSelector(state => state.user)
    const url = process.env.REACT_APP_URL;
    const dispatch = useDispatch()
    const handlePostComment = async () => {
        if (comment !== '') {
            try {
                let res = await axios.put(`${url}posts/commentpost/${post._id}`, {
                    comment,
                    userId: user._id,
                    date: new Date().toJSON()
                })
                dispatch(setPostsInStore(res.data.sort((p1, p2) =>
                    new Date(p2.createdAt) - new Date(p1.createdAt)
                )))
                setComment('')
            }
            catch (err) {
                console.log(err)
            }
        } else {
            toast.error('You have write a comment first')
        }
    }

    return (
        <div className="input-group">
            <input type="text"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="form-control" placeholder="Comment here  . .  . ."
                aria-label="comment" aria-describedby="comment" />
            <button className="btn btn-outline-primary"
                type="button" id="button-addon2"
                onClick={handlePostComment}>Send</button>
        </div>
    )
}

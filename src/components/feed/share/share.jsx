import React, { useState, useEffect } from 'react'
import './share.css'
import TextareaAutosize from 'react-textarea-autosize';
import { useDispatch, useSelector } from 'react-redux'
import { addPost } from '../../../redux/posts/posts'
import { Feeling, Location, Media, Tag, Cancel, Dots } from '../../icons'
import axios from 'axios';
import soon from '../../soon'
import storage from '../../../storage'
import { uploadError, uploadProgress } from '../../upload'
import { uploadBytesResumable, ref, getDownloadURL } from "firebase/storage";
import resizeFile from '../../resizer'
export default function Share() {
    const url = process.env.REACT_APP_URL;
    const { user } = useSelector(state => state.user);
    const { posts } = useSelector(state => state.posts);
    const [desc, setDesc] = useState('')
    const [file, setFile] = useState(null)
    const [link, setLink] = useState('')
    const dispatch = useDispatch()
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (file) {
            const image = await resizeFile(file);
            const imageName = user._id + image.name;
            const storageRef = ref(storage, `images/${imageName}`);
            const uploadTask = uploadBytesResumable(storageRef, image);
            uploadTask.on('state_changed',
                (snapshot) => {
                    uploadProgress(snapshot)
                },
                (error) => {
                    uploadError(error)
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setLink(downloadURL)
                    });
                }
            );
        } else {
            try {
                let res = await axios.post(`${url}posts/addpost`, { userId: user._id, desc })
                dispatch(addPost({ posts, newPost: res.data }))
                setFile(null)
                setDesc('')
            }
            catch (err) {
                console.log(err)
            }
        }
    }
    useEffect(() => {
        if (link !== '') {
            async function upload() {
                try {
                    let res = await axios.post(`${url}posts/addpost`, { userId: user._id, image: link, desc })
                    dispatch(addPost({ posts, newPost: res.data }))
                    setFile(null)
                    setDesc('')
                    setLink('')
                }
                catch (err) {
                    console.log(err)
                }
            }
            upload()
        }
    }, [link])
    return (
        <div className="share-container">
            <div className="share-wrapper">
                <div className="share-top">
                    <img className="share-profile-img"
                        src={user.profilePicture || "https://firebasestorage.googleapis.com/v0/b/sprout-sociaz.appspot.com/o/main%2FnoAvatar.png?alt=media&token=2d9631c1-69bd-46ba-94fe-78e2bc2872c4"} alt='Profile' />
                    <TextareaAutosize required placeholder={`what's in your mind ${user.username} . .?`}
                        className='share-input'
                        value={desc}
                        onChange={(e) => { setDesc(e.target.value) }} />
                </div>
                {file && <div className="share-img-container">
                    <img className="share-img" src={URL.createObjectURL(file)} alt="" />
                    <Cancel htmlColor='white' className="share-cancel-img" onClick={() => setFile(null)} />
                </div>}
                <hr className="share-line" />
                <form className="share-bottom" onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="share-options">
                        <label htmlFor='file' className="share-option">
                            <Media htmlColor='tomato' />
                            <span className="share-option-text">
                                Photo
                            </span>
                            <input type='file' id='file'
                                accept='.png,.jpg,.jpeg'
                                onChange={(e) => setFile(e.target.files[0])}
                                className='d-none' />
                        </label>
                        <span className='share-dots' onClick={soon}><Dots /></span>
                        <div className="share-option" onClick={soon}>
                            <Tag htmlColor='blue' />
                            <span className="share-option-text">
                                Tag
                            </span>
                        </div>
                        <div className="share-option" onClick={soon}>
                            <Location htmlColor='green' />
                            <span className="share-option-text">
                                Location
                            </span>
                        </div>
                        <div className="share-option" onClick={soon}>
                            <Feeling htmlColor='rgb(167, 167, 8)' />
                            <span className="share-option-text">
                                Feeling
                            </span>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="share-button btn btn-primary">Share</button>
                </form>
            </div>
        </div>
    )
}

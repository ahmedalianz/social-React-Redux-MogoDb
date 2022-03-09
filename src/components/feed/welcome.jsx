import React from 'react'

export default function Welcome() {
    const url = process.env.REACT_APP_URL;
    return (
        <div className="post-container">
            <div className="post-wrapper">
                <div className="post-top">
                    <div className="post-top-left">
                        <img className="post-profile" src={"https://firebasestorage.googleapis.com/v0/b/sprout-sociaz.appspot.com/o/main%2Fadmin.png?alt=media&token=3f187a5b-b9a9-4e38-b110-49e99e2f3f54"} alt='admin' />
                        <span className="post-username">Admin</span>
                    </div>
                </div>
                <div className="post-center">
                    <span className="post-text">
                        Hello Everyone Please Feel free to share your first post , Welcome aboard!
                    </span>
                    <div className='post-center-img-container'>
                        <img src='https://images.unsplash.com/photo-1567284364258-30c429a24b81?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80' alt='post-admin' />
                    </div>
                </div>
            </div>
        </div>
    )
}

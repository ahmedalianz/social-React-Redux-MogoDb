import React, { useState, useEffect } from 'react'
import TopBar from '../../components/topbar/topbar'
import Feed from "../../components/feed/feed";
import RightBar from "../../components/rightbar/right";
import axios from 'axios'
import './profile.css'
import { useParams } from 'react-router-dom';
import Loader from "react-loader-spinner";
import { useSelector } from 'react-redux';
import Myprofile from './myprofile';
export default function Profile() {
    const { user } = useSelector(state => state.user)
    const [currentProfile, setCurrentProfile] = useState(null)
    const { username } = useParams()
    const url = process.env.REACT_APP_URL;
    useEffect(() => {
        async function fetchUserProfile() {
            let res = await axios(`${url}users/?username=${username}`)
            setCurrentProfile(res.data)
        }
        fetchUserProfile()
    }, [username, url])
    return currentProfile !== null ? (
        <>
            <TopBar />
            <div className="profile-container">
                <div className="profile-right">
                    <div className="profile-right-top">
                        {user.username === currentProfile.username ? (
                            <Myprofile
                                user={user}
                            />
                        ) : (
                            <div className="profile-photos">
                                <img className="profile-cover" src={currentProfile.profileCover || "https://firebasestorage.googleapis.com/v0/b/sprout-sociaz.appspot.com/o/main%2FnoCover.png?alt=media&token=d3231579-2d15-4a76-a176-f4bff698e656"} alt="cover" />
                                <img className="profile-avatar" src={currentProfile.profilePicture || "https://firebasestorage.googleapis.com/v0/b/sprout-sociaz.appspot.com/o/main%2FnoAvatar.png?alt=media&token=2d9631c1-69bd-46ba-94fe-78e2bc2872c4"} alt="avatar" />
                            </div>
                        )}
                        <div className="profile-info">
                            <h4 className="profile-info-name">{currentProfile.username}</h4>
                        </div>
                    </div>
                    <div className="profile-right-bottom">
                        <RightBar currentProfile={currentProfile} />
                        <Feed username={username} />
                    </div>
                </div>
            </div>
        </>
    ) : (
        <div className="profile-loader">
            <Loader
                type="Circles"
                color="#00BFFF"
                height={350}
                width={350}
            />
        </div>
    )
}
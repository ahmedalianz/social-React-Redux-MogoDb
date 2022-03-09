import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Loader from "react-loader-spinner";
import { blue } from '@mui/material/colors';
import { ListItem, ListItemAvatar, ListItemText, Avatar } from '@mui/material';

export default function Liker({ liker }) {
    const url = process.env.REACT_APP_URL;
    const [likerItem, setLikerItem] = useState()

    useEffect(() => {
        async function fetchUser() {
            let res = await axios(`${url}users/?userId=${liker}`)
            setLikerItem(res.data)
        }
        fetchUser()
    }, [liker, url])
    return likerItem ? (
        <Link to={`/profile/${likerItem.username}`} className="liker-name">
            <ListItem button key={liker}>
                <ListItemAvatar>
                    <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                        <img className="post-profile" src={likerItem.profilePicture || 'https://firebasestorage.googleapis.com/v0/b/sprout-sociaz.appspot.com/o/main%2FnoAvatar.png?alt=media&token=2d9631c1-69bd-46ba-94fe-78e2bc2872c4'} alt='post user' />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary={likerItem.username} />
            </ListItem>
        </Link>
    ) : (
        <Loader
            type="Oval"
            color="#00BFFF"
            height={30}
            width={30}
        />
    )
}

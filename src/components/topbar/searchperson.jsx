import React from 'react'
import { ListItem, ListItemText, Avatar, ListItemAvatar } from '@mui/material';
import { Link } from 'react-router-dom'
export default function SearchPerson({ item }) {
    return (
        <Link to={`/profile/${item.username}`} className="liker-name">
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar alt="searchedPerson" src={item.profilePicture || 'https://firebasestorage.googleapis.com/v0/b/sprout-sociaz.appspot.com/o/main%2FnoAvatar.png?alt=media&token=2d9631c1-69bd-46ba-94fe-78e2bc2872c4'} />
                </ListItemAvatar>
                <ListItemText
                    primary={item.username}
                />
            </ListItem>
        </Link>
    )
}

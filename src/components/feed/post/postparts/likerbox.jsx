import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { List, DialogTitle, Dialog, Button } from '@mui/material';
import Liker from './liker';

function SimpleDialog({ onClose, postLikers, open }) {

    const handleClose = () => {
        onClose();
    };
    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>People who Like This</DialogTitle>
            <List sx={{ pt: 0 }}>
                {postLikers.length > 0 && postLikers.map((liker) => (
                    <Liker
                        liker={liker}
                        key={liker}
                    />
                ))}
            </List>
        </Dialog>
    );
}

SimpleDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired
};

export default function PeopleWhoLike({ likeText1, likeText2, likeCount, postLikers }) {
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <div className="post-like-counter">
            <Button color='secondary' onClick={handleClickOpen}>
                {likeText1}
                {likeCount !== 0 && likeCount}
                {likeText2}
            </Button>
            <SimpleDialog
                open={open}
                onClose={handleClose}
                postLikers={postLikers}
            />
        </div>
    );
}

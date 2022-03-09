import React from 'react'
import { Link, Typography } from '@mui/material';

export default function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Visit my '}
            <Link color="inherit" target="blank" href="https://github.com/ahmedalianz?tab=repositories">
                Github
            </Link><br />
            {'CopyRights Reserved '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}
import React from 'react';
import {AppBar, Typography, makeStyles, } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    title:{
        flexGrow: 1,
        alignSelf: 'flex-end',
    },
}));

const TopBarComponent = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Typography variant="h6" className={classes.title}>
                    Blog Posts
              </Typography>
            </AppBar>
        </div >
    );
}

export default TopBarComponent;
import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core';
import classes from '*.module.css';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            margin: theme.spacing(2),
            marginLeft: theme.spacing(11)
        }
    })
);

export default function(){

    const classes: any = useStyles();

    return(<div className={classes.root}>DETAIL PAGE</div>);
}
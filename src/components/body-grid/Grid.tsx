import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core';
import GridElement from './GridElement';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            margin: theme.spacing(2),
            marginLeft: theme.spacing(11)
        }
    })
);

export default function () {

    const classes: any = useStyles();

    const elements = [
        <GridElement name="A" />,
        <GridElement name="B" />,
        <GridElement name="C" />,
        <GridElement name="D" />,
        <GridElement namEe="E"  />
    ]

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                {elements}
            </Grid>
        </div>
    );
}
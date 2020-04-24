import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import { Paper, Grid, ButtonBase, Typography } from '@material-ui/core';
import { Thing } from '../../services/apollo/types';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            margin: theme.spacing(2),
            marginLeft: theme.spacing(11)
        },
        paper: {
            padding: theme.spacing(2),
            margin: 'auto',
            maxWidth: 400,
        },
        image: {
            width: 128,
            height: 128,
            backgroundColor: '#EEEEEE'
        },
        gridElementText1: {
            width: 200,
            height: 40,
            maxHeight:40,
            
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            webkitlineclamp: 3,
            webkitboxorient: 'vertical',
        },

    })
);

export default function (thing:Thing) {

    const classes: any = useStyles();

    return (
        <Grid item key={thing.id}>
            <Paper className={classes.paper}>
                <Grid container spacing={2}>
                    <Grid item>
                        <Link to={`/detail/${thing.id}`}>
                            <ButtonBase className={classes.image}>
                                <img src={thing.thumbnail} alt={thing.name} className={classes.image}/>
                            </ButtonBase>
                        </Link>
                    </Grid>
                    <Grid item>
                        <Grid item>
                            <Typography variant="body2" className={classes.gridElementText1}>
                                {thing.name}
                            </Typography>
                            <Typography variant="body2" className={classes.gridElementText1}>
                                By: <a href={thing.creator.public_url}>{thing.creator.name}</a>
                            </Typography>
                            <Typography variant="body2" className={classes.gridElementText1}>
                                <a href={thing.public_url} >See it in Thingiverse</a>
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    );
}

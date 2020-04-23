import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import { Paper, Grid, ButtonBase, Typography } from '@material-ui/core';

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
            height: 20
        },

    })
);

export default function (props:any) {

    const classes: any = useStyles();

    return (
        <Grid item>
            <Paper className={classes.paper}>
                <Grid container spacing={2}>
                    <Grid item>
                        <ButtonBase className={classes.image}>
                            IMG
                        </ButtonBase>
                    </Grid>
                    <Grid item>
                        <Grid item>
                            <Typography variant="body2" className={classes.gridElementText1}>
                                DESC 1 {props.name}
                            </Typography>
                            <Typography variant="body2" className={classes.gridElementText1}>
                                DESC 2
                            </Typography>
                            <Typography variant="body2" className={classes.gridElementText1}>
                                DESC 3
                            </Typography>
                            <Typography variant="body2" className={classes.gridElementText1}>
                                DESC 4
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    );
}

import React from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button'

const useStyles = makeStyles((theme:Theme)=>
    createStyles({
        root: {
            flexGrow: 1
        },
        menuButton: {
            marginLeft: theme.spacing(6),
            marginRight: theme.spacing(2)
        },
        title: {
            flexGrow: 1
        }
    })
);

export default function(){

    //is there a way to assign a correct type for 'classes'?
    const classes:any = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position='static'>
                <Toolbar>
                    <IconButton 
                        edge='start'
                        aria-label='menu'
                        color='inherit'
                        className={classes.menuButton}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Thingiverse App
                    </Typography>
                    <Button color="inherit">
                        Connect
                    </Button>
                </Toolbar>
            </AppBar>
        </div>
    );
}
import React, { Dispatch, SetStateAction } from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button'
import { Link, Route, withRouter, RouteComponentProps } from 'react-router-dom';
import Authenticator from '../../services/authentication/Authenticator';

const authUrl = "https://www.thingiverse.com/login/oauth/authorize";
const redirectCodeUrl = "http://localhost:3000/list";
const clientId = "b2de5a3ecb494ab9040b";

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
        },
        link: {
            color: 'white',
            textDecoration: 'none',
            '&:hover': {
                textDecoration: 'underline',
                textDecorationColor: '#243282'
            }
        }
        
        
    })
);

interface headerProps extends RouteComponentProps{
    userId?: number,
    setUserId: Dispatch<SetStateAction<number|undefined>>
}

export default withRouter(function (props: headerProps){

    //is there a way to assign a correct type for 'classes'?
    const classes:any = useStyles();
    const params = new URLSearchParams(props.location.search);
    const code:string|null = params.get('code');
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
                        <Link to="/list" className={classes.link}>
                            Thingiverse App
                        </Link>
                    </Typography>
                    <Typography variant='caption'>
                        <Authenticator code={code} userId={props.userId} setUserId={props.setUserId}/>
                    </Typography>
                    <Button color="inherit">
                        <a 
                            href={`${authUrl}?client_id=${clientId}&redirect_uri=${redirectCodeUrl}&response_type=code`}
                            className={classes.link}
                        >
                            Connect
                        </a>
                    </Button>
                </Toolbar>
            </AppBar>
        </div>
    );
});
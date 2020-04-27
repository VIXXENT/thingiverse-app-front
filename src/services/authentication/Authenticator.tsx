import React, { useEffect, Dispatch, SetStateAction } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import * as H from 'history';
const URL_AUTH_CODE = 'http://localhost:8080/thingiverse/authCode';
const URL_VAL_TOKEN = 'http://localhost:8080/thingiverse/validate-token';

interface authenticatorProps extends RouteComponentProps{
    code?: string | null,
    userId?: number,
    setUserId: Dispatch<SetStateAction<number|undefined>>
}

export default withRouter(function (props: authenticatorProps): JSX.Element {
    useEffect(() => {
        async function fetchAuthInfo() {
            await getAuthInfo(props);
        }
        fetchAuthInfo()
    }, [props])

    return <div>{props?.userId&& `Connected: ${props.userId}`}</div>
});

async function getAuthInfo(props: authenticatorProps){
    await getCurrentUserId(props.setUserId);

    if(!props.userId && props.code){
        await authenticate(props);
        await getCurrentUserId(props.setUserId);
    }
    return props.userId;
}

async function authenticate(props: authenticatorProps){
    await fetch(`${URL_AUTH_CODE}?code=${props.code}`);
    removeUrlQueryString(props.history);
}

function removeUrlQueryString(history:H.History<H.LocationState>){
    history.push(history.location.pathname);
}

async function getCurrentUserId(setUserId: Dispatch<SetStateAction<number|undefined>>){
    const res = await fetch(URL_VAL_TOKEN);
    const json = await res.json();
    if(json?.user_id){
        setUserId(json.user_id);
    }
}

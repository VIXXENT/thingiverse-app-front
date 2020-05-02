import React, { Dispatch, SetStateAction } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import * as H from 'history';
import { timeString } from '../../components/util/utils';
const URL_AUTH_CODE = 'http://localhost:8080/thingiverse/authCode';
const URL_VAL_TOKEN = 'http://localhost:8080/thingiverse/validate-token';

function removeUrlQueryString(history: H.History<H.LocationState>): void{
    history.push(history.location.pathname);
}

async function authenticate(props: AuthenticatorProps): Promise<void>{
    console.log(`${timeString()} AUTHENTICATOR - AUTHENTICATE: ${URL_AUTH_CODE}?code=${props.code}`);
    await fetch(`${URL_AUTH_CODE}?code=${props.code}`);
    removeUrlQueryString(props.history);
}

async function getCurrentUserId(setUserId: Dispatch<SetStateAction<number|undefined>>): Promise<void>{
    const res = await fetch(URL_VAL_TOKEN);
    const json = await res.json();
    if(json?.user_id){
        console.log(`${timeString()} AUTHENTICATOR - SET_USER_ID - userId: `, json.user_id);
        setUserId(json.user_id);
    }
}

async function getAuthInfo(props: AuthenticatorProps): Promise<number|undefined>{
    console.log(`${timeString()} AUTHENTICATOR - GET_AUTH_INFO - props: `, props);
    await getCurrentUserId(props.setUserId);

    if(!props.userId && props.code){
        await authenticate(props);
        await getCurrentUserId(props.setUserId);
    }
    return props.userId;
}

interface AuthenticatorProps extends RouteComponentProps{
    code?: string | null;
    userId?: number;
    setUserId: Dispatch<SetStateAction<number|undefined>>;
}

export default withRouter(function (props: AuthenticatorProps): JSX.Element {
    async function fetchAuthInfo(): Promise<void> {
        await getAuthInfo(props);
    }
    fetchAuthInfo()

    return <div>{props?.userId&& `Connected: ${props.userId}`}</div>
});

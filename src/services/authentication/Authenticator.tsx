import React, { useState, useEffect, Dispatch, SetStateAction } from 'react';

interface authenticatorProps{
    code?: string | null,
    userId?: number,
    setUserId: Dispatch<SetStateAction<number|undefined>>
}

export default function (props: authenticatorProps): JSX.Element {
    useEffect(() => {
        async function fetchAuthInfo() {
            await getAuthInfo(props.setUserId, props.code);
        }
        fetchAuthInfo()
    }, [props.code])

    let con;
    if (props.userId) {
        con = `connected: ${props.userId}`
    } else {
        con = `NOT CONNECTED`
    }

    return <div>{con}</div>
}

function getAuthInfo(setUserId: Function, code?: string | null): Promise<Number> {
    console.log(`in getAuthInfo - called with code: ${code}`);
    if(code){
        return fetch(`http://localhost:8080/thingiverse/authCode?code=${code}`)
        .then((res) => fetch(`http://localhost:8080/thingiverse/validate-token`))
        .then((res: Response) => res.json())
        .then((json: { user_id: Number }) => {
            console.log(`in THEN - calling setAuthInfo with ${JSON.stringify(json)}`);
            return setUserId(json.user_id)
        });
    }else{
        return new Promise(()=>null);
    }

}

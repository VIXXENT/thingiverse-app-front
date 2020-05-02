import React, { useState, useRef } from 'react'
import { DocumentNode } from 'apollo-boost';
import { Thing, Cursor, ThingsCursoredList } from '../../services/apollo/types';
import { Grid } from '@material-ui/core';
import { QueryResult } from 'react-apollo';
import GridThingElement from './GridThingElement';
import useScrollPosition, {PositionChange} from '../util/useScrollPosition';
import { timeString } from '../util/utils';

export interface GridLoaderProps{
    query: DocumentNode,
    userId: number|undefined
    firstQueryResult: QueryResult<thingsQueryData, Record<string, Cursor>>,
}

export interface thingsQueryData{
    thingsCursoredList: ThingsCursoredList
}

const isBottom = (positionChange: PositionChange):boolean=>{
    const currentWindowInnerHeight = window.innerHeight;
    const distanceScrolledDown = (-positionChange.currentPosition.y);
    const totalHeight = document.body.scrollHeight;
    const isBottom = currentWindowInnerHeight + distanceScrolledDown === totalHeight

    return isBottom;
}

export default function(props:GridLoaderProps){
    console.log(`${timeString()} GRID_LOADER - START! - loaded[${props.firstQueryResult.data?.thingsCursoredList.things.length}] - `, props);

    if(!props.userId){
        return (<p>NO USER ID</p>);
    }

    const loadedData = props.firstQueryResult.data;
    const loadedThings:Thing[]|undefined = loadedData?.thingsCursoredList?.things;
    const [cursor, setCursor] = useState<Cursor>({page:1, per_page:50, sort:'popular'});

    const scrollHandler = (positionChange: PositionChange) => {
        if(isBottom(positionChange)){
            console.log(`${timeString()} Bottom reached!`);
            nextPage(cursor, setCursor);
            loadMore(props.firstQueryResult.fetchMore, props.query, cursor);
        }
    }

    useScrollPosition(
        scrollHandler,
        [],
        useRef(document.body),
        false,
        200
    );

    let jsxResult;

    if(props.firstQueryResult.loading){
        jsxResult = <p>LOADING...</p>
    }else if(props.firstQueryResult.error){
        if(props.firstQueryResult.error.message.indexOf('No access_token')>=0){
            jsxResult = <p>NO ACCESS TOKEN</p>
        }else{
            jsxResult = <pre>ERROR: {JSON.stringify(props.firstQueryResult.error, null, '  ')}</pre>
        }
    }
    else if (!loadedData?.thingsCursoredList?.things){
        console.log("GRID_LOADER - NO RESULTS - props: ", props);
        jsxResult = <p>NO RESULTS FOUND</p>
    }else{
        jsxResult = (
        <Grid container spacing={3}>
            {loadedThings?.map((thing: Thing) => (<GridThingElement key={thing.id} {...thing}/>))}
        </Grid>
        )
    }
    
    return jsxResult;
}

const nextPage = (cursor:Cursor, setCursor: React.Dispatch<React.SetStateAction<Cursor>>)=>{
    console.log(`${timeString()} GRID_LOADER - NEXT_PAGE - INCREMENT PAGE (${JSON.stringify(cursor)})`);
    cursor.page++;
    console.log(`${timeString()} GRID_LOADER - NEXT_PAGE - DONE (${JSON.stringify(cursor)})`);
    setCursor(cursor);
}

const loadMore = (fetchMore:Function, query:DocumentNode, cursor:Cursor) => {
    console.log(`${timeString()} GRID_LOADER - LOAD_MORE - START! `);
    return fetchMore({
        query,
        variables: { cursor },
        updateQuery: (previousResult:thingsQueryData, { fetchMoreResult }:{fetchMoreResult:thingsQueryData}) => {
            console.log(`${timeString()} GRID_LOADER - LOAD_MORE - UPDATE_QUERY - START! `);
            const existingResults = previousResult.thingsCursoredList;
            const newResults = fetchMoreResult.thingsCursoredList;
            const result:thingsQueryData = {
                thingsCursoredList : {
                    hasMore: newResults.things.length>0,
                    cursor: fetchMoreResult.thingsCursoredList.cursor,
                    things: [...existingResults.things, ...newResults.things],
                    __typename: existingResults.__typename
                }
            };
            return result;
        }
    })
}
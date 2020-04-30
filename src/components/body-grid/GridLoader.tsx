import React, { useState } from 'react'
import { DocumentNode } from 'apollo-boost';
import { Thing, Cursor, ThingsCursoredList } from '../../services/apollo/types';
import { Button, Grid } from '@material-ui/core';
import { QueryResult } from 'react-apollo';
import GridThingElement from './GridThingElement';

export interface GridLoaderProps{
    query: DocumentNode,
    firstQueryResult: QueryResult<thingsQueryData, Record<string, Thing>>,
}

export interface thingsQueryData{
    thingsCursoredList: ThingsCursoredList
}

export default function(props:GridLoaderProps){
    console.log("GRID_LOADER - props      ", props);
    const loadedData = props.firstQueryResult.data;
    const loadedThings:Thing[]|undefined = loadedData?.thingsCursoredList?.things;
    const [cursor, setCursor] = useState<Cursor>({page:1, per_page:10});
    const clickHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
        nextPage(cursor, setCursor);
        loadMore(props.firstQueryResult.fetchMore, props.query, cursor);
    }

    let jsxResult;

    if(props.firstQueryResult.loading){
        jsxResult = <p>LOADING...</p>
    } else if (!loadedData?.thingsCursoredList?.things){
        jsxResult = <p>NO RESULTS FOUND</p>
    }else{
        jsxResult = (
        <Grid container spacing={3}>
            {loadedThings?.map((thing: Thing) => (<GridThingElement key={thing.id} {...thing}/>))}
        </Grid>
        )
    }
    
    return(
        <div>
            {jsxResult}
            <Button onClick={clickHandler}>(+)</Button>
        </div>
    );
}

const nextPage = (cursor:Cursor, setCursor: React.Dispatch<React.SetStateAction<Cursor>>)=>{
    cursor.page++;
    setCursor(cursor);
}

const loadMore = (fetchMore:Function, query:DocumentNode, cursor:Cursor) => {
    return fetchMore({
        query,
        variables: { cursor },
        updateQuery: (previousResult:thingsQueryData, { fetchMoreResult }:{fetchMoreResult:thingsQueryData}) => {
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
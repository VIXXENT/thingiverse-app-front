import React, { SetStateAction, Dispatch, useState, ChangeEvent, useEffect } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import { useQuery, QueryHookOptions } from 'react-apollo';
import { gql } from 'apollo-boost';
import GridLoader, { ThingsQueryData } from './GridLoader';
import { Cursor } from '../../services/apollo/types';
import { Select, MenuItem } from '@material-ui/core';
import { timeString } from '../util/utils';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            margin: theme.spacing(2),
            marginLeft: theme.spacing(11)
        }
    })
);

export const THINGS_QUERY = gql`
    query thingsCursoredList($cursor: CursorInput) {
        thingsCursoredList(cursor: $cursor){
            cursor{
                page
                per_page
            }
            hasMore
            things{
                id
                name
                thumbnail
                public_url
                creator{
                    name
                    public_url
                }
            }
        }
    }
`;

interface GridProps {
    userId?: number;
    setUserId: Dispatch<SetStateAction<number | undefined>>;
}

export default function (props: GridProps): JSX.Element {
    console.log(`${timeString()} GRID - START! - props: `, props);
    const classes = useStyles();
    const sorts = ['relevant', 'text', 'popular', 'makes', 'newest'];
    const [sort, setSort] = useState('popular');

    const queryOptions: QueryHookOptions<ThingsQueryData, Record<string, Cursor>> = {
        variables: {
            // eslint-disable-next-line @typescript-eslint/camelcase
            cursor:{page: 1, per_page: 50, sort}
        }
    };
    
    const selectSortHandler: (event: ChangeEvent<{ name?: string | undefined; value: unknown }>) => void = (event)=>{
        console.log(`sort change: `, event);
        const value = event.target.value;
        if(typeof value === 'string'){
            setSort(value);
        }
    }

    return (
        <div className = {classes.root}>
            <Select
                labelId="sort"
                id="sort_picker"
                value={sort}
                onChange={selectSortHandler}
                type="string"
            >
                {sorts.map((sortValue)=><MenuItem key={sortValue} value={sortValue}>{sortValue}</MenuItem>)}
            </Select>
            <GridLoader
                userId={props.userId}
                query={THINGS_QUERY}
                firstQueryResult={useQuery(THINGS_QUERY, queryOptions)}
            />
        </div>
    );
}
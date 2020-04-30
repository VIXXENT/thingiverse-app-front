import React, { SetStateAction, Dispatch } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import { useQuery } from 'react-apollo';
import { gql } from 'apollo-boost';
import GridLoader from './GridLoader';

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
        thingsCursoredList(sort:"popular", cursor: $cursor){
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

interface gridProps {
    userId?: number,
    setUserId: Dispatch<SetStateAction<number | undefined>>
}

export default function (props: gridProps) {
    const classes: any = useStyles();
    return (
        <div className = {classes.root}>
            <GridLoader query={THINGS_QUERY} firstQueryResult={useQuery(THINGS_QUERY)}/>
        </div>
    );
}
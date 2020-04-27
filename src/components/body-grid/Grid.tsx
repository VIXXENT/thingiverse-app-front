import React, { SetStateAction, Dispatch } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core';
import { Query, QueryResult } from 'react-apollo';
import { gql } from 'apollo-boost';
import { Thing } from '../../services/apollo/types';
import GridThingElement from './GridThingElement';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            margin: theme.spacing(2),
            marginLeft: theme.spacing(11)
        }
    })
);

interface gridProps{
    userId?: number,
    setUserId: Dispatch<SetStateAction<number|undefined>>
}

export default function (props:gridProps) {
    const classes: any = useStyles();
    return (
        <div className={classes.root}>
            {props.userId?(<ThingsQuery {...classes} />):('NOT CONNECTED')}
        </div>
    );
}

const ThingsQuery = (classes:any) => {
    return (
        <Query
            query={
                gql`{
                    things(sort:"popular"){
                        id
                        name
                        thumbnail
                        public_url
                        creator{
                            name
                            public_url
                        }
                    }
                }`
            }
        >
            {({ loading, error, data }: QueryResult<any, Record<string, any>>): JSX.Element => {
                if (loading) {
                    return <p>Loading...</p>
                } else if (error || !data) {
                    return <p>{JSON.stringify(error)}</p>
                }
                else if (data) {
                    return (
                        <div className={classes.root}>
                            <Grid container spacing={3}>
                                {data.things.map((thing: Thing) => (<GridThingElement key={thing.id} {...thing}/>))}
                            </Grid>
                        </div>
                    );
                }
                else {
                    return <p>?</p>;
                }
            }}
        </Query>
    );
}
import React, { Dispatch, SetStateAction } from 'react';
import { makeStyles, Theme, createStyles, Typography as pre, Paper, Typography, Grid } from '@material-ui/core';
import { gql } from 'apollo-boost';
import { Thing, Image } from '../../services/apollo/types';
import { useParams } from 'react-router-dom';
import { Query, QueryResult } from 'react-apollo';
import FavoriteIcon from '@material-ui/icons/Favorite';
import EyeIcon from '@material-ui/icons/Visibility';
import RemixIcon from '@material-ui/icons/Autorenew';
import EditIcon from '@material-ui/icons/Edit';
import LayoutIcon from '@material-ui/icons/ViewCompact';
import FileIcon from '@material-ui/icons/InsertDriveFileOutlined';
import DownloadIcon from '@material-ui/icons/GetApp';
import CommentIcon from '@material-ui/icons/ChatBubbleOutlineOutlined';
import CollectIcon from '@material-ui/icons/LibraryAddOutlined';


import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import Parser from 'html-react-parser';
import _ from 'lodash';
import { timeString } from '../util/utils';

//FIXME: http://localhost:3000/detail/2064269 error - message: Expected Iterable, but did not find one for field "Education.grades".


const useStyles = makeStyles((theme: Theme) =>{
    return createStyles({
        root: {
            margin: theme.spacing(2),
            marginLeft: theme.spacing(10)
        },
        paper: {
            margin: theme.spacing(1),
            padding: theme.spacing(1)
        },
        thingName:{
            width: theme.spacing(160)
        },
        galleryWrapper: {
            width: theme.spacing(80),
            height: theme.spacing(75),
            overflow: 'hidden'
        },
        descriptionWrapper: {
            maxWidth: theme.spacing(80),
            height: theme.spacing(75),
            overflow: 'auto'
        },
        counter: {
            width: theme.spacing(20),
            height: theme.spacing(10),
            display: 'flex',
        },
        counterContent:{
            margin: 'auto'
        },
        '@global': {
            '.image-gallery-slide img': {
                width: '100%',
                height: theme.spacing(60),
                objectFit: 'cover',
                overflow: 'hidden',
                objectPosition: 'center center',
            },
            '.image-gallery-content .image-gallery-slide .image-gallery-image': {
                maxHeight: "100%"
            },
            '.image-gallery':{
                width: '100%',
                height: 'auto',
            },
            
            '.fullscreen .image-gallery-slide img':{
                maxHeight: '100vh',
            }
        }
    })
});

interface thingDetailProps{
    userId?: number,
    setUserId: Dispatch<SetStateAction<number|undefined>>
}

export default function(props:thingDetailProps){
    console.log(`${timeString()} THING_DETAIL - START! - props: `, props);
    if(!props.userId){
        return(<div>NOT CONNECTED</div>);
    }
    
    const classes: any = useStyles();
    const params:any = useParams();
    return( 
        <div className={classes.root}>
            <Query query={createThingsDetailQuery(params.thingId)}>
                {({ loading, error, data }: QueryResult<any, Record<string, any>>): JSX.Element => {
                    if (loading) {
                        return <p>Loading...</p>
                    } else if (error || !data) {
                        return <p>{JSON.stringify(error)}</p>
                    }
                    else if (data) {
                        const thing:Thing = data.thing;
                        return (
                            <div>
                                <Paper className={classes.paper}>
                                    <Grid container spacing={1} alignItems="center" justify="center">
                                        <Grid item>
                                            <Typography variant='h5' className={classes.thingName}>
                                                {thing.name} by {thing.creator.name}
                                            </Typography>
                                        </Grid>
                                        <Grid container spacing={1} alignItems="center" justify="center">
                                            <Grid item>
                                                <Paper className={`${classes.paper} ${classes.galleryWrapper}`}>
                                                    <ImageGallery 
                                                        items={convertImagesToGalleryFormat(thing.images)} 
                                                        lazyLoad={true}
                                                        slideDuration={100}
                                                    />
                                                </Paper>
                                            </Grid>
                                            <Grid item>
                                                <Paper className={`${classes.paper} ${classes.descriptionWrapper}`}>
                                                    {Parser(thing.details)}
                                                </Paper>
                                            </Grid>
                                        </Grid>
                                        <Grid container spacing={1} alignItems="center" justify="center">
                                            <Grid item>
                                                <Paper className={classes.counter} >
                                                    <Typography variant="caption" className={classes.counterContent}>
                                                        <FavoriteIcon /> {thing.like_count}
                                                    </Typography>
                                                </Paper>
                                            </Grid>
                                            <Grid item>
                                                <Paper className={classes.counter} >
                                                    <Typography variant="caption" className={classes.counterContent}>
                                                        <CollectIcon /> {thing.collect_count}
                                                    </Typography>
                                                </Paper>
                                            </Grid>
                                            <Grid item>
                                                <Paper className={classes.counter} >
                                                    <Typography variant="caption" className={classes.counterContent}>
                                                        <CommentIcon /> {thing.comment_count}
                                                    </Typography>
                                                </Paper>
                                            </Grid>
                                            <Grid item>
                                                <Paper className={classes.counter} >
                                                    <Typography variant="caption" className={classes.counterContent}>
                                                        <DownloadIcon /> {thing.download_count}
                                                    </Typography>
                                                </Paper>
                                            </Grid>
                                            <Grid item>
                                                <Paper className={classes.counter} >
                                                    <Typography variant="caption" className={classes.counterContent}>
                                                        <FileIcon /> {thing.file_count}
                                                    </Typography>
                                                </Paper>
                                            </Grid>
                                            <Grid item>
                                                <Paper className={classes.counter} >
                                                    <Typography variant="caption" className={classes.counterContent}>
                                                        <LayoutIcon /> {thing.layout_count}
                                                    </Typography>
                                                </Paper>
                                            </Grid>
                                            <Grid item>
                                                <Paper className={classes.counter} >
                                                    <Typography variant="caption" className={classes.counterContent}>
                                                        <EditIcon /> {thing.make_count}
                                                    </Typography>
                                                </Paper>
                                            </Grid>
                                            <Grid item>
                                                <Paper className={classes.counter} >
                                                    <Typography variant="caption" className={classes.counterContent}>
                                                        <RemixIcon /> {thing.remix_count}
                                                    </Typography>
                                                </Paper>
                                            </Grid>
                                            <Grid item>
                                                <Paper className={classes.counter} >
                                                    <Typography variant="caption" className={classes.counterContent}>
                                                        <EyeIcon /> {thing.view_count}
                                                    </Typography>
                                                </Paper>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Paper className={classes.paper}>
                                        <a href={thing.public_url}>See it in Thingiverse!</a>
                                    </Paper>
                                </Paper>
                                
                                <Paper className={classes.paper}>
                                    <pre>
                                        {JSON.stringify(data, null, '\t')}
                                    </pre>
                                </Paper>
                            </div>
                        );
                    }
                    else {
                        return <p>?</p>;
                    }
                }}
            </Query>
        </div>
    );
}

function convertImagesToGalleryFormat(images:[Image]){
    let galleryImages = images.map((image:Image)=>{
        const thumbnailImage = _.find(image.sizes, {"type": "thumb","size": "large",});
        const displayImage = _.find(image.sizes, {"type": "display","size": "large",});
        return {original:displayImage?.url, thumbnail:thumbnailImage?.url};
    });

    return galleryImages;
}

function createThingsDetailQuery(thingId:string){
    return gql`{thing(id:${thingId}){
        id
            name
            thumbnail
            public_url
            creator{
                id
                name
                first_name
                last_name
                public_url
                thumbnail
            }
            added
            modified
            is_published
            is_wip
            is_featured
            is_nsfw
            like_count
            is_liked
            collect_count
            is_collected
            comment_count
            is_watched
            default_image{
                id
                url
                name
                sizes{
                    type
                    size
                    url
                }
                added
            }
            images{
                id
                url
                name
                sizes{
                    type
                    size
                    url
                }
                added
            }
            description
            instructions
            description_html
            instructions_html
            details
            details_parts{
                type
                name
                required
                data{
                    content
                }
            }
            edu_details
            edu_details_parts{
                type
                name
                required
                label
                save_as_component
                template
                fieldname
                default
            }
            license
            files_url
            images_url
            likes_url
            ancestors_url
            derivatives_url
            tags_url
            categories_url
            file_count
            layout_count
            layouts_url
            is_private
            is_purchased
            in_library
            print_history_count
            app_id
            download_count
            view_count
            education{
                grades
                subjects
            }
            remix_count
            make_count
            app_count
    }}`;
}
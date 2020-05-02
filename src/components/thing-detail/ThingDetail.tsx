import React, { Dispatch, SetStateAction } from 'react';
import { makeStyles, Theme, createStyles, Paper, Typography, Grid, Tooltip } from '@material-ui/core';
import { gql, DocumentNode } from 'apollo-boost';
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
        thingTitle: {
            maxWidth: theme.spacing(160)
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
        countersAndFilesContainer:{
            maxWidth: theme.spacing(162),
            //backgroundColor: "#FFAAAA",
        },
        filesGrid:{
            maxWidth: theme.spacing(80),
            minWidth: theme.spacing(70),
            marginTop: theme.spacing(2),
            marginBottom: theme.spacing(2),
            //backgroundColor: "#AAFFAA",
        },
        countersGrid:{
            maxWidth: theme.spacing(80),
            minWidth: theme.spacing(70),
            marginTop: theme.spacing(2),
            marginBottom: theme.spacing(2),
            //backgroundColor: "#AAAAFF",
        },
        linksGrid:{
            maxWidth: theme.spacing(160),
            marginTop: theme.spacing(2),
            marginBottom: theme.spacing(2),
            //backgroundColor: "#DDAADD",
        },
        fileCard:{
            overflow: 'hidden',
            width: theme.spacing(10),
            height: theme.spacing(10),
            display: 'flex',
            position: 'relative',
            '&:hover': {
                '& svg': {
                    color: '#2222AA',
                    opacity: 1,
                },
                '& img': {
                    transform: 'scale(1.3) rotate(5deg)',
                    bottom: 'center',
                    right: 'center',
                }
            }
        },
        fileDownloadIcon:{
            position: 'absolute',
            color: '#4444DD',
            bottom: 0,
            right: 0,
            opacity: 0.2,
            transition: '0.5s',
        },
        fileThumbnail: {
            width: theme.spacing(10),
            height: theme.spacing(10),
            transition: '0.5s',
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

interface ThingDetailProps{
    userId?: number;
    setUserId: Dispatch<SetStateAction<number|undefined>>;
}

function convertImagesToGalleryFormat(images: [Image]): { original: string | undefined; thumbnail: string | undefined}[] {
    const galleryImages = images.map((image: Image)=>{
        const thumbnailImage = _.find(image.sizes, {"type": "thumb","size": "large",});
        const displayImage = _.find(image.sizes, {"type": "display","size": "large",});
        return {original:displayImage?.url, thumbnail:thumbnailImage?.url};
    });

    return galleryImages;
}

function createThingsDetailQuery(thingId: string): DocumentNode{
    return gql`{thing(id:${thingId}){
        id
            name
            public_url
            details
            creator{
                name
                public_url
            }
            images{
                sizes{
                    type
                    size
                    url
                }
                added
            }
            files{
                id
                name
                size
                public_url
                thumbnail
                formatted_size
            }
            like_count
            collect_count
            comment_count
            file_count
            layout_count
            download_count
            view_count
            remix_count
            make_count
            app_count
    }}`;
}

export default function(props: ThingDetailProps): JSX.Element{
    console.log(`${timeString()} THING_DETAIL - START! - props: `, props);
    if(!props.userId){
        return(<div>NOT CONNECTED</div>);
    }
    
    const classes = useStyles();
    const params = useParams<{thingId: string}>();
    return( 
        <div className={classes.root}>
            <Query query={createThingsDetailQuery(params.thingId)}>
                {({ loading, error, data }: QueryResult<{thing: Thing}, Record<string, {thing: Thing}>>): JSX.Element => {
                    if (loading) {
                        return <p>Loading...</p>
                    } else if (error || !data) {
                        return <p>{JSON.stringify(error)}</p>
                    }
                    else if (data) {
                        const thing: Thing = data.thing;
                        return (
                            <div>
                                <Paper className={classes.paper}>
                                    <Grid container spacing={1} alignItems="center" justify="center" >
                                        <Grid item className={classes.thingTitle} xs={12}>
                                            <Typography variant='h5'>
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
                                        <Grid container spacing={2} alignItems="stretch" justify="space-evenly" className={classes.countersAndFilesContainer} >
                                            <Grid container spacing={1} alignItems="stretch" justify="flex-start" className={classes.countersGrid} xs={5}>
                                                <Grid item>
                                                    <Tooltip title="Likes" arrow>
                                                        <Paper className={classes.counter} >
                                                            <Typography variant="caption" className={classes.counterContent}>
                                                                <FavoriteIcon /> {thing.like_count}
                                                            </Typography>
                                                        </Paper>
                                                    </Tooltip>
                                                </Grid>
                                                <Grid item>
                                                    <Tooltip title="Collects" arrow>
                                                        <Paper className={classes.counter} >
                                                            <Typography variant="caption" className={classes.counterContent}>
                                                                <CollectIcon /> {thing.collect_count}
                                                            </Typography>
                                                        </Paper>
                                                    </Tooltip>
                                                </Grid>
                                                <Grid item>
                                                    <Tooltip title="Comments" arrow>
                                                        <Paper className={classes.counter} >
                                                            <Typography variant="caption" className={classes.counterContent}>
                                                                <CommentIcon /> {thing.comment_count}
                                                            </Typography>
                                                        </Paper>
                                                    </Tooltip>
                                                </Grid>
                                                <Grid item>
                                                    <Tooltip title="Times downloaded" arrow>
                                                        <Paper className={classes.counter} >
                                                            <Typography variant="caption" className={classes.counterContent}>
                                                                <DownloadIcon /> {thing.download_count}
                                                            </Typography>
                                                        </Paper>
                                                    </Tooltip>
                                                </Grid>
                                                <Grid item>
                                                    <Tooltip title="Files" arrow>
                                                        <Paper className={classes.counter} >
                                                            <Typography variant="caption" className={classes.counterContent}>
                                                                <FileIcon /> {thing.file_count}
                                                            </Typography>
                                                        </Paper>
                                                    </Tooltip>
                                                </Grid>
                                                <Grid item>
                                                    <Tooltip title="Layouts" arrow>
                                                        <Paper className={classes.counter} >
                                                            <Typography variant="caption" className={classes.counterContent}>
                                                                <LayoutIcon /> {thing.layout_count}
                                                            </Typography>
                                                        </Paper>
                                                    </Tooltip>
                                                </Grid>
                                                <Grid item>
                                                    <Tooltip title="Makes" arrow>
                                                        <Paper className={classes.counter} >
                                                            <Typography variant="caption" className={classes.counterContent}>
                                                                <EditIcon /> {thing.make_count}
                                                            </Typography>
                                                        </Paper>
                                                    </Tooltip>
                                                </Grid>
                                                <Grid item>
                                                    <Tooltip title="Remixes" arrow>
                                                        <Paper className={classes.counter} >
                                                            <Typography variant="caption" className={classes.counterContent}>
                                                                <RemixIcon /> {thing.remix_count}
                                                            </Typography>
                                                        </Paper>
                                                    </Tooltip>
                                                </Grid>
                                                <Grid item>
                                                    <Tooltip title="Views" arrow>
                                                        <Paper className={classes.counter} >
                                                            <Typography variant="caption" className={classes.counterContent}>
                                                                <EyeIcon /> {thing.view_count}
                                                            </Typography>
                                                        </Paper>
                                                    </Tooltip>
                                                </Grid>
                                            </Grid>
                                            <Grid container spacing={1} alignItems="center" justify="flex-end" className={classes.filesGrid} xs={5}>
                                                {thing.files.map(file=>(
                                                    <Grid item key={file.id}>
                                                        <a href={file.public_url} rel="noopener noreferrer" download>
                                                            <Tooltip key={file.id} title={`${file.name} - ${file.formatted_size}`} arrow>
                                                                <Paper className={classes.fileCard}>
                                                                    <Typography className={classes.counterContent}>
                                                                        <img src={file.thumbnail} className={classes.fileThumbnail} alt={`download file: ${file.name}`}/>
                                                                        <DownloadIcon className={classes.fileDownloadIcon}/>
                                                                    </Typography>
                                                                </Paper>
                                                            </Tooltip>
                                                        </a>
                                                    </Grid>
                                                ))}
                                            </Grid>
                                        </Grid>
                                        
                                        <Grid container spacing={1} alignItems="flex-start" justify="flex-start" className={classes.linksGrid} xs={12}>
                                            <Grid item>
                                                <Tooltip title="Go see this Thing in Thingiverse site" arrow>
                                                    <Paper className={classes.paper}>
                                                        <a href={thing.public_url}>See it in Thingiverse!</a>
                                                    </Paper>
                                                </Tooltip>
                                            </Grid>
                                            <Grid item>
                                                <Tooltip title={`Go see ${thing.creator.name}'s profile in Thingiverse site`} arrow>
                                                    <Paper className={classes.paper}>
                                                        <a href={thing.creator.public_url}>
                                                            {`${thing.creator.name}'s pofile`}
                                                        </a>
                                                    </Paper>
                                                </Tooltip>
                                            </Grid>
                                        </Grid>
                                    </Grid>

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
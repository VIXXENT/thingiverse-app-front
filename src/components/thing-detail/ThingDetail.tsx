import React, { Dispatch, SetStateAction } from 'react';
import { makeStyles, Theme, createStyles, Typography as pre, Paper, Typography } from '@material-ui/core';
import { gql } from 'apollo-boost';
import { ThingDetail, Image } from '../../services/apollo/types';
import { useParams } from 'react-router-dom';
import { Query, QueryResult } from 'react-apollo';
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import _ from 'lodash';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            margin: theme.spacing(2),
            marginLeft: theme.spacing(10)
        },
        paper: {
            margin: theme.spacing(1),
            padding: theme.spacing(1)
        },
        galleryWrapper: {
            width: theme.spacing(100),
            height: theme.spacing(100),
            overflow: 'hidden'
        },
        '@global': {
            '.image-gallery-slide img': {
                width: '100%',
                height: '1000px',
                objectFit: 'cover',
                overflow: 'hidden',
                objectPosition: 'center center',
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
);

interface thingDetailProps{
    userId?: number,
    setUserId: Dispatch<SetStateAction<number|undefined>>
}

export default function(props:thingDetailProps){
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
                        const thing:ThingDetail = data.thingDetail;
                        return (
                            <div>
                                <Paper className={classes.paper}>
                                    <Typography variant='h5'>
                                        {thing.name} by {thing.creator.name}
                                    </Typography>
                                    <Paper className={`${classes.paper} ${classes.galleryWrapper}`}>
                                        <ImageGallery 
                                            items={convertImagesToGalleryFormat(thing.images)} 
                                            lazyLoad={true}
                                            slideDuration={100}
                                            
                                        />
                                    </Paper>
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
    return gql`{thingDetail(id:${thingId}){
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
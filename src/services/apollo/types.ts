import React from 'react';

export interface Thing {
    id: string,
    name: string,
    url: string,
    public_url: string,
    created_at: string,
    thumbnail: string,
    preview_image: string,
    creator: Creator,
    is_private: boolean,
    is_purchased: boolean,
    is_published: boolean
}

export interface Creator{
    id: string,
    name: string,
    first_name: string,
    last_name: string,
    url: string,
    public_url: string,
    thumbnail: string,
    accepts_tips: boolean,
    is_following: boolean,
    location: string,
    cover: string
}


export interface ThingDetail{
    id: string
    name: string
    thumbnail: string
    url: string
    public_url: string
    creator: Creator
    added: string
    modified: string
    is_published: Number
    is_wip: Number
    is_featured: string
    is_nsfw: Boolean
    like_count: Number
    is_liked: Boolean
    collect_count: Number
    is_collected: Boolean
    comment_count: Number
    is_watched: Boolean
    default_image: Image
    description: string
    instructions: string
    description_html: string
    instructions_html: string
    details: string
    details_parts: [DetailsPart]
    edu_details:string
    edu_details_parts:[EduDetailsPart]
    license: string
    files_url: string
    images_url: string
    likes_url: string
    ancestors_url: string
    derivatives_url: string
    tags_url: string
    categories_url: string
    file_count: Number
    layout_count: Number
    layouts_url: string
    is_private: Number
    is_purchased: Number
    in_library: Boolean
    print_history_count: Number
    app_id: string
    download_count: Number
    view_count: Number
    education: Education
    remix_count: Number
    make_count: Number
    app_count: Number
    images: [Image]
}

export interface Image {
    id: string
    url: string
    name: string
    sizes: [ImageSize]
    added: string
}

export interface ImageSize {
    type: string
    size: string
    url: string
}

export interface DetailsPart {
    type: string
    name: string
    required: string
    data: [DetailsPartData]
}

export interface DetailsPartData{
    content: string
}

export interface EduDetailsPart {
    type: string
    name: string
    required: string
    label: string
    save_as_component:Boolean
    template: string
    fieldname: string
    default: string
}

export interface Education {
    grades: [string]
    subjects: [string]
}
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
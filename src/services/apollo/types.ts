export interface Cursor{
    page: number;
    per_page: number;
    sort: string;
}

export interface ThingsCursoredList{
    cursor: Cursor;
    hasMore: boolean;
    things: Thing[];
    __typename: string;
}

export interface Thing {
    added: string;
    ancestors_url: string;
    app_count: number;
    app_id: string;
    categories_url: string;
    collect_count: number;
    comment_count: number;
    created_at: string;
    creator: Creator;
    default_image: Image;
    derivatives_url: string;
    description: string;
    description_html: string;
    details: string;
    details_parts: [DetailsPart];
    download_count: number;
    edu_details: string;
    edu_details_parts: [EduDetailsPart];
    education: Education;
    files: [File];
    file_count: number;
    files_url: string;
    id: string;
    images: [Image];
    images_url: string;
    in_library: boolean;
    instructions: string;
    instructions_html: string;
    is_collected: boolean;
    is_featured: string;
    is_liked: boolean;
    is_nsfw: boolean;
    is_private: number;
    is_published: number;
    is_purchased: number;
    is_watched: boolean;
    is_wip: number;
    layout_count: number;
    layouts_url: string;
    license: string;
    like_count: number;
    likes_url: string;
    make_count: number;
    modified: string;
    name: string;
    preview_image: string;
    print_history_count: number;
    public_url: string;
    remix_count: number;
    tags_url: string;
    thumbnail: string;
    url: string;
    view_count: number;
}

export interface Creator{
    id: string;
    name: string;
    first_name: string;
    last_name: string;
    url: string;
    public_url: string;
    thumbnail: string;
    accepts_tips: boolean;
    is_following: boolean;
    location: string;
    cover: string;
}

export interface File{
    id: string;
    name: string;
    size: number;
    url: string;
    public_url: string;
    download_url: string;
    threejs_url: string;
    thumbnail: string;
    default_image: string;
    date: string;
    formatted_size: string;
    download_count: number;
}

export interface Image {
    id: string;
    url: string;
    name: string;
    sizes: [ImageSize];
    added: string;
}

export interface ImageSize {
    type: string;
    size: string;
    url: string;
}

export interface DetailsPart {
    type: string;
    name: string;
    required: string;
    data: [DetailsPartData];
}

export interface DetailsPartData{
    content: string;
}

export interface EduDetailsPart {
    type: string;
    name: string;
    required: string;
    label: string;
    save_as_component: boolean;
    template: string;
    fieldname: string;
    default: string;
}

export interface Education {
    grades: [string];
    subjects: [string];
}
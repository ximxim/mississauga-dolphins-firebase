export type Feed = {
    twitter: Boolean,
    facebook: Boolean,
    instagram: Boolean,
    applause: number,
    entities: {
        media: Array<{ media_url: string }>,
        urls: Array<{ expanded_url: string }>,
    },
    user: {
        name: string,
        screen_name: string,
        profile_image_url_https: string,
    },
    attachments: {
        data: Array<Object>,
        subattachments: {
            data: Array<Object>,
        },
    },
    start_time: string,
    end_time: string,
    place: Object,
    videos: {
        standard_resolution: {
            url: string,
        },
    },
    images: {
        standard_resolution: {
            url: string,
        },
    },
    carousel_media: Array<Object>,
    likes: {
        count: string,
    },
    type: string,
}

export type Newsfeed = {
    loading: Boolean,
    error: string,
    feed: Array<Feed>,
};

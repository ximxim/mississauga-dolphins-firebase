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
}

export type Newsfeed = {
    loading: Boolean,
    error: string,
    feed: Array<Feed>,
};

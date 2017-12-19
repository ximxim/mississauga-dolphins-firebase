const FB = require('fb');
const async = require('es5-async-await/async');
const await = require('es5-async-await/await');
const _ = require('lodash');

module.exports = async((config) => {
    const FbPageId = config.md_page_id;

    FB.options({ version: 'v2.11' });
    FB.setAccessToken(config.access_token);

    return new Promise((resolve) => {
        const postsResponse = await(getPosts(FbPageId));
        const posts = pretifyData(postsResponse.data, 'po');
        const photosResponse = await(getPhotos(FbPageId));
        const photos = pretifyData(photosResponse.data, 'ph');
        const videosResponse = await(getVideos(FbPageId));
        const videos = pretifyData(videosResponse.data, 'vi');
        const eventsResponse = await(getEvents(FbPageId));
        const events = pretifyData(eventsResponse.data, 'ev');

        return resolve({ posts, photos, videos, events });
    });
});

const getPosts = (FbPageId) => {
    const postsQuery = {
        fields: ['id', 'created_time', 'message', 'story', 'attachments'],
        limit: '100'
    };
    return new Promise((resolve) =>
        FB.api(`${FbPageId}/posts`,
            postsQuery,
            res => (! res || res.error) ? resolve(res.error) : resolve(res)))
}

const getPhotos = (FbPageId) => {
    const postsQuery = {
        fields: ['id', 'created_time', 'name', 'picture', 'images'],
        limit: '100'
    };
    return new Promise((resolve) =>
        FB.api(`${FbPageId}/photos`,
            postsQuery,
            res => (! res || res.error) ? resolve(res.error) : resolve(res)))
}

const getVideos = (FbPageId) => {
    const postsQuery = {
        fields: ['id', 'description', 'created_time', 'source', 'picture', 'title'],
        limit: '100'
    };
    return new Promise((resolve) =>
        FB.api(`${FbPageId}/videos`,
            postsQuery,
            res => (! res || res.error) ? resolve(res.error) : resolve(res)))
}

const getEvents = (FbPageId) => {
    const postsQuery = {
        fields: ['id', 'description', 'attending_count', 'can_guests_invite',
            'category,cover', 'place', 'end_time', 'start_time', 'declined_count',
            'noreply_count', 'name', 'is_canceled', 'updated_time'],
        limit: '100'
    };
    return new Promise((resolve) =>
        FB.api(`${FbPageId}/events`,
            postsQuery,
            res => (! res || res.error) ? resolve(res.error) : resolve(res)))
}

const pretifyData = (data, prefix) => {
    const dateOfItem = (prefix === 'ev') ? 'updated_time' : 'created_time'
    const FBData = _.map(
        data,
        (element) => _.extend({}, element,
            { id: `fb${prefix}${element.id}`, facebook: true, date: element[dateOfItem] }
        ));
    return { data: FBData };
}

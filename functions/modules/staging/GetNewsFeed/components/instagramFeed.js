const async = require('es5-async-await/async');
const await = require('es5-async-await/await');
const _ = require('lodash');
const request = require('request');
const moment = require('moment');

module.exports = async((config) => {
    const igUserId = config.user_id;
    const baseUrl = 'https://api.instagram.com/v1'
    const accessToken = config.access_token;
    return new Promise((resolve) => {
        const igResponse = await(requestIntagram(igUserId, baseUrl, accessToken));
        const parsedData = JSON.parse(igResponse);
        const igData = pretifyData(parsedData.data, 'ig');
        return resolve(igData);
    });
});

const requestIntagram = (igUserId, baseUrl, accessToken) =>
    new Promise((resolve) =>
        request(`${baseUrl}/users/self/media/recent/?access_token=${accessToken}&count=200`,
            (error, response, body) => (error) ? resolve(error) : resolve(body))
    );

const pretifyData = (data, prefix) => {
    const instagramData = _.map(
        data,
        (element) => _.extend({}, element,
            {
                id: `${prefix}${element.id}`,
                instagram: true,
                key: element.id,
                title: getTitle(element),
                date: moment.unix(parseInt(element.created_time)).format()
            }
        ));
    return { data: instagramData };
}

const getTitle = (element) => {
    let title = 'Untitled';
    if (element.caption) {
        title = element.caption.text;
    }
    return title;
}
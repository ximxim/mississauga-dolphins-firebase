const twitter = require('twitter');
const async = require('es5-async-await/async');
const await = require('es5-async-await/await');
const _ = require('lodash');
const moment = require('moment');

module.exports = async((config) => {
    const client = new twitter(config);
    const url = 'statuses/user_timeline';
    const params = { screen_name: 'M_Dolphins', count: '200' };

    return new Promise((resolve) => {
        const twitterResponse = await(getTweets(client, url, params));
        const filteredResponse = excludeItems(twitterResponse);
        const tweets = pretifyData(filteredResponse, 't');
        return resolve(tweets);
    });
});

const excludeItems = (data) => {
    return _.filter(data, (element) => {
        return ! element.is_quote_status
            && element.in_reply_to_user_id === null
            && element.in_reply_to_user_id_str === null
            && element.in_reply_to_screen_name === null
            && element.in_reply_to_status_id === null
            && element.in_reply_to_status_id_str === null;
    });
}

const getTweets = (client, url, params) =>
    new Promise((resolve) =>
        client.get(url, params,
            (error, tweets) =>
                (error) ? resolve(error) : resolve(tweets))
    );

const pretifyData = (data, prefix) => {
    const TwitterData = _.map(
        data,
        (element) => _.extend({}, element,
            {
                id: `${prefix}${element.id}`,
                twitter: true,
                key: element.id,
                title: getTitle(element),
                date: moment(element.created_at).format()
            }
        ));
    return { data: TwitterData };
}

const getTitle = (element) => element.text;

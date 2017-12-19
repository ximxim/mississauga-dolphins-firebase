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
        const twitterReponse = await(getTweets(client, url, params));
        const tweets = pretifyData(twitterReponse, 't');
        return resolve(tweets);
    });
});

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
            { id: `${prefix}${element.id}`, twitter: true, date: moment(element.created_at).format('LLL') }
        ));
    return { data: TwitterData };
}

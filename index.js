const twitter = require("twitter");
const functions = require('firebase-functions');
const localConfig = require('./localConfig');

let config = process.env.PWD === '/user_code' ? functions.config() : localConfig();

exports.getTwitterFeed = functions.https.onRequest((requ, resp) => {
    const client = new twitter(config.twitter);
    const params = { screen_name: 'M_Dolphins', count: '2000' };

    client.get('statuses/user_timeline', params, (error, tweets) => (! error) ? resp.send(tweets) : resp.send(error));
});
const twitter = require("twitter");
const functions = require('firebase-functions');
const localConfig = require('./localConfig');
const admin = require("firebase-admin");
const serviceAccount = require('./md-firebase-admin.json');
const _ = require('lodash');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://mississauga-dolphins.firebaseio.com",
});

let config = process.env.PWD === '/user_code' ? functions.config() : localConfig();

const db = admin.database();
const ref = db.ref('/');
const newsFeedRef = ref.child('NewsFeed');

exports.getTwitterFeed = functions.https.onRequest((request, response) => {
    const client = new twitter(config.twitter);
    const params = { screen_name: 'M_Dolphins', count: '200' };

    client.get('statuses/user_timeline', params, (error, tweets) => {
        if (error) {
            response.send(error);
        } else {
            const newTweetArray = _.map(tweets, (element) => _.extend({}, element, { twitter: true }));
            newsFeedRef.set(newTweetArray);
            response.send(newTweetArray);
        }
    });
});

const functions = require('firebase-functions');
const localConfig = require('./localConfig');
const admin = require("firebase-admin");
const _ = require('lodash');
const async = require('es5-async-await/async');
const await = require('es5-async-await/await');

const getTwitterFeed = require('./twitterFeed');
const getFacebookFeed = require('./facebookFeed');
const serviceAccount = require('./md-firebase-admin.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://mississauga-dolphins.firebaseio.com",
});

const config = process.env.PWD === '/user_code' ? functions.config() : localConfig();

const db = admin.database();
const ref = db.ref('/');
const newsFeedRef = ref.child('NewsFeed');

exports.getNewsFeed = functions.https.onRequest(async((request, response) => {
    const twitterFeed = await(getTwitterFeed(config.twitter));
    const newTweetArray = _.map(twitterFeed, (element) => _.extend({}, element, { twitter: true }));
    await(newsFeedRef.set(newTweetArray));

    const facebookFeed = await(getFacebookFeed(config.facebook));

    response.send(newTweetArray);
}));

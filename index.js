const functions = require('firebase-functions');
const localConfig = require('./localConfig');
const admin = require("firebase-admin");
const _ = require('lodash');
const async = require('es5-async-await/async');
const await = require('es5-async-await/await');

const getTwitterFeed = require('./twitterFeed');
const serviceAccount = require('./md-firebase-admin.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://mississauga-dolphins.firebaseio.com",
});

let config = process.env.PWD === '/user_code' ? functions.config() : localConfig();

const db = admin.database();
const ref = db.ref('/');
const newsFeedRef = ref.child('NewsFeed');

exports.getTwitterFeed = functions.https.onRequest(async((request, response) => {
    const twitterFeed = await(getTwitterFeed(config.twitter));
    const newTweetArray = _.map(twitterFeed, (element) => _.extend({}, element, { twitter: true }));
    await(newsFeedRef.set(newTweetArray));

    response.send(twitterToFb);
}));

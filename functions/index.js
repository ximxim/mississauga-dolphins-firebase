const functions = require('firebase-functions');
const localConfig = require('./localConfig');
const admin = require("firebase-admin");
const _ = require('lodash');
const async = require('es5-async-await/async');
const await = require('es5-async-await/await');

const getTwitterFeed = require('./twitterFeed');
const getFacebookFeed = require('./facebookFeed');
const getInstagramFeed = require('./instagramFeed');
const getFirebaseFeed = require('./firebaseFeed');
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
    const currentFeed = await(getFirebaseFeed(newsFeedRef));
    const newFeed = [];
    const twitterFeed = await(getTwitterFeed(config.twitter));
    _.map(twitterFeed.data, (element) => newFeed.push(element));

    const facebookFeed = await(getFacebookFeed(config.facebook));
    _.map(facebookFeed.posts.data, (element) => newFeed.push(element));
    // _.map(facebookFeed.photos.data, (element) => newFeed.push(element));
    // _.map(facebookFeed.videos.data, (element) => newFeed.push(element));
    _.map(facebookFeed.events.data, (element) => newFeed.push(element));

    const instagramFeed = await(getInstagramFeed(config.instagram));
    _.map(instagramFeed.data, (element) => newFeed.push(element));

    const difference = _.difference(_.keys(newFeed), _.keys(currentFeed));
    const recentlyAdded = _.map(difference, (element) => newFeed[element]);
    const mergedFeed = _.extend({}, newFeed, currentFeed);
    await(newsFeedRef.set(mergedFeed));

    response.send(recentlyAdded);
}));

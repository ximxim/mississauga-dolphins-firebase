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
const SlackMessages = require('./slackMessages');
const serviceAccount = require('./md-firebase-admin.json');
const req = require('request');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://mississauga-dolphins.firebaseio.com",
});

const config = process.env.PWD === '/user_code' ? functions.config() : localConfig();

const db = admin.database();
const ref = db.ref('/');
const newsFeedRef = ref.child('NewsFeed');

exports.getNewsFeed = functions.https.onRequest(async((request, response) => {
    // RESPONSE SYNC STARTED
    response.send({ text: 'Started social media sync. Hold tight!' });

    // FETCH CURRENT FEED DATA
    const currentFeed = await(getFirebaseFeed(newsFeedRef));
    const newFeed = [];

    // FETCH TWITTER FEED DATA
    const twitterFeed = await(getTwitterFeed(config.twitter));
    _.map(twitterFeed.data, (element) => newFeed.push(element));

    // FETCH FACEBOOK FEED DATA
    const facebookFeed = await(getFacebookFeed(config.facebook));
    _.map(facebookFeed.posts.data, (element) => newFeed.push(element));
    _.map(facebookFeed.events.data, (element) => newFeed.push(element));

    // FETCH INSTAGRAM FEED DATA
    const instagramFeed = await(getInstagramFeed(config.instagram));
    _.map(instagramFeed.data, (element) => newFeed.push(element));

    // MERGE CURRENT FEED DATA WITH NEW FEED DATA
    const fakeFacebookPost = {
        "attachments": {
            "data": [{
                "media": {
                    "image": {
                        "height": 378,
                        "src": "https://scontent.xx.fbcdn.net/v/t31.0-8/s720x720/26170555_1474589432609914_6346480168343329330_o.jpg?oh=acfb7b18394ddc50d681513dfb2b0847&oe=5AFD2EF5",
                        "width": 720
                    }
                },
                "target": {
                    "id": "124739877594883",
                    "url": "https://www.facebook.com/MississaugaDolphins/"
                },
                "title": "Mississauga Dolphins's cover photo",
                "type": "cover_photo",
                "url": "https://www.facebook.com/MississaugaDolphins/"
            }]
        },
        "created_time": "2018-01-01T00:11:55+0000",
        "date": "2017-12-31T19:11:55-05:00",
        "facebook": true,
        "id": "fbpo124739877594883_1474589572609900mama",
        "key": "124739877594883_1474589572609900mama",
        "story": "FAKE - Mississauga Dolphins updated their cover photo.",
        "title": "FAKE - Mississauga Dolphins updated their cover photo."
    };
    newFeed.push(fakeFacebookPost);

    const recentlyAdded = _.map(_.difference(_.keys(newFeed), _.keys(currentFeed)), (element) => newFeed[element]);
    const mergedFeed = _.extend({}, newFeed, currentFeed);
    await(newsFeedRef.set(mergedFeed));

    // POST ON SLACK HOW MANY ITEMS WERE ADDED
    const slackMessages = new SlackMessages(config.slack);
    await(slackMessages.syncCompletedMessage(recentlyAdded.length));

    // POST ON SLACK ALL THE NEW ITEMS
    _.map(recentlyAdded, (element) => await(slackMessages.recentlyAddedItemMessage(element)));
}));

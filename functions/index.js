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

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://mississauga-dolphins.firebaseio.com",
});

const config = process.env.PWD === '/user_code' ? functions.config() : localConfig();

const db = admin.database();
const ref = db.ref('/');
const newsFeedRef = ref.child('NewsFeed');
const slackMessages = new SlackMessages(config.slack);

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
    const newFeedObject = _.keyBy(newFeed, 'id')
    const recentlyAdded = _.map(_.difference(_.keys(newFeedObject), _.keys(currentFeed)), (element) => newFeedObject[element]);

    _.map(newFeed, (item) => newsFeedRef.child(item.id).set(item));

    // POST ON SLACK HOW MANY ITEMS WERE ADDED
    await(slackMessages.syncCompletedMessage(recentlyAdded.length));

    // POST ON SLACK ALL THE NEW ITEMS
    _.map(recentlyAdded, (element) => await(slackMessages.recentlyAddedItemMessage(element)));
}));

exports.slackListener = functions.https.onRequest(async((request, response) => {
    const payload = JSON.parse(request.body.payload);

    if (payload.team.id === config.slack.team.id
        && payload.team.domain === config.slack.team.domain
        && payload.channel.id === config.slack.channel.id) {


        // FIGURE OUT THE ACTION
        const actionTrigger = (_.isArray(payload.actions)) ? payload.actions[0].value : null;
        const attachment = _.filter(payload.original_message.attachments, (attachment) => {
            if (_.isArray(attachment.actions)) {
                return _.map(attachment.actions, (action) => action.value === actionTrigger);
            }
        });

        // SEND BACK A RESPONSE WITHOUT BUTTONS
        const newMessage = payload.original_message;
        newMessage.attachments = _.filter(newMessage.attachments, (attachment) => ! attachment.callback_id);
        response.send(newMessage);

        const itemReference = ref.child('NewsFeed/' + attachment[0].callback_id);
        itemReference.update({ hidden: true });
        const item = await(getFirebaseFeed(itemReference));
        await(slackMessages.feedItemHiddenMessage(item, payload.response_url));
    }
}));

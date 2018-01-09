const functions = require('firebase-functions');
const localConfig = require('./localConfig');
const _ = require('lodash');
const async = require('es5-async-await/async');
const await = require('es5-async-await/await');

const getTwitterFeed = require('./twitterFeed');
const getFacebookFeed = require('./facebookFeed');
const getInstagramFeed = require('./instagramFeed');
const FirebaseRequests = require('./firebaseRequests');
const SlackMessages = require('./slackMessages');

const config = process.env.PWD === '/user_code' ? functions.config() : localConfig();
const slackMessages = new SlackMessages(config.slack);
const firebaseRequests = new FirebaseRequests();

exports.getNewsFeed = functions.https.onRequest(async((request, response) => {
    // RESPONSE SYNC STARTED
    response.send({ text: 'Started social media sync. Hold tight!' });

    // FETCH CURRENT FEED DATA
    const currentFeed = await(firebaseRequests.getNewsFeed());
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
    _.map(newFeed, (item) => firebaseRequests.updateItemById('NewsFeed', item.id, item));

    // POST ON SLACK HOW MANY ITEMS WERE ADDED
    await(slackMessages.syncCompletedMessage(recentlyAdded.length));

    // POST ON SLACK ALL THE NEW ITEMS
    _.map(recentlyAdded, (element) => await(slackMessages.newsFeedItemMessage(element, null, ['hide'])));
}));

exports.slackListener = functions.https.onRequest(async((request, response) => {
    const payload = JSON.parse(request.body.payload);

    // ONLY ACCEPT MESSAGES FROM ADMIN CHANNEL OF COMPANY
    if (payload.team.id === config.slack.team.id
        && payload.team.domain === config.slack.team.domain
        && payload.channel.id === config.slack.channel.id) {

        // ACTION THAT WAS TRIGGERED e.g. hide or show
        const actionTrigger = (_.isArray(payload.actions)) ? payload.actions[0].value : null;

        // ATTACHMENT THAT MATCHES THE ACTION IN ORDER TO GET CALLBACK ID
        const attachment = _.filter(payload.original_message.attachments, (attachment) => {
            if (_.isArray(attachment.actions)) {
                return _.map(attachment.actions, (action) => action.value === actionTrigger);
            }
        });

        if (actionTrigger === 'hide' || actionTrigger === 'show') {
            // SEND BACK A RESPONSE WITHOUT BUTTONS
            const newMessage = payload.original_message;
            newMessage.attachments = _.filter(newMessage.attachments, (attachment) => ! attachment.callback_id);
            response.send(newMessage);

            // UPDATE HIDDEN INDICATOR ON FIREBASE ITEM BASED ON ACTION
            firebaseRequests.updateItemById('NewsFeed', attachment[0].callback_id, { hidden: (actionTrigger === 'hide') });

            // GET ITEM TO SEND BACK
            const item = await(firebaseRequests.getItemByReference(itemReference));
            const buttons = actionTrigger === 'hide' ? ['show'] : ['hide'];
            await(slackMessages.newsFeedItemMessage(item, payload.response_url, buttons));
        }
    }
}));

exports.recentFeed = functions.https.onRequest(async((request, response) => {
    // CHECK IF USER IS AUTHORIZED
    console.log('authorizing');
    if (request.body.team_id === config.slack.team.id
        && request.body.team_domain === config.slack.team.domain) {
        console.log('authorized');

        const count = parseInt(request.body.text);
        console.log('***** count *****', count);

        if (isNaN(count) && request.body.text !== '') {
            // PLEASE PROVIDE A NUMBER OR LEAVE THAT PARAMETER EMPTY
            response.status(404);
        } else {
            console.log('***** sending *****', count);
            response.send({ text: 'sending 20 items your way!' });
            const items = await(firebaseRequests.getNewsFeedByCount(20));
            _.map(items, (item) => await(slackMessages.newsFeedItemMessage(item, request.body.response_url)));
        }

    } else {
        // ONLY USERS FROM MISSISSAUGA DOLPHINS ADMIN TEAM CAN RUN THIS COMMAND
        response.status(400);
    }
}));

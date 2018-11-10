const async = require('es5-async-await/async');
const await = require('es5-async-await/await');
const _ = require('lodash');

const getTwitterFeed = require('./components/twitterFeed');
const getFacebookFeed = require('./components/facebookFeed');
const getInstagramFeed = require('./components/instagramFeed');
const FirebaseRequests = require('../../../utils/firebaseRequestsStaging');
const SlackMessages = require('../../../utils/slackMessages');

module.exports = async((request, response, config) => {
    //INITIALIZE
    const firebaseRequests = new FirebaseRequests();
    const slackMessages = new SlackMessages(config.slack);

    // FETCH CURRENT FEED DATA
    console.log('***** FETCHING CURRENT FEED TO STAGING ******');
    const currentFeed = await(firebaseRequests.getObjectByName('NewsFeed'));
    const newFeed = [];
    console.log('***** FETCHED CURRENT FEED TO STAGING ******');

    // FETCH TWITTER FEED DATA
    console.log('***** FETCHING TWITTER FEED ******');
    const twitterFeed = await(getTwitterFeed(config.twitter));
    _.map(twitterFeed.data, element => newFeed.push(element));
    console.log('***** FETCHED TWITTER FEED ******');

    // FETCH FACEBOOK FEED DATA
    console.log('***** FETCHING FACEBOOK FEED ******');
    const facebookFeed = await(getFacebookFeed(config.facebook));
    _.map(facebookFeed.posts.data, element => newFeed.push(element));
    _.map(
        facebookFeed.events.data,
        item =>
            item
                ? firebaseRequests.updateItemById('Events', item.id, item)
                : console.log(item)
    );
    console.log('***** FETCHED FACEBOOK FEED ******');

    // FETCH INSTAGRAM FEED DATA
    console.log('***** FETCHING INSTAGRAM FEED ******');
    const instagramFeed = await(getInstagramFeed(config.instagram));
    _.map(instagramFeed.data, element => newFeed.push(element));
    console.log('***** FETCHED INSTAGRAM FEED ******');

    // MERGE CURRENT FEED DATA WITH NEW FEED DATA
    console.log('***** MERGING CURRENT FEED ******');
    const newFeedObject = _.keyBy(newFeed, 'id');
    const recentlyAdded = _.map(
        _.difference(_.keys(newFeedObject), _.keys(currentFeed)),
        element => newFeedObject[element]
    );
    _.map(
        newFeed,
        item =>
            item
                ? firebaseRequests.updateItemById('NewsFeed', item.id, item)
                : console.log(item)
    );
    console.log('***** MERGED CURRENT FEED ******');

    // POST ON SLACK HOW MANY ITEMS WERE ADDED
    await(slackMessages.syncCompletedMessage(recentlyAdded.length));
    console.log('***** SENT COMPLETED MESSAGE TO SLACK ******');

    // POST ON SLACK ALL THE NEW ITEMS
    _.map(recentlyAdded, element =>
        await(slackMessages.newsFeedItemMessage(element, null, ['hide']))
    );

    // RESPONSE
    console.log('***** ALL DONE ******');
    response.send('All Done');
});

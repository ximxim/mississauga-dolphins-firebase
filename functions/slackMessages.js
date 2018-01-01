const async = require('es5-async-await/async');
const request = require('request');
const _ = require('lodash');

let slackConfig = {};

function SlackMessages(config) {
    slackConfig = config;
};

SlackMessages.prototype.syncCompletedMessage = async((count) => {
    const slackMessage = {
        "username": "Google Cloud",
        "text": "Sync completed! Added " + count + " new items",
        "icon_emoji": ":white_check_mark:"
    };

    return new Promise((resolve) =>
        request(
            {
                method: 'POST',
                url: slackConfig.admin_incoming_url,
                body: JSON.stringify(slackMessage)
            },
            (error, response, body) =>
                (error) ? resolve(error) : resolve(body)
        )
    );
});

SlackMessages.prototype.recentlyAddedItemMessage = async((item) => {
    let socialMedia;
    if (item.instagram) {
        socialMedia = 'Instagram'
    } else if (item.facebook) {
        socialMedia = 'Facebook'
    } else if (item.twitter) {
        socialMedia = 'Twitter'
    } else {
        socialMedia = 'Unknown'
    }

    console.log(getFields(item));

    const slackMessage = {
        "username": "News Feed Alert",
        "icon_emoji": ":sparkle:",
        "text": "Added an item from " + socialMedia,
        "fallback": "Added an item from " + socialMedia,
        "pretext": "Here is the post:",
        "color": "#36a64f",
        "fields": getFields(item),
    };

    return new Promise((resolve) =>
        request(
            {
                method: 'POST',
                url: slackConfig.admin_incoming_url,
                body: JSON.stringify(slackMessage)
            },
            (error, response, body) =>
                (error) ? resolve(error) : resolve(body)
        )
    );
});

const getFields = (item) =>
    _.map(item, (element, index) => {
        if (_.isObject(element)) {
            return null;
        }
        return { "title": index, "value": element, short: false }
    });

module.exports = SlackMessages;
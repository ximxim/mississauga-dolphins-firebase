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

SlackMessages.prototype.newsFeedItemMessage = async((item, responseUrl, buttons) => {
    const url = responseUrl ? responseUrl : slackConfig.admin_incoming_url;
    const socialMedia = getSocialMedia(item);

    const slackMessage = {
        "username": "News Feed Alert",
        "icon_emoji": ":sparkle:",
        "text": "Added an item from " + socialMedia,
        "fallback": "Added an item from " + socialMedia,
        "color": "#36a64f",
        "attachments": [
            {
                "title": "Here is the post:",
                "fields": getFields(item),
            },
            {
                "fallback": "Unable to show render button. Please contact your admin.",
                "title": "Choose an option to modify the news item",
                "callback_id": item.id,
                "color": "#3AA3E3",
                "attachment_type": "default",
                "actions": getButtons(buttons),
            }
        ]
    };

    return new Promise((resolve) =>
        request(
            {
                method: 'POST',
                url,
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

const getButtons = (buttons) =>
    _.map(buttons, (button) => {
        if (button === 'hide') {
            return hideButton();
        } else if (button === 'show') {
            return showButton();
        }
        return null;
    });

const hideButton = () => {
    return {
        "name": "visibility",
        "text": "Hide post",
        "type": "button",
        "value": "hide",
        "confirm": {
            "title": "Are you sure?",
            "text": "The selected post will be hidden from the app newsFeed",
            "ok_text": "Yes",
            "dismiss_text": "No"
        }
    }
}

const showButton = () => {
    return {
        "name": "visibility",
        "text": "Show post",
        "type": "button",
        "value": "show",
    };
}

const getSocialMedia = (item) => {
    if (item.instagram) {
        return 'Instagram'
    } else if (item.facebook) {
        return 'Facebook'
    } else if (item.twitter) {
        return 'Twitter'
    } else {
        return 'Unknown'
    }
}

module.exports = SlackMessages;
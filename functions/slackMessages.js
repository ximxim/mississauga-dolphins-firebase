const async = require('es5-async-await/async');
const request = require('request');
const _ = require('lodash');
const moment = require('moment');

let slackConfig = {};

function SlackMessages(config) {
    slackConfig = config;
};

SlackMessages.prototype.syncCompletedMessage = async((count) => {
    const slackMessage = {
        username: 'Google Cloud',
        text: 'Sync completed! Added ' + count + ' new items',
        icon_emoji: ':white_check_mark:',
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
        text: `*Item from ${socialMedia}* \n\n id: ${item.id} \n\n ${getMessage(item)} \n\n ${getUrls(item)}`,
        fallback: `*Item from ${socialMedia}* \n\n id: ${item.id} \n\n *----- MESSAGE START -----* \n\n ${item.title} \n\n ${getUrls(item)}`,
        color: '#3AA3E3',
        mrkdwn: true,
        unfurl_links: true,
        unfurl_media: true,
        attachments: [
            {
                fallback: 'Unable to show render button. Please contact your admin.',
                title: 'Choose an option to modify the news item',
                callback_id: item.id,
                color: '#3AA3E3',
                attachment_type: 'default',
                actions: getButtons(buttons),
            }
        ]
    };

    return new Promise((resolve) =>
        request(
            { method: 'POST', url, body: JSON.stringify(slackMessage) },
            (error, response, body) => (error) ? resolve(error) : resolve(body)
        )
    );
});

const getMessage = ({ title }) => `*----- MESSAGE START -----* \n\n ${title} \n\n *----- MESSAGE END -----*`;

const getUrls = (item) => {
    const socialMedia = getSocialMedia(item);

    if (socialMedia === 'Instagram') {
        return getInstagramUrls(item);
    } else if (socialMedia === 'Facebook') {
        return getFacebookUrls(item);
    } else if (socialMedia === 'Twitter') {
        return getTwitterUrls(item);
    } else {
        return null;
    }
}

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
        name: 'visibility',
        text: 'Hide post',
        type: 'button',
        value: 'hide',
        confirm: {
            title: 'Are you sure?',
            text: 'The selected post will be hidden from the app newsFeed',
            ok_text: 'Yes',
            dismiss_text: 'No',
        }
    }
}

const showButton = () => {
    return {
        name: 'visibility',
        text: 'Show post',
        type: 'button',
        value: 'show',
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

const getInstagramUrls = (item) => {
    let urls = '';
    if (item.images) {
        urls += `<${item.images.standard_resolution.url} |Intagram Image>  \n`;
    }
    if (item.videos) {
        urls += `<${item.videos.standard_resolution.url} |Instagram Video>  \n`;
    }

    return urls;
}

const getFacebookUrls = (item) => {
    let urls = '';
    if (item.source) {
        urls += `<${item.source} |Facebook Video>  \n`;
    }
    if (item.attachments) {
        _.map(item.attachments.data, ({ media }) => {
            urls += media.image ? `<${media.image.src} |Facebook Attachment>  \n` : '';
        });
    }

    return urls;
}

const getTwitterUrls = (item) => {
    let urls = '';
    if (item.entities) {
        _.map(item.entities.urls, ({ url }) => {
            urls += `<${url} |Twitter Attachment>  \n`;
        });
    }

    return urls;
}

module.exports = SlackMessages;
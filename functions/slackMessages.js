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
        icon_emoji: ':sparkle:',
        text: 'Item from ' + socialMedia + '\n\n' + getUrls(item),
        fallback: 'Item from ' + socialMedia + '\n\n' + getUrls(item),
        color: '#36a64f',
        unfurl_links: true,
        unfurl_media: true,
        attachments: [
            {
                title: 'Here is the post:',
                fields: getFields(item),
            },
            getImages(item),
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

const getFields = (item) => {
    const socialMedia = getSocialMedia(item);

    if (socialMedia === 'Instagram') {
        return getInstagramFields(item);
    } else if (socialMedia === 'Facebook') {
        return getFacebookFields(item);
    } else if (socialMedia === 'Twitter') {
        return getTwitterFields(item);
    } else {
        return null;
    }
}

const getImages = (item) => {
    const socialMedia = getSocialMedia(item);

    if (socialMedia === 'Instagram') {
        return getInstagramImage(item);
    } else if (socialMedia === 'Facebook') {
        return getFacebookImage(item);
    } else if (socialMedia === 'Twitter') {
        return getTwitterImage(item);
    } else {
        return null;
    }
}

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
const getInstagramFields = (item) => {
    const fields = [];
    const videoUrl = item.videos ? item.videos.standard_resolution.url : null;
    // TEMPORARILY USE ITEM ID AS A FIELD
    fields.push(renderTextField('Item ID', item.id));
    // ITEM DATE
    fields.push(renderTextField('Date', moment(item.date).format('LLL')));
    // ITEM TITLE
    fields.push(renderTextField('Title', item.title));
    // ITEM VIDEO
    if (videoUrl) {
        fields.push(renderTextField('Video', videoUrl));
    }

    return fields;
}

const getFacebookFields = (item) => {
    const fields = [];
    // TODO: remove this ID field when in production
    fields.push(renderTextField('Item ID', item.id));

    // ITEM DATE
    fields.push(renderTextField('Date', moment(item.date).format('LLL')));

    // ITEM TITLE
    fields.push(renderTextField('Title', item.title));

    return fields;
}

const getTwitterFields = (item) => {
    const fields = [];
    // TEMPORARILY USE ITEM ID AS A FIELD
    fields.push(renderTextField('Item ID', item.id));

    // ITEM DATE
    fields.push(renderTextField('Date', moment(item.date).format('LLL')));

    return fields;
}

const getInstagramImage = (item) => {
    if (item.images.standard_resolution.url) {
        return {
            image_url: item.images.standard_resolution.url,
            fallback: '',
            title: '',
            title_link: '',
            text: '',
            color: '#764FA5',
        };
    }
    return null;
}

const getFacebookImage = (item) => {
    if (item.images) {
        return {
            image_url: item.images.standard_resolution.url,
            fallback: '',
            title: '',
            title_link: '',
            text: '',
            color: '#764FA5',
        };
    }
    return null;
}

const getTwitterImage = (item) => {
    if (item.images.standard_resolution.url) {
        return {
            image_url: item.images.standard_resolution.url,
            fallback: '',
            title: '',
            title_link: '',
            text: '',
            color: '#764FA5',
        };
    }
    return null;
}

const getInstagramUrls = (item) => {
    let urls = '';
    if (item.images) {
        urls += item.images.standard_resolution.url + '\n';
    }
    if (item.videos) {
        urls += item.video.standard_resolution.url + '\n';
    }

    return urls;
}

const getFacebookUrls = (item) => {

}

const getTwitterUrls = (item) => {

}

const renderTextField = (title, value) => {
    return {
        title,
        value,
    }
}

module.exports = SlackMessages;
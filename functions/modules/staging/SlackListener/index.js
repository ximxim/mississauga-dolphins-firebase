const async = require('es5-async-await/async');
const await = require('es5-async-await/await');
const _ = require('lodash');

const FirebaseRequests = require('../../../utils/firebaseRequestsStaging');
const SlackMessages = require('../../../utils/slackMessages');

module.exports = async((request, response, config) => {
    //INITIALIZE
    const firebaseRequests = new FirebaseRequests();
    const slackMessages = new SlackMessages(config.slack);

    const payload = JSON.parse(request.body.payload);

    // ONLY ACCEPT MESSAGES FROM ADMIN CHANNEL OF COMPANY
    if (
        payload.team.id === config.slack.team.id &&
        payload.team.domain === config.slack.team.domain &&
        payload.channel.id === config.slack.channel.id
    ) {
        // ACTION THAT WAS TRIGGERED e.g. hide or show
        const actionTrigger = _.isArray(payload.actions)
            ? payload.actions[0].value
            : null;

        // ATTACHMENT THAT MATCHES THE ACTION IN ORDER TO GET CALLBACK ID
        const attachment = _.filter(
            payload.original_message.attachments,
            attachment => {
                if (_.isArray(attachment.actions)) {
                    return _.map(
                        attachment.actions,
                        action => action.value === actionTrigger
                    );
                }
            }
        );

        if (actionTrigger === 'hide' || actionTrigger === 'show') {
            // SEND BACK A RESPONSE WITHOUT BUTTONS
            const newMessage = payload.original_message;
            newMessage.attachments = _.filter(
                newMessage.attachments,
                attachment => !attachment.callback_id
            );
            response.send(newMessage);

            // UPDATE HIDDEN INDICATOR ON FIREBASE ITEM BASED ON ACTION
            firebaseRequests.updateItemById(
                'NewsFeed',
                attachment[0].callback_id,
                { hidden: actionTrigger === 'hide' }
            );

            // GET ITEM TO SEND BACK
            const item = await(
                firebaseRequests.getNewsFeedItemById(
                    attachment[0].callback_id
                )
            );
            const button = actionTrigger === 'hide' ? ['show'] : ['hide'];
            await(
                slackMessages.newsFeedItemMessage(
                    item,
                    payload.response_url,
                    button
                )
            );
        }
    }
})

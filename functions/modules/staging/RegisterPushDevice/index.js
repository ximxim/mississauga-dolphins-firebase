const async = require('es5-async-await/async');
const await = require('es5-async-await/await');

const FirebaseRequests = require('../../../utils/firebaseRequestsStaging');
const SlackMessages = require('../../../utils/slackMessages');

module.exports = async((request, response, config) => {
    //INITIALIZE
    const firebaseRequests = new FirebaseRequests();
    const slackMessages = new SlackMessages(config.slack);

    const {
        installationId,
        deviceName,
        expoVersion,
        deviceYearClass,
        token
    } = request.query;
    if (token && installationId) {
        const existingUser = await(
            firebaseRequests.getObjectByName('Users/' + installationId)
        );

        if (existingUser) {
            firebaseRequests.updateItemById('Users/', installationId, { token });
        } else {
            slackMessages.message(`Success! A new user got added to push notification list ${installationId} - ${deviceName}`);
            firebaseRequests.addItemByNode('Users/' + installationId, {
                installationId,
                deviceName,
                expoVersion,
                deviceYearClass,
                token,
                notification_settings: {
                    game_start: true,
                    game_ends: true,
                    positions_change: true,
                    score_wicket: true,
                    key_players_change: true
                }
            });
        }
        response.send(200);
    } else {
        slackMessages.message(`Failed! A new user was not able to register for push notification ${installationId} - ${deviceName}`);
        response.send(403);
    }
})

const async = require('es5-async-await/async');
const await = require('es5-async-await/await');

const FirebaseRequests = require('../../../utils/firebaseRequests');
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
    if (token) {
        const existingUser = await(
            firebaseRequests.getObjectByName('Users/' + installationId)
        );

        if (existingUser) {
            firebaseRequests.updateItemById('Users/', installationId, { token });
        } else {
            slackMessages.message(`A new user got added to push notification list ${installationId} - ${deviceName}`);
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
        response.send(403);
    }
})

const async = require('es5-async-await/async');
const await = require('es5-async-await/await');

const FirebaseRequests = require('../../../utils/firebaseRequestsDev');

module.exports = async((request, response, config) => {
    //INITIALIZE
    const firebaseRequests = new FirebaseRequests();

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

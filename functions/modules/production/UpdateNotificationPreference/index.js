const async = require('es5-async-await/async');
const await = require('es5-async-await/await');

const FirebaseRequests = require('../../../utils/firebaseRequests');

module.exports = async((request, response, config) => {
    //INITIALIZE
    const firebaseRequests = new FirebaseRequests();

    const {
        installationId,
        game_start,
        positions_change,
        score_wicket,
        game_ends
    } = request.query;
    if (installationId) {
        const res = await(
            firebaseRequests.updateItemById(`Users`, installationId, {
                notification_settings: {
                    game_start,
                    positions_change,
                    score_wicket,
                    game_ends
                }
            })
        );
        response.send(res);
    } else {
        response.send(403);
    }
})

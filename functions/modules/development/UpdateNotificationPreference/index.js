const async = require('es5-async-await/async');
const await = require('es5-async-await/await');

const FirebaseRequests = require('../../../utils/firebaseRequestsDev');

module.exports = async((request, response, config) => {
    //INITIALIZE
    const firebaseRequests = new FirebaseRequests();

    const {
        installationId,
        game_start,
        positions_change,
        score_wicket,
        game_ends,
        key_players_change
    } = request.query;
    console.log(        installationId,
            game_start,
            positions_change,
            score_wicket,
            game_ends,
            key_players_change
);
    if (installationId) {
        const res = await(
            firebaseRequests.updateItemById(`Users`, installationId, {
                notification_settings: {
                    game_start: game_start === 'true',
                    positions_change: positions_change === 'true',
                    score_wicket: score_wicket === 'true',
                    game_ends: game_ends === 'true',
                    key_players_change: key_players_change === 'true',
                }
            })
        );
        response.send(res);
    } else {
        response.send(403);
    }
})

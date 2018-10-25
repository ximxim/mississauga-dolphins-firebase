const async = require('es5-async-await/async');
const await = require('es5-async-await/await');
const Expo = require('expo-server-sdk-modded');
const _ = require('lodash');

const FirebaseRequests = require('../../../utils/firebaseRequests');
const SlackMessages = require('../../../utils/slackMessages');

module.exports = async((change, context, config) => {
    //INITIALIZE
    const firebaseRequests = new FirebaseRequests();
    const slackMessages = new SlackMessages(config.slack);

    let expo = new Expo();
    let messages = [];
    let pushUsers = [];
    let body = '';
    const before = change.before.val();
    const after = change.after.val();
    const users = await(firebaseRequests.getObjectByName('Users'));
    const key = Object.keys(before)[0];
    const score = `${after[key].home.name}: ${after[key].home.score}/${after[key].home.wickets} vs ${after[key].visitor.name}: ${after[key].visitor.score}/${after[key].visitor.wickets}`;

    if (!before[key].active && !after[key].active) return;

    if (!before && after) {
        // GAME STARTED
        pushUsers = _.filter(users,
            user => user.notification_settings.game_start === 'true');

        body = `A game started between ${after.home.name} vs ${after.visitor.name}. Checkout the live scores in app.`;
    } else if (before && !after) {
        // GAME ENDED
        pushUsers = _.filter(users,
            user => user.notification_settings.game_ends === 'true');

        body = `A game ended between ${score}`;
    } else if (before && after) {
        if (!before[key].active && after[key].active) {
            // GAME STARTED
            pushUsers = _.filter(users,
                user => user.notification_settings.game_start === 'true');

            body = `A game started between ${after[key].home.name} vs ${after[key].visitor.name}. Checkout the live scores in app.`;
        } else if (before[key].active && !after[key].active) {
            // GAME ENDED
            pushUsers = _.filter(users,
                user => user.notification_settings.game_ends === 'true');

            body = `A game ended between ${score}.`;
        } else if ((before[key].home.batting
            && !after[key].home.batting)
            || (before[key].visitor.batting
            && !after[key].visitor.batting)) {
                // BATTING STANCE CHANGED
            pushUsers = _.filter(users,
                user => user.notification_settings.positions_change === 'true');

            const battingTeam = after[key].home.batting === 'true' ? after[key].home.name : after[key].visitor.name;
            body = `${battingTeam} is batting now. Score is ${score}`
        } else if ((before[key].home.wickets !== after[key].home.wickets)
            || (before[key].visitor.wickets !== after[key].visitor.wickets)) {
                // WICKETS CHANGED
                pushUsers = _.filter(users,
                    user => user.notification_settings.score_wicket === 'true');

                const wicketTeam = before[key].home.wickets !== after[key].home.wickets ? after[key].home.name : after[key].visitor.name;

                body = `${wicketTeam} lost a wicket. Score is ${score}`;
        }
    }

    _.map(pushUsers, user => {
        if (!Expo.isExpoPushToken(user.token)) {
            console.log('token is invalid');
        } else {
            messages.push({
                to: user.token,
                sound: 'default',
                body,
            });
        }
    });

    let chunks = expo.chunkPushNotifications(messages);
    _.map(chunks, chunk => {
        try {
            let receipts = await(expo.sendPushNotificationsAsync(chunk));
            console.log(receipts);
        } catch (error) {
            console.error(error);
        }
    });
})

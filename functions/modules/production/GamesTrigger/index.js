const async = require('es5-async-await/async');
const await = require('es5-async-await/await');
const Expo = require('expo-server-sdk-modded');
const _ = require('lodash');

const jsonDiff = require('../../../utils/jsonDiff');
const arrayDiff = require('../../../utils/arrayDiff');
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
    const diff = jsonDiff(before, after);
    const key =
        Object.keys(diff)[0] ||
        arrayDiff(Object.keys(before), Object.keys(after))[0];
    const score = key
        ? `${after[key].home.name}: ${after[key].home.score}/${
                after[key].home.wickets
          } vs ${after[key].visitor.name}: ${after[key].visitor.score}/${
                after[key].visitor.wickets
          }`
        : null;

    if (!before[key] && after[key]) {
        // IF THE GAME DIDN"T EXISTS AND AFTER IT DID THEN A NEW GAME STARTED
        pushUsers = _.filter(users,
            user => user.notification_settings.game_start);

        body = `A game started between ${after[key].home.name} vs ${after[key].visitor.name}. Checkout the live scores in app.`;
    } else if (!key || (!before[key].active && !after[key].active)) {
        // IF THE GAME IS INACTIVE OR IF THERE ARE NO CHANGES MADE. ABORT
        return;
    } else if (!before[key].active && after[key].active) {
        //IF THE GAME UPDATED FROM INACTIVE TO ACTIVE THEN AN EXISTING GAME STARTED
        pushUsers = _.filter(users,
            user => user.notification_settings.game_start);

        body = `A game started between ${after[key].home.name} vs ${after[key].visitor.name}. Checkout the live scores in app.`;
    } else if (before[key].active && !after[key].active) {
        //IF THE GAME CHANGED FROM ACTIVE TO INACTIVE THEN GAME ENDED
        pushUsers = _.filter(users,
            user => user.notification_settings.game_ends);

        body = `A game ended between ${score}`;
    } else if (
        (before[key].home.batting && !after[key].home.batting) ||
        (before[key].visitor.batting && !after[key].visitor.batting)
    ) {
        //IF THE GAME'S TEAMS BATTING STANCE CHANGED THEN BATTING STANCE CHANGED
        pushUsers = _.filter(users,
            user => user.notification_settings.positions_change);

        const battingTeam = after[key].home.batting ? after[key].home.name : after[key].visitor.name;
        body = `${battingTeam} is batting now. Score is ${score}`
    } else if (
        before[key].home.wickets !== after[key].home.wickets ||
        before[key].visitor.wickets !== after[key].visitor.wickets
    ) {
        //IF THE GAME'S TEAMS WICKETS CHANGED THEN WICKETS CHANGED
        pushUsers = _.filter(users,
            user => user.notification_settings.score_wicket);

        const wicketTeam = before[key].home.wickets !== after[key].home.wickets ? after[key].home.name : after[key].visitor.name;

        body = `${wicketTeam} lost a wicket. Score is ${score}`;
    } else if (before[key].striker !== after[key].striker ||
    before[key].nonStriker !== after[key].nonStriker ||
    before[key].bowler !== after[key].bowler
    ) {
        pushUsers = _.filter(users,
            user => user.notification_settings.key_players_change);

        body = `Positions updated. Striker: ${after[key].striker} Non Striker: ${after[key].nonStriker} Bowler: ${after[key].bowler}`;
    }

    _.map(pushUsers, user => {
        if (!Expo.isExpoPushToken(user.token)) {
            console.log('token is invalid');
        } else {
            messages.push({
                to: user.token,
                sound: 'default',
                body,
                data: after[key],
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

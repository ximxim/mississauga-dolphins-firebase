const async = require('es5-async-await/async');
const await = require('es5-async-await/await');
const _ = require('lodash');

const FirebaseRequests = require('../../../utils/firebaseRequestsStaging');
const SlackMessages = require('../../../utils/slackMessages');

module.exports = async((request, response, config) => {
    //INITIALIZE
    const firebaseRequests = new FirebaseRequests();
    const slackMessages = new SlackMessages(config.slack);

    // CHECK IF USER IS AUTHORIZED
    if (
        request.body.team_id === config.slack.team.id &&
        request.body.team_domain === config.slack.team.domain
    ) {
        const parsedCount = parseInt(request.body.text);
        const count = isNaN(parsedCount) ? 20 : parsedCount;

        if (isNaN(parsedCount) && request.body.text.length > 0) {
            response.send(
                '***** Please provide a number or leave that parameter empty *****'
            );
        } else {
            const items = await(firebaseRequests.getNewsFeedByCount(count));
            _.map(items, item => {
                const button = item.hidden ? ['show'] : ['hide'];
                await(
                    slackMessages.newsFeedItemMessage(item, null, button)
                );
            });
        }
        response.send({
            text: `***** sent ${count} items your way! *****`
        });
    } else {
        response.send(
            '***** Only users from Mississauga Dolphins admin team can run this command *****'
        );
    }
})

const async = require('es5-async-await/async');
const await = require('es5-async-await/await');

const FirebaseRequests = require('../../../utils/firebaseRequestsStaging');

module.exports = async((request, response, config) => {
    //INITIALIZE
    const firebaseRequests = new FirebaseRequests();

    const { id, type, applause } = request.query;
    if (type && id && applause) {
        firebaseRequests.updateItemById(type, id, { applause });
        const item = await(firebaseRequests.getNewsFeedItemById(id));
        response.send(item);
    } else {
        response.send(403);
    }
})

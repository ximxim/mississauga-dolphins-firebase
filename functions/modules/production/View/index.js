const async = require('es5-async-await/async');
const await = require('es5-async-await/await');

const FirebaseRequests = require('../../../utils/firebaseRequests');

module.exports = async((request, response, config) => {
    //INITIALIZE
    const firebaseRequests = new FirebaseRequests();

    const { id, type, views } = request.query;
    if (type && id && views) {
        firebaseRequests.updateItemById(type, id, { views });
        const item = await(firebaseRequests.getNewsFeedItemById(id));
        response.send(item);
    } else {
        response.send(403);
    }
})

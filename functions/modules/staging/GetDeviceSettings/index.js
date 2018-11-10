const async = require('es5-async-await/async');
const await = require('es5-async-await/await');

const FirebaseRequests = require('../../../utils/firebaseRequestsStaging');

module.exports = async((request, response, config) => {
    //INITIALIZE
    const firebaseRequests = new FirebaseRequests();

    const { installationId } = request.query;
    if (installationId) {
        const res = await(
            firebaseRequests.getObjectByName('Users/' + installationId)
        );
        response.send(res);
    } else {
        response.send(403);
    }
})

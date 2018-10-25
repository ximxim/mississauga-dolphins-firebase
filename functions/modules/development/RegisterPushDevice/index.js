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
        firebaseRequests.addItemByNode('Users/' + installationId, {
            installationId,
            deviceName,
            expoVersion,
            deviceYearClass,
            token
        });
        response.send(200);
    } else {
        response.send(403);
    }
})

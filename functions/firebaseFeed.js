const async = require('es5-async-await/async');

module.exports = async((fbReference) => {
    return new Promise((resolve) =>
        fbReference.once('value', (snapshot) => {
            resolve(snapshot.val());
        })
    );
});
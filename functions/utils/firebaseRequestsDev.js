const async = require('es5-async-await/async');
const _ = require('lodash');
const await = require('es5-async-await/await');
const serviceAccount = require('../md-firebase-admin.json');
const admin = require('firebase-admin');

const devApp = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://mississauga-dolphins-dev.firebaseio.com'
}, 'dev');

let db = devApp.database();
let ref = db.ref('/');

function FirebaseRequests() {
    db = devApp.database();
    ref = db.ref('/');
}

FirebaseRequests.prototype.getObjectByName = async(name => {
    const objectRef = ref.child(name);
    return new Promise(resolve =>
        objectRef.once('value', snapshot => {
            resolve(snapshot.val());
        })
    );
});

FirebaseRequests.prototype.getNewsFeedByCount = async(count => {
    const newsFeedRef = ref.child('NewsFeed');
    return new Promise(resolve =>
        newsFeedRef
            .orderByChild('date')
            .limitToLast(count)
            .once('value', snapshot => {
                resolve(snapshot.val());
            })
    );
});

FirebaseRequests.prototype.getNewsFeedItemById = async(id => {
    const itemReference = ref.child(`NewsFeed/${id}`);
    return new Promise(resolve =>
        itemReference.once('value', snapshot => {
            resolve(snapshot.val());
        })
    );
});

FirebaseRequests.prototype.updateItemById = async((reference, id, item) => {
    if (reference && id && item) {
        ref.child(reference)
            .child(id)
            .update(item);
    }
});

FirebaseRequests.prototype.addItemByNode = async((reference, item) => {
    if (reference && item) {
        ref.child(reference).set(item);
    }
});

FirebaseRequests.prototype.removeNewsFeedItemsByIdPrefix = async(prefix => {
    const newsFeedRef = ref.child('NewsFeed');
    const newsFeed = await(
        new Promise(resolve =>
            newsFeedRef.once('value', snapshot => resolve(snapshot.val()))
        )
    );
    _.map(
        newsFeed,
        item => (item.id.indexOf(prefix) > -1 ? delete newsFeed[item.id] : null)
    );
    return new Promise(resolve => newsFeedRef.set(newsFeed, () => resolve()));
});

FirebaseRequests.prototype.removeByRef = async(r => {
    const reference = ref.child(r);
    return reference.remove();
});

module.exports = FirebaseRequests;

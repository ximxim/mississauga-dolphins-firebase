const async = require('es5-async-await/async');
const _ = require('lodash');
const await = require('es5-async-await/await');
const serviceAccount = require('./md-firebase-admin.json');
const admin = require('firebase-admin');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
<<<<<<< HEAD
    databaseURL: 'https://mississauga-dolphins.firebaseio.com'
=======
    databaseURL: 'https://mississauga-dolphins.firebaseio.com',
>>>>>>> 5595608b356e8da56cce3327c0d2d8e107f4b5ea
});

let db = admin.database();
let ref = db.ref('/');

function FirebaseRequests() {
    db = admin.database();
    ref = db.ref('/');
}

FirebaseRequests.prototype.getObjectByName = async(name => {
    const newsFeedRef = ref.child(name);
    return new Promise(resolve =>
        newsFeedRef.once('value', snapshot => {
            resolve(snapshot.val());
        }),
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
            }),
    );
});

FirebaseRequests.prototype.getNewsFeedItemById = async(id => {
    const itemReference = ref.child(`NewsFeed/${id}`);
    return new Promise(resolve =>
        itemReference.once('value', snapshot => {
            resolve(snapshot.val());
        }),
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
<<<<<<< HEAD
            newsFeedRef.once('value', snapshot => resolve(snapshot.val()))
        )
    );
    _.map(
        newsFeed,
        item => (item.id.indexOf(prefix) > -1 ? delete newsFeed[item.id] : null)
=======
            newsFeedRef.once('value', snapshot => resolve(snapshot.val())),
        ),
    );
    _.map(
        newsFeed,
        item =>
            item.id.indexOf(prefix) > -1 ? delete newsFeed[item.id] : null,
>>>>>>> 5595608b356e8da56cce3327c0d2d8e107f4b5ea
    );
    return new Promise(resolve => newsFeedRef.set(newsFeed, () => resolve()));
});

FirebaseRequests.prototype.removeByRef = async(r => {
    const reference = ref.child(r);
    return reference.remove();
});

module.exports = FirebaseRequests;

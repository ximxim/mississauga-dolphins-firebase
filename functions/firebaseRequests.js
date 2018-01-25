const async = require('es5-async-await/async');
const serviceAccount = require('./md-firebase-admin.json');
const admin = require("firebase-admin");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://mississauga-dolphins.firebaseio.com",
});

let db = admin.database();
let ref = db.ref('/');

function FirebaseRequests() {
    db = admin.database();
    ref = db.ref('/');
};

FirebaseRequests.prototype.getNewsFeed = async(() => {
    const newsFeedRef = ref.child('NewsFeed');
    return new Promise((resolve) =>
        newsFeedRef.once('value', (snapshot) => {
            resolve(snapshot.val());
        })
    );
});

FirebaseRequests.prototype.getNewsFeedByCount = async((count) => {
    const newsFeedRef = ref.child('NewsFeed');
    return new Promise((resolve) =>
        newsFeedRef
            .orderByChild('date')
            .limitToLast(count)
            .once('value', (snapshot) => {
                resolve(snapshot.val());
            })
    );
});

FirebaseRequests.prototype.getNewsFeedItemById = async((id) => {
    const itemReference = ref.child(`NewsFeed/${id}`);
    return new Promise((resolve) =>
        itemReference.once('value', (snapshot) => {
            resolve(snapshot.val());
        })
    );
});

FirebaseRequests.prototype.updateItemById = async((reference, id, item) => {
    if (reference && id && item) {
        ref.child(reference).child(id).update(item);
    }
});

module.exports = FirebaseRequests;
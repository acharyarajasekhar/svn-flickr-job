const admin = require('firebase-admin');

module.exports = (req, res, next) => {
    let store = admin.firestore();
    let data = [];
    store.collection('gallery').where("isFromFlickr", "==", false).select('photos', 'parentId', 'parentType').get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                data.push({
                    id: doc.id,
                    ...doc.data()
                })
            });
            req.source_data = data;
            next();
        }).catch(err => res.json(err));
}
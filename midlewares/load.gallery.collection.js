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
            if (data.length > 0) {
                req.source_data = data;
                next();
            } else {
                res.json("No new entries in firebase gallery to process...");
            }
        }).catch(err => res.json(err));
}
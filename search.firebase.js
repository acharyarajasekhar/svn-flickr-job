const admin = require('firebase-admin');

module.exports = (req, res) => {
    admin.firestore()
        .collection('gallery')
        .doc(req.query.id)
        .get()
        .then(snapshot => {
            res.json({
                id: snapshot.id,
                ...snapshot.data()
            });
        })
        .catch(err => res.json(err));
}
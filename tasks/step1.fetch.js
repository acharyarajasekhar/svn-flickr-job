const admin = require('firebase-admin');

module.exports = () => {
    return new Promise((resolve, reject) => {
        admin.firestore()
            .collection('gallery')
            .where("isFromFlickr", "==", false)
            .select('photos', 'parentId', 'parentType')
            .get()
            .then(snapshot => {
                let data = [];
                snapshot.forEach(doc => {
                    data.push({
                        id: doc.id,
                        ...doc.data()
                    })
                });
                resolve(data);
            })
            .catch(err => reject(err));
    });
}
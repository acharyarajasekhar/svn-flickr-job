const admin = require('firebase-admin');

module.exports = (data) => {
    return new Promise((resolve, reject) => {
        try {
            let store = admin.firestore();
            let upPromises = [];
            data.forEach(d => {
                let req = new Promise((rs, rj) => {
                    if (d.sphotos.length === d.dphotos.length) {
                        store.collection('gallery').doc(d.id).update({ "photos": d.dphotos, "isFromFlickr": true }).then(() => {
                            console.log("Gallery: #" + d.id + " is updated with flickr photos:" + d.dphotos);
                            rs();
                        }).catch(err => rj(err));
                    } else {
                        console.error("ERROR: updateref skipped due to mismatch in photos count : " + JSON.stringify(d));
                        store.collection('gallery').doc(d.id).update({ "flickrphotos": d.dphotos, "isFromFlickr": true }).then(() => {
                            console.log("Gallery: #" + d.id + " is updated with flickr photos:" + d.dphotos + " in a seperate field");
                            rs();
                        }).catch(err => rj(err));
                    }
                });
                upPromises.push(req);
            });
            Promise.all(upPromises).then(() => {
                console.log("All Flickr image url's updated in Firebase @ " + moment().utcOffset("+05:30").format('YYYY-MM-DD hh:mm:ss a'));
                resolve(data);
            }).catch(err => reject(err));
        }
        catch (err) {
            reject(err);
        }
    });
}
const admin = require('firebase-admin');

module.exports = (data) => {
    return new Promise((resolve, reject) => {
        try {
            let store = admin.firestore();
            data.forEach((d, didx, darr) => {
                if (d.sphotos.length === d.dphotos.length) {
                    store.collection('gallery').doc(d.id).update({ "photos": d.dphotos, "isFromFlickr": true }).then(() => {
                        console.log("Gallery: #" + d.id + " is updated with flickr photos:" + d.dphotos);
                        if (didx === darr.length - 1) {
                            resolve(data);
                        }
                    })
                } else {
                    console.error("ERROR: updateref skipped due to some error: " + JSON.stringify(d));
                    store.collection('gallery').doc(d.id).update({ "flickrphotos": d.dphotos, "isFromFlickr": true }).then(() => {
                        console.log("Gallery: #" + d.id + " is updated with flickr photos:" + d.dphotos + " in a seperate field");
                        if (didx === darr.length - 1) {
                            resolve(data);
                        }
                    })
                }
            });
        }
        catch (err) {
            reject(err);
        }
    });
}
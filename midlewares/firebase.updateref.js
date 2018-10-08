const Flickr = require("flickrapi"),
    config = require('./../config/configuration'),
    admin = require('firebase-admin');

module.exports = (filesList) => {
    let parents = [];
    filesList.forEach((f) => {
        if (!parents.includes(f.parent)) parents.push(f.parent);
    });

    Flickr.authenticate(config.FLICKR_OPTIONS, (error, flickr) => {
        if (error) {
            console.log(error);
        }
        else {
            if (parents.length > 0) {
                let store = admin.firestore();
                parents.forEach(p => {
                    flickr.photos.search({
                        user_id: flickr.options.user_id,
                        text: p
                    }, (err, result) => {
                        if (err) { throw new Error(err); }
                        if (result && result.stat === "ok" && result.photos && result.photos.photo) {
                            console.log(result.photos.photo);
                            let finalPhotos = [];
                            for (let p of result.photos.photo) {
                                console.log('Original URL: ' + 'https://farm' + p.farm + '.staticflickr.com/' + p.server + '/' + p.id + '_' + p.secret + '_h.jpg');
                                finalPhotos.push('https://farm' + p.farm + '.staticflickr.com/' + p.server + '/' + p.id + '_' + p.secret + '_h.jpg');
                            }
                            store.collection('gallery').doc(p).update({ "photos": finalPhotos, "isFromFlickr": true }).then(() => {
                                console.log("Gallery: #" + p + " is attached with flickrphotos:" + finalPhotos);
                            })
                        }
                    })
                })
            }
        };
    });
}
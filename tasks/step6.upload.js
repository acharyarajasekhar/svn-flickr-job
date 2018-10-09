const Flickr = require("flickrapi");
const config = require('../config/configuration');
const moment = require('moment');

module.exports = (data) => {
    return new Promise((resolve, reject) => {
        try {
            let photos = [];
            data.forEach((d, didx, darr) => {
                d.photos.forEach((p, pidx, parr) => {
                    photos.push({
                        title: d.id,
                        tags: [d.id, p.fileId],
                        photo: __dirname + '/../temp/' + p.fileId + '.jpg'
                    })
                    if (pidx === parr.length - 1) {
                        console.log("Uploading gallery item: " + d.id + " with photos list " + JSON.stringify(photos));
                        Flickr.upload({ photos: photos }, config.FLICKR_OPTIONS, (err, result) => {
                            if (err) reject(err);
                            else {
                                console.log("Upload completed for : " + d.id);
                                if (didx === darr.length - 1) {
                                    setTimeout(() => {
                                        console.log("Upload task completed @ " + moment().utcOffset("+05:30").format('YYYY-MM-DD hh:mm:ss a'));
                                        resolve(data);
                                    }, 60 * 1000);
                                }
                            }
                        });
                    }
                })
            });
        }
        catch (err) {
            reject(err);
        }
    });
}
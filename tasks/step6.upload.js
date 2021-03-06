const Flickr = require("flickrapi");
const config = require('../config/configuration');
const moment = require('moment');

module.exports = (data) => {
    return new Promise((resolve, reject) => {
        try {
            let reqPromises = [];
            data.forEach(d => {
                let photoOption = { photos: [] };
                d.photos.forEach(p => { photoOption.photos.push({ title: d.id, tags: [d.id, p.fileId], photo: __dirname + '/../temp/' + p.fileId + '.jpg' }) })
                console.log("Uploading gallery item: " + d.id + " with " + photoOption.photos.length + " photos to flickr");
                let req = new Promise((rs, rj) => {
                    Flickr.upload(photoOption, config.FLICKR_OPTIONS, (err, result) => {
                        if (err) rj(err);
                        else console.log("Upload completed for : " + d.id + " : " + result); rs();
                    });
                });
                reqPromises.push(req);
            });
            Promise.all(reqPromises).then(() => {
                console.log("End of Uploade tasks @ " + moment().utcOffset("+05:30").format('YYYY-MM-DD hh:mm:ss a'));
                console.log("Pausing the execution for " + process.env.FLICKR_SYNC_TIME + " minute...");
                setTimeout(() => {
                    console.log("Resuming the execution after " + process.env.FLICKR_SYNC_TIME + " minute...");
                    resolve(data);
                }, parseInt(process.env.FLICKR_SYNC_TIME) * 60 * 1000);
            }).catch(err => reject(err));
        }
        catch (err) {
            reject(err);
        }
    });
}
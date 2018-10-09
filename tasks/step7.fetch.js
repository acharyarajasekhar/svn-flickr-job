const Flickr = require("flickrapi");
const config = require('../config/configuration');
const moment = require('moment');

module.exports = (data) => {
    return new Promise((resolve, reject) => {
        try {

            Flickr.authenticate(config.FLICKR_OPTIONS, (error, flickr) => {
                if (error) reject(error);
                else {
                    let finalData = [];
                    data.forEach((d, didx, darr) => {
                        flickr.photos.search({
                            user_id: flickr.options.user_id,
                            text: d.id
                        }, (err, result) => {
                            if (err) reject(err);
                            else {
                                if (result && result.stat === "ok" && result.photos && result.photos.photo) {
                                    let finalPhotos = [];
                                    for (let p of result.photos.photo) {
                                        finalPhotos.push('https://farm' + p.farm + '.staticflickr.com/' + p.server + '/' + p.id + '_' + p.secret + '_h.jpg');
                                    }
                                    finalData.push({
                                        id: d.id,
                                        sphotos: d.photos,
                                        dphotos: finalPhotos
                                    })
                                    if (didx === darr.length - 1) {
                                        setTimeout(() => {
                                            console.log("Flickr fetch task completed @ " + moment().utcOffset("+05:30").format('YYYY-MM-DD hh:mm:ss a'));
                                            resolve(finalData);
                                        }, 60 * 1000);
                                    }
                                }
                                else {
                                    console.log("ERROR: Flcikr search for " + d.id + " resulted in " + JSON.stringify(result));
                                }
                            }
                        })
                    });
                }
            });
        }
        catch (err) {
            reject(err);
        }
    });
}
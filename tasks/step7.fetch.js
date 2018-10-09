const Flickr = require("flickrapi");
const config = require('../config/configuration');
const moment = require('moment');

module.exports = (data) => {
    return new Promise((resolve, reject) => {
        try {
            Flickr.tokenOnly(config.FLICKR_OPTIONS, (error, flickr) => {
                if (error) reject(error);
                else {
                    let results = [];
                    let fetchPromises = [];
                    data.forEach(d => {
                        let req = new Promise((rs, rj) => {
                            flickr.photos.search({ user_id: flickr.options.user_id, text: d.id },
                                (err, result) => {
                                    if (err) rj(err);
                                    else {
                                        if (result && result.stat === "ok" && result.photos && result.photos.photo && result.photos.photo.length > 0) {
                                            let finalPhotos = result.photos.photo.map(p => { return 'https://farm' + p.farm + '.staticflickr.com/' + p.server + '/' + p.id + '_' + p.secret + '_h.jpg' });
                                            results.push({ id: d.id, sphotos: d.photos, dphotos: finalPhotos })
                                            rs();
                                        }
                                        else {
                                            console.log("ERROR: Flcikr search for " + d.id + " resulted in " + JSON.stringify(result));
                                            rs();
                                        }
                                    }
                                })
                        });
                        fetchPromises.push(req);
                    });
                    Promise.all(fetchPromises).then(() => {
                        console.log("End of Flickr URL's fetch task @ " + moment().utcOffset("+05:30").format('YYYY-MM-DD hh:mm:ss a'));
                        resolve(results);
                    }).catch(err => reject(err));
                }
            })
        }
        catch (err) {
            reject(err);
        }
    });
}
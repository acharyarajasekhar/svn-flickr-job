const fs = require('fs');
const request = require('request');
const moment = require('moment');

module.exports = (data) => {
    return new Promise((resolve, reject) => {
        let reqPromises = [];
        data.forEach(g => {
            g.photos.forEach(p => {
                console.log('Downloading ' + g.id + ' - ' + p.fileId);
                let req = new Promise((rs, rj) => {
                    request(p.fileUrl)
                        .on('error', (err) => { console.error("ERROR: " + err); rj(err); })
                        .pipe(fs.createWriteStream('temp/' + p.fileId + '.jpg'))
                        .on('close', () => { console.log('Finished Downloading ' + g.id + ' - ' + p.fileId); rs(); });
                });
                reqPromises.push(req);
            });
        })
        Promise.all(reqPromises).then(() => {
            console.log("End of Download tasks @ " + moment().utcOffset("+05:30").format('YYYY-MM-DD hh:mm:ss a'));
            resolve(data);
        }).catch(err => reject(err));
    });
}

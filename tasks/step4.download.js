const fs = require('fs');
const request = require('request');
const moment = require('moment');

module.exports = (data) => {
    return new Promise((resolve, reject) => {
        data.forEach((g, gidx, garr) => {
            g.photos.forEach((p, pidx, parr) => {
                console.log('Downloading ' + p.fileId);
                request.get(p.fileUrl)
                    .on('error', (err) => { console.error("ERROR: " + err) })
                    .pipe(fs.createWriteStream('temp/' + p.fileId + '.jpg'))
                    .on('close', () => {
                        console.log('Finished Downloading ' + p.fileId);                        
                        if (gidx === garr.length - 1 && pidx === parr.length - 1) {
                            setTimeout(() => {
                                console.log("Download task completed @ " + moment().utcOffset("+05:30").format('YYYY-MM-DD hh:mm:ss a'));
                                resolve(data);
                            }, 60 * 1000);
                        }
                    });
            });
        })
    });
}
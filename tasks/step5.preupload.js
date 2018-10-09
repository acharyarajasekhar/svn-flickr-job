const fs = require('fs');

module.exports = (data) => {
    return new Promise((resolve, reject) => {
        try {            
            fs.readdir(__dirname + '/../temp', (err, files) => {
                if (err) reject(err);
                else {
                    data.forEach(d => {
                        d.photos.forEach(p => {
                            if (!files.includes(p.fileId + '.jpg')) {
                                reject("ERROR: File missing in downloads: " + d.id + " : " + p.fileId)
                            }
                        })
                    })
                    resolve(data);
                }
            })
        }
        catch (err) {
            reject(err);
        }
    });
}
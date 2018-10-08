const fs = require('fs'), config = require('./../config/configuration'), admin = require('firebase-admin');

module.exports = (parent) => {
    fs.readdir(__dirname + '/../temp', (err, files) => {
        if (err) console.log(err);
        else if (files.length > 0) {
            let filteredFiles = files.filter(f => { return f.startsWith(parent + '-') });
            if (filteredFiles.length > 0) {
                filteredFiles.forEach(ff => {
                    let fbFile = "photos/" + ff.substring(ff.lastIndexOf('-') + 1, ff.lastIndexOf('.'));
                    console.log('Trying to delete ' + fbFile + ' from storage');
                    admin
                        .storage()
                        .bucket(config.FIREBASE_OPTIONS.project_id + '.appspot.com')
                        .file(fbFile)
                        .delete()
                        .then(() => console.log("File deleted successfully...: " + fbFile));
                })
            }
        }
    });
}
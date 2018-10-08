const Flickr = require("flickrapi"),
    config = require('../config/configuration'),
    fs = require('fs'),
    updateFbRef = require('./firebase.updateref');

module.exports = (req, res) => {

    fs.readdir(__dirname + '/../temp', (err, files) => {
        if (err) res.json(err);
        else if (files.length > 0) {
            let filesList = []
            files.forEach((f, idx, fArr) => {
                let ff = f.split('-')[0]
                filesList.push({
                    parent: f.split('-')[0],
                    fileUrl: __dirname + "/../temp/" + f
                })
                if (idx === fArr.length - 1) {
                    let uploadOptions = {
                        photos: []
                    };

                    for (let ff of filesList) {
                        uploadOptions.photos.push({
                            title: ff.parent,
                            tags: [ff.parent],
                            photo: ff.fileUrl
                        })
                    }

                    console.log("Uploading the photos: " + uploadOptions.photos);
                    Flickr.upload(uploadOptions, config.FLICKR_OPTIONS, (err, result) => {
                        if (err) {
                            return console.error(error);
                        }
                        console.log("Upload completed...: " + result);
                        updateFbRef(filesList);
                    });

                    res.json(filesList);
                }
            })
        } else {
            res.json("No files to upload");
        }
    })
}

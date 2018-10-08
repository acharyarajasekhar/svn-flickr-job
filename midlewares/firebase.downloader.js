var fs = require('fs');
var request = require('request');
const scheduler = require('./atrigger');

var download = function (url, dest, callback) {
    request.get(url)
        .on('error', function (err) { console.log(err) })
        .pipe(fs.createWriteStream(dest))
        .on('close', callback);
};

module.exports = (req, res) => {

    let urlList = [];
    for (let t of req.source_data) {
        for (let f of t.photos) {
            urlList.push({
                parent: t.id,
                url: f
            });
        }
    }

    let folder = "temp/";
    urlList.forEach((item, idx, arr) => {
        let str = item.url;
        let filename = str.substring(str.lastIndexOf('photos%2F') + 'photos%2F'.length, str.lastIndexOf('?alt=media')) + '.jpg';
        console.log('Downloading ' + filename);
        download(str, folder + item.parent + '-' + filename, () => {
            console.log('Finished Downloading ' + filename);
            if (idx === arr.length - 1) {
                scheduler();
            }
        });
    });

    res.json(req.source_data);
}
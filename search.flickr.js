const Flickr = require("flickrapi");
const config = require('./config/configuration');

module.exports = (req, res) => {
    Flickr.tokenOnly(config.FLICKR_OPTIONS, (error, flickr) => {
        if (error) return res.json(error);
        flickr.photos.search({ user_id: flickr.options.user_id, text: req.query.text },
            (err, result) => {
                if (err) return res.json(err);
                res.json(result);
            });
    })
}
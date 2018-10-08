const request = require('request');
const config = require('../config/configuration');

module.exports = () => {
    let url = encodeURIComponent(config.UPLOAD_API_URL);
    request(config.ATRIGGER_OPTIONS + url, (err, resp, body) => {
        if (err) console.log(err);
        else { 
            console.log(resp.statusCode);
            console.log(body); 
        }
    });
}
const rimraf = require('rimraf');

module.exports = () => {
    return new Promise((resolve, reject) => {
        rimraf(__dirname + '/../temp/*', (err) => {
            if (err) reject(err);
            else resolve("done");
        })
    });
}
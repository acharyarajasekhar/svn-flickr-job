const rimraf = require('rimraf');

module.exports = (req, res, next) => {
    rimraf.sync('./temp/*');
    next();
}
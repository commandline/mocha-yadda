'use strict';

var English = require('yadda').localisation.English;

module.exports = (function() {
    return English.library()

    .define('a file to be read', function (next) {
        next();
    })

    .define('the file can be read', function (next) {
        next();
    })
})();

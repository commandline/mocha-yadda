'use strict';
var expect = require('chai').expect;

var English = require('yadda').localisation.English;

module.exports = (function() {
    return English.library()

    .define('a feature to have a title', function(next) {
        throw new Error('Should not run!');
    })

    .define('a file to be read', function (next) {
        throw new Error('Should not run!');
    })

    .define('the file can be read', function (next) {
        throw new Error('Should not run!');
    })
})();

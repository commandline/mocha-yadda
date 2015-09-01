'use strict';
var expect = require('chai').expect;

var English = require('yadda').localisation.English;

module.exports = (function() {
    return English.library()

    .define('a file to be read', function (next) {
        this.ctx.someValue = 'something';
        next();
    })

    .define('the file can be read', function (next) {
        expect(this.ctx.someValue, 'should have had some value set from step to step').to.not.be.null;
        expect(this.ctx).to.have.property('someValue', 'something', 'should have had some value set from step to step');
        next();
    })
})();

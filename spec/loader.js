'use strict';
var expect = require('chai').expect;

describe('loader', function() {
    var Loader = require('../lib/loader');

    it('initializes', function() {
        expect(Loader).to.have.deep.property('http.load');
        expect(Loader.http.load).to.be.a('function');
        expect(Loader).to.have.deep.property('file.load');
        expect(Loader.file.load).to.be.a('function');
    });

    it('loads from file', function(done) {
        Loader.file.load('./spec/sample.feature')
        .then(function(featureFile) {
            expect(featureFile).not.to.be.undefined;
        })
        .nodeify(done);
    });

    it('loads from a url', function(done) {
        Loader.http.load('http://raw.githubusercontent.com/commandline/mocha-yadda/master/spec/sample.feature')
        .then(function(featureFile) {
            expect(featureFile).not.to.be.undefined;
        })
        .nodeify(done);
    });
});

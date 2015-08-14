'use strict';
var expect = require('chai').expect;
var MochaYadda = require('../lib');

describe('mocha-yadda', function() {
    var libloader = function() {
        return [require('./library')];
    };

    it('initializes', function() {

        expect(MochaYadda).not.to.be.undefined;
        expect(MochaYadda).to.have.property('fdescribe');
        expect(MochaYadda).to.have.property('withLang');
    });

    it('runs a always pass feature', function() {
        MochaYadda.fdescribe('./spec/sample.feature', [require('./library')], {rethrow: true});
    });

    it('accepts a library loader', function() {
        MochaYadda.fdescribe('./spec/sample.feature', libloader, {rethrow: true});
    });

    it('skips without error', function() {
        MochaYadda.fdescribe.skip('./spec/sample.feature', libloader);
    });
});

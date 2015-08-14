'use strict';
var expect = require('chai').expect;
var MochaYadda = require('../lib');

describe('module', function() {
    it('initializes', function() {

        expect(MochaYadda).not.to.be.undefined;
        expect(MochaYadda).to.have.property('fdescribe');
        expect(MochaYadda).to.have.property('withLang');
    });

    it('describes registers feature and scenarios', function() {
        MochaYadda.fdescribe('./spec/sample.feature', [require('./library')], {rethrow: true});
    });
});

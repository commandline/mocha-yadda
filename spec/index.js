'use strict';
var expect = require('chai').expect;

describe('module', function() {
    it('initializes', function() {
        var MochaYadda = require('../lib');

        expect(MochaYadda).not.to.be.undefined;
        expect(MochaYadda).to.have.property('fdescribe');
        expect(MochaYadda).to.have.property('withLang');
    });
});

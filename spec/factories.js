var expect = require('chai').expect;

describe('factories', function() {
    var Factories = require('../lib/factories');

    it('initializes', function() {
        expect(Factories.feature).not.to.be.undefined;
        expect(Factories.scenario).not.to.be.undefined;
    });

    it('feature returns function', function() {
        var fn = Factories.feature();
        expect(fn).to.be.a('function');
    });

    it('scenario returns function', function() {
        var fn = Factories.scenario();
        expect(fn).to.be.a('function');
    });
});

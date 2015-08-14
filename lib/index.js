'use strict';

var Loader = require('./loader');
var Factories = require('./factories');
var Yadda = require('yadda');
var FeatureParser = Yadda.parsers.FeatureParser;
var _ = require('lodash');
var onlyFound = false;

var withLang = function(lang) {
    lang = lang || Yadda.localisation.English;
    var parser = new FeatureParser(lang);

    Yadda.plugins.mocha.StepLevelPlugin.init();

    var loadAndDescribe = function(featureSpec, stepLibraries, options) {
        options = options || {};

        var loader = options.loader || Loader.file;

        if (options.only) {
            onlyFound = true;
        }

        loader.load(featureSpec).then(function (featureFile) {

            var xdescribe = (onlyFound && !options.only) || options.skip ? describe.skip : describe;

            var feature = parser.parse(featureFile);

            var yadda = Yadda.createInstance(stepLibraries);

            xdescribe(feature.title, Factories.feature(yadda, feature, options));
        }).catch(function (e) {
            console.error(e);
            if (options.rethrow) {
                throw e;
            }
        });
    };

    loadAndDescribe.skip = function(featureSpec, featureLibraries, options) {
        options = options || {};
        options.skip = true;
        loadAndDescribe(featureSpec, featureLibrary, options);
    };

    loadAndDescribe.only = function(featureSpec, featureLibraries, options) {
        options = options || {};
        options.only = true;
        loadAndDescribe(featureSpec, featureLibrary, options);
    };

    return loadAndDescribe;
};

module.exports = {
    fdescribe: withLang(),
    withLang: withLang
};

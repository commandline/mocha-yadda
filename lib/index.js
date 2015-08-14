'use strict';

var FeatureLoader = require('./featureLoader');
var Factories = require('./factories');
var Yadda = require('yadda');
var FeatureParser = Yadda.parsers.FeatureParser;
var _ = require('lodash');
var DEFAULT_FEATURE_TIMEOUT = 3500;
var onlyFound = false;

var withLang = function(lang) {
    lang = lang || Yadda.localisation.English;
    var parser = new FeatureParser(lang);

    Yadda.plugins.mocha.StepLevelPlugin.init();

    var loadAndDescribe = function(featureSpec, stepLibraries, options) {
        options = options || {};

        var loader = options.loader || FeatureLoader.file;

        if (options.only) {
            onlyFound = true;
        }

        loader.load(featureSpec).then(function (featureFile) {

            var xdescribe = (onlyFound && !options.only) || options.skip ? describe.skip : describe;

            var feature = parser.parse(featureFile);

            var yadda = Yadda.createInstance(stepLibraries);

            xdescribe(feature.title, Factories.feature());
        }).catch(function (e) {
            console.error(e);
        });
    };

    loadAndDescribe.skip = function(featureSpec, featureLibrary, options) {
        options = options || {};
        options.skip = true;
        runSingleFeature(featureSpec, featureLibrary, options);
    };

    loadAndDescribe.only = function(featureSpec, featureLibrary, options) {
        options = options || {};
        options.only = true;
        runSingleFeature(featureSpec, featureLibrary, options);
    };

    return {fdescribe: loadAndDescribe};
};

module.exports = {
    fdescribe: withLang(),
    withLang: withLang
};

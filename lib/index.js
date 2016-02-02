'use strict';

var Loader = require('./loader');
var Factories = require('./factories');
var Yadda = require('yadda');
var FeatureParser = Yadda.parsers.FeatureParser;
var _ = require('lodash');
var onlyFound = false;

var defaultOptions = function(options) {
    if (options) {
        // defensive copy since skip/only alter the passed in options
        return _.clone(options);
    }
    return {};
};

function tagsMatch(tags, annotations) {
    var lowerTags = tags.filter(function(tag) {
        return tag.toLowerCase();
    });
    return _.size(_.pick(annotations, lowerTags)) !== 0;
}

var withLang = function(lang) {
    lang = lang || Yadda.localisation.English;
    var parser = new FeatureParser(lang);

    Yadda.plugins.mocha.StepLevelPlugin.init();

    var loadAndDescribe = function(featureSpec, stepLibraries, options) {
        // don't need to call defaultOptions since this function doesn't alter
        // the argument
        options = options || {};

        var loader = options.loader || Loader.file;

        if (options.only) {
            onlyFound = true;
        }

        loader.load(featureSpec).then(function (featureFile) {

            var xdescribe = (onlyFound && !options.only) || options.skip ? describe.skip : describe;

            var feature = parser.parse(featureFile);

            var scenarioTagOverride = options.tags && feature.annotations &&
                tagsMatch(options.tags, feature.annotations);

            if (typeof stepLibraries === 'function') {
                stepLibraries = stepLibraries();
            }
            var yadda = Yadda.createInstance(stepLibraries);

            xdescribe(feature.title, Factories.feature(yadda, feature, options, scenarioTagOverride));
        }).catch(function (e) {
            console.error('Error fetching', featureSpec);
            console.error(e);
            if (options.rethrow) {
                throw e;
            }
        });
    };

    loadAndDescribe.skip = function(featureSpec, stepLibraries, options) {
        options = defaultOptions(options);
        options.skip = true;
        loadAndDescribe(featureSpec, stepLibraries, options);
    };

    loadAndDescribe.only = function(featureSpec, stepLibraries, options) {
        options = defaultOptions(options);
        options.only = true;
        loadAndDescribe(featureSpec, stepLibraries, options);
    };

    return loadAndDescribe;
};

module.exports = {
    fdescribe: withLang(),
    withLang: withLang,
    loaders: Loader
};

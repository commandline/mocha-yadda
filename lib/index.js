var FeatureLoader = require('featureLoader');
var Yadda = require('yadda');
var FeatureParser = Yadda.parsers.FeatureParser;
var _ = require('lodash');

module.exports = (function(options) {
    options = options || {};
    var lang = options.lang || Yadda.localisation.English;
    var parser = new FeatureParser(lang);
    var DEFAULT_FEATURE_TIMEOUT = 3500;
    var onlyFound = false;

    Yadda.plugins.mocha.StepLevelPlugin.init();

    var registerScenario = function(scenario) {
        // register hooks for the each scenario
        if (options && options.beforeScenario) {
            before(options.beforeScenario);
        }
        if (options && options.afterScenario) {
            after(options.afterScenario);
        }
        var scenarioContext = {
            title: scenario.title,
        };
        _.assign(scenarioContext, featureContext);
        steps(scenario.steps, function(step, done) {
            // the way yadda binds in the context, additions to the context
            // object are clobbered running the next step; this preserves
            // and carries over any state from the prior step
            yadda.run(step, {ctx: scenarioContext}, done);
        });
    };

    var registerFeature = function() {
        // sets the timeout for the entire feature
        if (options && options.timeout) {
            this.timeout(options.timeout);
        } else {
            this.timeout(DEFAULT_FEATURE_TIMEOUT);
        }
        // register hooks for the entire feature
        if (options && options.beforeFeature) {
            before(options.beforeFeature);
        }
        if (options && options.afterFeature) {
            after(options.afterFeature);
        }
        // capture the timeout function from Mocha so steps can set their
        // timeout individually
        var featureContext = {
            timeout: this.timeout
        };
        if (options && options.ctx) {
            _.assign(featureContext, options.ctx);
        }
        scenarios(feature.scenarios, registerScenario);
    };

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

            xdescribe(feature.title, registerFeature);
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

    return {
        fdescribe: loadAndDescribe,
        loader: FeatureLoader
    };
})(options);

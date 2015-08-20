var _ = require('lodash');

var featureFactory = function(yadda, feature, options) {
    return function() {
        // sets the timeout for the entire feature
        if (options && options.timeout) {
            this.timeout(options.timeout);
        }
        // capture the timeout function from Mocha so steps can set their
        // timeout individually
        var featureContext = {
            timeout: this.timeout
        };
        if (options && options.ctx) {
            _.assign(featureContext, options.ctx);
        }
        // register hooks for the entire feature
        if (options && options.beforeFeature) {
            before(options.beforeFeature.bind({ctx: featureContext}));
        }
        if (options && options.afterFeature) {
            after(options.afterFeature.bind({ctx: featureContext}));
        }
        scenarios(feature.scenarios, scenarioFactory(yadda, featureContext, options));
    };
};

var scenarioFactory = function(yadda, featureContext, options) {
    return function(scenario) {
        var scenarioContext = {
            title: scenario.title,
        };
        _.assign(scenarioContext, featureContext);
        // register hooks for the each scenario
        if (options && options.beforeScenario) {
            before(options.beforeScenario.bind({ctx: scenarioContext}));
        }
        if (options && options.afterScenario) {
            after(options.afterScenario.bind({ctx: scenarioContext}));
        }
        steps(scenario.steps, function(step, done) {
            // the way yadda binds in the context, additions to the context
            // object are clobbered running the next step; this preserves
            // and carries over any state from the prior step
            yadda.run(step, {ctx: scenarioContext}, done);
        });
    };
};

module.exports = {
    feature: featureFactory,
    scenario: scenarioFactory
};

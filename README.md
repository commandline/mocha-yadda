# mocha-yadda
Module to integrate yadda with mocha for both browser and node.js tests. The yadda project includes in its docs and examples a little bit of glue code to accomplish this integration. This package tries to build on and improve that, offering some conveniences for testing in different environments like loading Gherkin files from a Karma instance or the local file system when running directly with Mocha.

To use, create a test source that Mocha will find and execute of the form:
```
var fdescribe = require('mocha-yadda').fdescribe;

fdescribe('path/to/featurefile.feature', [array, of, step, libraries]);
```

fdescribe also accepts an options object.
* timeout: override the default timeout for tests set by Mocha on a per feature basis.
* ctx: feature wide context, for instance to share some stubs or other necessary info or resources
* beforeFeature/afterFeature: hooks that will run before/after the feature, will bind to the ctx object in provided
* beforeScenario/afterScenario: hooks that will run before/after each scenario, will bind to the ctx object in provided

fdescribe supports .only and .skip, like mocha, though .only doesn't interact with any plain Mocha tests. .only will limit execution among a group of mocha-yadda features so it best used with mocha's ability to limit test by files or regexes to limit to just yadda based tests.

For now, mocha-yadda intentionally only supports describing a single feature at a time rather than using yadda's search capabilities. fdescribe can be called multiple times in your bootstrap test to group some or all of your features together.

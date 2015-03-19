# NodeJS wrapper for Shippable API

Makes it easier to call the Shippable API from NodeJS apps.

## Quick start
````
var Shippable = require('shippable.js');

var api = new Shippable('https://api.shippable.com', myMachineToken);
api.getProject(myProjectId, function(err, project) {
    if (project.autoBuild) {
      project.build();
    }
});
````

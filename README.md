Fuji Mansion App
================


Following installations are required for testing:

npm install jasmine-core karma karma-chrome-launcher karma-coverage karma-jasmine remap-istanbul --save-dev

jasmine-core: Our testing framework.
karma: Our test runner.
karma-chrome-launcher: To launch Google Chrome from Karma.
karma-coverage: To create Coverage reports.
karma-jasmine: Karma adapter for Jasmine framework.
remap-istanbul: To map our coverage in JS files to TypeScript files.

Required for karma init command:
sudo npm install -g karma-cli

typings install jasmine --save-dev --ambient

-Setup protractor for .e2e tests 
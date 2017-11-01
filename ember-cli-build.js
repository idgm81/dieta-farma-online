/* eslint-env node */
const EmberApp = require('ember-cli/lib/broccoli/ember-app');
var funnel = require('ember-cli/node_modules/broccoli-funnel');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    sourcemaps: {
      enabled: true
    },
    minifyJS: {
      enabled: false
    },
    minifyCSS: {
      enabled: false
    },
    fingerprint: {
      enabled: false
    },
    // Add options here
    sassOptions: {
      includePaths: [
        'bower_components/bootstrap-sass/assets/stylesheets'
      ]
    }
  });

  app.import({
    development: 'bower_components/font-awesome/css/font-awesome.css',
    production: 'bower_components/font-awesome/css/font-awesome.min.css'
  });

  app.import({
    development: 'bower_components/bootstrap-sass/assets/javascripts/bootstrap.js',
    production: 'bower_components/bootstrap-sass/assets/javascripts/bootstrap.min.js'
  });

  app.import({
    development: 'bower_components/jquery-backstretch/jquery.backstretch.js',
    production: 'bower_components/jquery-backstretch/jquery.backstretch.min.js'
  });

  var fontFiles = new funnel('bower_components/font-awesome/fonts', {
    srcDir: '/',
    destDir: 'fonts'
  });

  module.exports = fontFiles;

  return app.toTree(fontFiles);

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.
};

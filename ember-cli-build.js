/* eslint-env node */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');
var Funnel = require('broccoli-funnel');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    svg: {
      paths: [
        'public/assets/images',
        'app/svgs'
      ]
    },
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
        'node_modules/bootstrap-sass/assets/stylesheets'
      ]
    }
  });

  app.import({
    development: 'node_modules/font-awesome/css/font-awesome.css',
    production: 'node_modules/font-awesome/css/font-awesome.min.css'
  });

  app.import({
    development: 'node_modules/bootstrap-sass/assets/javascripts/bootstrap.js',
    production: 'node_modules/bootstrap-sass/assets/javascripts/bootstrap.min.js'
  });

  app.import({
    development: 'node_modules/moment/moment.js',
    production: 'node_modules/moment/min/moment.min.js'
  });

  app.import({
    development: 'node_modules/bootstrap-datepicker/js/bootstrap-datepicker.js',
    production: 'node_modules/bootstrap-datepicker/js/bootstrap-datepicker.js'
  });

  app.import({
    development: 'node_modules/bootstrap-validator/dist/validator.js',
    production: 'node_modules/bootstrap-validator/dist/validator.min.js'
  });

  app.import({
    development: 'node_modules/jquery-backstretch/jquery.backstretch.js',
    production: 'node_modules/jquery-backstretch/jquery.backstretch.min.js'
  });

  var fontFiles = new Funnel('node_modules/font-awesome/fonts', {
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

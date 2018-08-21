/* eslint-env node */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
		'ember-cli-babel': {
			includePolyfill: true
    },
    fontawesome: {
      icons: {
        'free-solid-svg-icons': 'all',
        'free-regular-svg-icons': 'all',
        'free-brands-svg-icons': 'all'
      }
    },
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
      enabled: true
    },
    minifyCSS: {
      enabled: true
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
    development: 'node_modules/bootstrap-datepicker/dist/css/bootstrap-datepicker3.css',
    production: 'node_modules/bootstrap-datepicker/dist/css/bootstrap-datepicker3.min.css'
  });

  app.import({
    development: 'node_modules/croppie/croppie.css',
    production: 'node_modules/croppie/croppie.css'
  });

  app.import({
    development: 'node_modules/bootstrap-sass/assets/javascripts/bootstrap.js',
    production: 'node_modules/bootstrap-sass/assets/javascripts/bootstrap.min.js'
  });

  app.import({
    development: 'node_modules/bootstrap-datepicker/dist/js/bootstrap-datepicker.js',
    production: 'node_modules/bootstrap-datepicker/dist/js/bootstrap-datepicker.min.js'
  });

  app.import('node_modules/bootstrap-datepicker/dist/locales/bootstrap-datepicker.es.min.js');

  app.import({
    development: 'node_modules/bootstrap-validator/dist/validator.js',
    production: 'node_modules/bootstrap-validator/dist/validator.min.js'
  });

  app.import({
    development: 'node_modules/jquery-backstretch/jquery.backstretch.js',
    production: 'node_modules/jquery-backstretch/jquery.backstretch.min.js'
  });

  app.import({
    development: 'node_modules/croppie/croppie.js',
    production: 'node_modules/croppie/croppie.min.js'
  });

  return app.toTree();

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

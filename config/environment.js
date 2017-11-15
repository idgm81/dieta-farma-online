/* eslint-env node */

module.exports = function(environment) {
  var HOST = environment === 'production' ? 'https://dieta-farma-api.herokuapp.com:4500/' : 'http://localhost:4500';
  var ENV = {
    modulePrefix: 'dieta-farma-online',
    podModulePrefix: 'dieta-farma-online/pods',
    environment: environment,
    rootURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
      API_HOST: HOST
    },
    contentSecurityPolicy: {
      'default-src': "'none'",
      'script-src': "'self' 'unsafe-inline' 'unsafe-eval'",
      'font-src': "'self'",
      'connect-src': "'self' http://localhost:4500 https://dieta-farma-api.herokuapp.com:4500/",
      'img-src': "'self'",
      'report-uri':"'localhost'",
      'style-src': "'self' 'unsafe-inline'",
      'frame-src': "'none'"
    }
  };

  ENV['ember-simple-auth'] = {
    authorizer: 'authorizer:jwt',
    routeAfterAuthentication: 'home'
  };


  ENV['ember-simple-auth-token'] = {
    serverTokenEndpoint: `${HOST}/api/auth/user`,
    tokenPropertyName: 'token',
    identificationField: 'email',
    passwordField: 'password',
    refreshAccessTokens: false,
    authorizationPrefix: 'JWT ',
    refreshTokenPropertyName: 'refresh_token',
    refreshLeeway: 300, // Refresh the token 5 minutes (300s) before it expires.,
    serverTokenRefreshEndpoint: `${HOST}/api/auth/refresh_token`,
    tokenExpireName: 'exp'
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {}

  return ENV;
};

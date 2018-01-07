/* eslint-env node */

module.exports = function(environment) {
  const HOST = environment === 'production'
    ? 'https://dieta-farma-api.herokuapp.com'
    : 'http://localhost:4500';
  const ENV = {
    modulePrefix: 'dieta-farma-online',
    podModulePrefix: 'dieta-farma-online/pods',
    environment: environment,
    i18n: {
      defaultLocale: 'es'
    },
    moment: {
      includeLocales: ['es']
    },
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
      'connect-src': "'self' 'localhost' 'dieta-farma-api.herokuapp.com' 's3.eu-west-3.amazonaws.com'",
      'img-src': "'self'",
      'report-uri':"'localhost'",
      'style-src': "'self' 'unsafe-inline'",
      'frame-src': "'none'"
    },
    moment: {
      includeLocales: ['es']
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
    refreshLeeway: 120, // Refresh the token 2 minutes (120s) before it expires
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

  if (environment === 'production') {
    ENV.manifest = {
			enabled: true,
			appcacheFile: '/manifest.appcache',
			includePaths: [
				'assets/vendor/app.min.css'
			],
			excludePaths: [
				'index.html',
				'manifest.webapp',
				'robots.txt',
				'manifest.json',
				'crossdomain.xml',
				'assets/res/**/*',
				new RegExp(/.\.svg$/)
			],
			network: ['*'],
			showCreateDate: true
		};
  }

  return ENV;
};

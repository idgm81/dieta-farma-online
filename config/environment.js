/* eslint-env node */

module.exports = function(environment) {
  const API_HOST = environment === 'production'
    ? 'https://dieta-farma-api.herokuapp.com'
    : 'http://localhost:4500';
  const ENV = {
    modulePrefix: 'dieta-farma-online',
    podModulePrefix: 'dieta-farma-online/pods',
    environment: environment,
    bootstrapDatepicker: {
      includeLocales: [ 'es' ]
    },
    fontawesome: {
      icons: {
        'free-solid-svg-icons': 'all',
        'free-regular-svg-icons': 'all',
        'free-brands-svg-icons': 'all'
      }
    },
    i18n: {
      defaultLocale: 'es'
    },
    moment: {
      includeLocales: ['es']
    },
    rootURL: '',
    stripe: {
      lazyLoad: true
    },
    locationType: 'hash',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. EMBER_NATIVE_DECORATOR_SUPPORT: true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
      API_HOST,
      version: environment === 'production'
        ? `${process.env.MAJOR_VERSION}.${process.env.MINOR_VERSION}`
        : `X.X`
    },
    contentSecurityPolicy: {
      'default-src': "'none' 'gap://ready'",
      'script-src': "'self' 'unsafe-inline' 'unsafe-eval'",
      'font-src': "'self'",
      'connect-src': "'self' 'localhost' '*.dietafarma.es' 'dieta-farma-api.herokuapp.com' 's3.eu-west-3.amazonaws.com'",
      'img-src': "'self'",
      'report-uri':"'localhost'",
      'style-src': "'self' 'unsafe-inline'",
      'frame-src': "'none'"
    }
  };

  ENV['ember-simple-auth-token'] = {
    serverTokenEndpoint: `${API_HOST}/api/auth/user`,
    tokenPropertyName: 'token',
    identificationField: 'email',
    passwordField: 'password',
    refreshAccessTokens: true,
    authorizationPrefix: 'JWT ',
    refreshTokenPropertyName: 'refreshToken',
    refreshLeeway: 60, // Refresh the token 1 minute before it expires
    serverTokenRefreshEndpoint: `${API_HOST}/api/auth/refreshToken`,
    tokenExpireName: 'exp'
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
    ENV['stripe'] = {
      publishableKey: 'pk_test_4JUWzeGkidllmepT1NL2dvG4'
    }
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
    ENV['stripe'] = {
      lazyLoad: true,
      publishableKey: process.env.STRIPE_PUBLISHABLE_KEY
    }
  }

  return ENV;
};

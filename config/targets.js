/* eslint-env node */

'use strict';

let browsers;

if (process.env.CORBER) {
  browsers = [`last 1 ${process.env.CORBER_PLATFORM} versions`];
} else {
  browsers = [
    'last 2 chrome versions',
    'last 2 firefox versions',
    'last 2 safari versions',
    'last 2 iOS versions',
    'last 2 edge versions'
  ];

  const isCI = !!process.env.CI;
  const isProduction = process.env.EMBER_ENV === 'production';

  if (isCI || isProduction) {
    browsers.push('ie 11');
  }
}

module.exports = {
  browsers
};

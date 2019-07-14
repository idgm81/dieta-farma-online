/* eslint-env node */
const browsers = [
  'last 3 chrome versions',
  'last 3 firefox versions',
  'last 2 safari versions',
  'last 3 iOS versions',
  'last 2 edge versions'
];
const isCI = !!process.env.CI;
const isProduction = process.env.EMBER_ENV === 'production';

if (isCI || isProduction) {
  browsers.push('ie 11');
}

module.exports = {
  browsers
};

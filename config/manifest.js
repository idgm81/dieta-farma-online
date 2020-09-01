/* eslint-env node */
'use strict';

module.exports = function(/* environment, appConfig */) {
  // See https://github.com/san650/ember-web-app#documentation for a list of
  // supported properties

  return {
    name: "Dietafarma Online",
    short_name: "Dietafarma",
    description: "Consigue tu dieta personalizada de forma online",
    start_url: "/",
    display: "standalone",
    background_color: "#0cb8b6",
    theme_color: "#0cb8b6",
    icons: [{
      src: "assets/images/touch/icon-60x60.png",
      sizes: "60x60",
      type: "image/png"
    }, {
      src: "assets/images/touch/icon-76x76.png",
      sizes: "76x76",
      type: "image/png"
    }, {
      src: "assets/images/touch/icon-120x120.png",
      sizes: "120x120",
      type: "image/png"
    }, {
      src: "assets/images/touch/icon-152x152.png",
      sizes: "152x152",
      type: "image/png"
    }, {
      src: "assets/images/touch/icon-180x180.png",
      sizes: "180x180",
      type: "image/png"
    }, {
      src: "assets/images/touch/apple-touch-icon.png",
      sizes: "180x180",
      type: "image/png",
      targets: ['apple']
    }],
    ms: {
      tileColor: '#2b5797'
    }
  };
}

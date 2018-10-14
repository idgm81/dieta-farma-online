/* eslint-env node */
'use strict';

module.exports = function(/* environment, appConfig */) {
  // See https://github.com/san650/ember-web-app#documentation for a list of
  // supported properties

  return {
    name: "dietaFarma Online",
    short_name: "dietaFarma Online",
    description: "Consigue tu dieta personalizada de forma online",
    start_url: "/",
    display: "standalone",
    background_color: "#0cb8b6",
    theme_color: "#0cb8b6",
    icons: [{
      src: "assets/images/touch/icon-128x128.png",
      sizes: "128x128",
      type: "image/png"
    }, {
      src: "assets/images/touch/icon-152x152.png",
      sizes: "152x152",
      type: "image/png"
    }, {
      src: "assets/images/touch/icon-144x144.png",
      sizes: "144x144",
      type: "image/png"
    }, {
      src: "assets/images/touch/icon-192x192.png",
      sizes: "192x192",
      type: "image/png"
    }, {
      src: "assets/images/touch/icon-384x384.png",
      sizes: "384x384",
      type: "image/png"
    }, {
      src: "assets/images/touch/icon-512x512.png",
      sizes: "512x512",
      type: "image/png"
    }, {
      src: "/images/icons/apple-touch-icon.png",
      sizes: "180x180",
      type: "image/png",
      targets: ['apple']
    }],
    ms: {
      tileColor: '#0cb8b6'
    }
  };
}

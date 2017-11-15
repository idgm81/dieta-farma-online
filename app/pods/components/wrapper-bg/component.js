import Ember from 'ember';

const { $, Component, on } = Ember;

export default Component.extend({
  // Configuration
  images: [],
  config: {},

  setupBackstretch: on('didInsertElement', function() {
    $.backstretch(
      this.get('images'),
      this.get('config')
    );
  }),

  teardownBackstretch: on('willDestroyElement', function() {
    $.backstretch('destroy');
  })
});

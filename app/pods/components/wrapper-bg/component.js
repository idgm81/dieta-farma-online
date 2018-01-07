import Ember from 'ember';
import { imagePath } from 'dieta-farma-online/helpers/image-path';

const { $, Component, on } = Ember;

export default Component.extend({
  // Configuration
  images: [],
  config: {},

  setupBackstretch: on('didInsertElement', function() {
    $.backstretch(
      imagePath(this.get('images')),
      this.get('config')
    );
  }),

  teardownBackstretch: on('willDestroyElement', function() {
    $.backstretch('destroy');
  })
});

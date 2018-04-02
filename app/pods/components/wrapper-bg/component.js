import $ from 'jquery';
import Component from '@ember/component';
import { on } from '@ember/object/evented';
import { imagePath } from 'dieta-farma-online/helpers/image-path';

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
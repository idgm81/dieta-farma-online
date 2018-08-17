import { set, get, computed } from '@ember/object';
import Component from '@ember/component';

export default Component.extend({

  file: null,

  fileName: computed('file', function() {
    return get(this, 'file.name');
  }),

  actions: {
    fileLoaded(file) {
      set(this, 'file', file);
      this.sendAction('onloaded');
    },

    deleteFile() {
      set(this, 'file', null);
    }
  }
});
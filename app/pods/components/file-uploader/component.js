import Ember from 'ember';

const { computed, get, set, Component } = Ember;

export default Component.extend({

  file: null,

  fileName: computed('file', function() {
    return get(this, 'file.name');
  }),

  actions: {
    fileLoaded(file) {
      set(this, 'file', file);

    },

    deleteFile() {
      set(this, 'file', null);
    }
  }
});

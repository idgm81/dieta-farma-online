import Ember from 'ember';

const { computed, get, set } = Ember;

export default Ember.Component.extend({

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

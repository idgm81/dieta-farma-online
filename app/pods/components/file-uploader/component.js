import Ember from 'ember';
const { inject: { service }, get, set } = Ember;

export default Ember.Component.extend({

  actions: {
    fileLoaded: function(file) {
      set(this, 'file', file);
    }
  }
});

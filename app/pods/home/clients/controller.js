import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    showUserProfile(id) {
      this.transitionTo('home.clients.client', id);
    }
  }
});

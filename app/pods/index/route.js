import Ember from 'ember';

export default Ember.Route.extend({

  actions: {
    goToLogin() {
      this.transitionTo('login');
    },

    goToRegister() {
      this.transitionTo('register');
    }
  }
});

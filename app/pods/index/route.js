import Ember from 'ember';
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';

export default Ember.Route.extend(UnauthenticatedRouteMixin, {

  actions: {
    goToLogin() {
      this.transitionTo('login');
    },

    goToRegister() {
      this.transitionTo('register');
    }
  }
});

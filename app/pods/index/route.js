import Route from '@ember/routing/route';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

export default Route.extend(ApplicationRouteMixin, {

  routeAfterAuthentication: 'home',

  actions: {
    goToLogin() {
      this.transitionTo('login');
    },

    goToRegister() {
      this.transitionTo('register');
    }
  }
});

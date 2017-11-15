import Ember from 'ember';
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, UnauthenticatedRouteMixin, {

  session: Ember.inject.service(),

  routeAfterAuthentication: 'home',

  api: Ember.inject.service('api'),

  // clear a potentially stale error message from previous login attempts
  setupController(controller, model) {
      this._super(...arguments);

      controller.set('error', false);
  },

  actions: {
    authenticate(credentials) {
      Ember.$('button').hide();
      Ember.$('div.loading-container').show();

      const authenticator = 'authenticator:jwt';
      this.get('session').authenticate(authenticator, {
        identification: credentials.email,
        password: credentials.password
      }).catch((reason) => {
        Ember.$('div.loading-container').hide();
        Ember.$('button').show();
        this.set('controller.error', true);
      });
    }
  }
});

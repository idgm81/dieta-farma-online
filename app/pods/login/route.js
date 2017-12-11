import Ember from 'ember';
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

const { Route, inject: { service }, $} = Ember

export default Route.extend(ApplicationRouteMixin, UnauthenticatedRouteMixin, {

  session: service(),

  routeAfterAuthentication: 'home',

  // clear a potentially stale error message from previous login attempts
  setupController(controller) {
      this._super(...arguments);

      controller.set('error', false);
  },

  actions: {
    authenticate(credentials) {
      $('button').hide();
      $('div.loading-container').show();

      const authenticator = 'authenticator:jwt';
      this.get('session').authenticate(authenticator, {
        identification: credentials.email,
        password: credentials.password
      }).catch((reason) => {
        debugger
        $('div.loading-container').hide();
        $('button').show();
        this.set('controller.error', true);
      });
    }
  }
});

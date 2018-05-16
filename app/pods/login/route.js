import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import $ from 'jquery';
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';

export default Route.extend(UnauthenticatedRouteMixin, {

  i18n: service(),

  session: service(),

  // clear a potentially stale error message from previous login attempts
  setupController(controller) {
      this._super(...arguments);

      controller.set('error', false);
  },

  actions: {
    authenticate(credentials) {
      $('button').hide();
      $('#modal-login').modal();

      const authenticator = 'authenticator:jwt';
      this.get('session').authenticate(authenticator, {
        identification: credentials.email,
        password: credentials.password
      })
      .then(() => this.transitionTo('home'))
      .catch(({error}) => {
        $('button').show();
        this.set('controller.error', error || this.get('i18n').t('error.generic'));
      })
      .finally(() => $('#modal-login').modal('hide'));
    },
    goToResetPassword() {
      this.transitionTo('reset-password');
    }
  }
});
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import $ from 'jquery';
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';

export default Route.extend(UnauthenticatedRouteMixin, {

  i18n: service(),

  session: service(),

  routeIfAlreadyAuthenticated: 'home',

  actions: {
    authenticate(credentials) {
      $('button').hide();
      $('#modal-login').modal();

      const authenticator = 'authenticator:jwt';
      this.get('session').authenticate(authenticator, {
        email: credentials.email,
        password: credentials.password
      }).catch(({error}) => {
        $('button').show();
        this.set('controller.error', error || this.get('i18n').t('error.generic'));
        $('#modal-login-ko').modal();
      }).finally(() => $('#modal-login').modal('hide'));
    },

    goToResetPassword() {
      this.transitionTo('reset-password');
    }
  }
});
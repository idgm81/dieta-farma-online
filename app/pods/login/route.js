import Ember from 'ember';
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';

const { Route, inject: { service }, $} = Ember;

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
      }).catch(({error}) => {
        $('#modal-login').modal('hide');
        $('button').show();
        this.set('controller.error', error.msg || this.get('i18n').t('error.generic'));
      });
    },
    resetPassword() {

    }
  }
});

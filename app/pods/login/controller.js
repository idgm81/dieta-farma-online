import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { get }  from '@ember/object';
import $ from 'jquery';

export default Controller.extend({

  i18n: service(),

  session: service(),

  error: '',

  actions: {
    authenticate(credentials) {
      $('button').hide();
      $('#modal-login').modal();

      const authenticator = 'authenticator:jwt';
      const email = credentials.email && credentials.email.toLowerCase();
      const password = credentials.password;

      return this.get('session').authenticate(authenticator, { email, password })
        .catch((error) => {
          $('button').show();
          this.set('error', get(error, 'json.error') || get(this, 'i18n').t('error.generic'));
          $('#modal-login').modal('hide');
          $('#modal-login-ko').modal();
        });
    },

    goToResetPassword() {
      this.transitionToRoute('reset-password');
    }
  }
});

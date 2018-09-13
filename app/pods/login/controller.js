import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
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
      this.get('session').authenticate(authenticator, {
        email: credentials.email,
        password: credentials.password
      }).catch(({error}) => {
        $('button').show();
        this.set('error', error || this.get('i18n').t('error.generic'));
        $('#modal-login-ko').modal();
      });
    },

    goToResetPassword() {
      this.transitionToRoute('reset-password');
    }
  }
});

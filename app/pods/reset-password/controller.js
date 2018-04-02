import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import $ from 'jquery';

export default Controller.extend({

  api: service(),

  actions: {

    check(email) {
      $('#modal-check-email').modal();

      this.get('api').checkEmail(email).then(() => {
        $('#modal-check-email-ok').modal();
      }).catch(() => {
        $('#modal-check-email-ko').modal();
      }).finally(() => {
        $('#modal-check-email').modal('hide');
      });
    },

    goToLogin() {
      this.replaceRoute('login');
    }
  }
})
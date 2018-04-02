import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import $ from 'jquery';

export default Controller.extend({

  i18n: service(),

  api: service(),

  queryParams: ['token'],

  token: null,

  password: '',

  actions: {
    changePass() {
      $('button').hide();
      $('#modal-change-pass').modal();

      const data = {
        token: this.get('token'), 
        password: this.get('password')
      };
      this.get('api').modifyPassword(data).then(() => {
        $('#modal-change-pass-ok').modal();
      }).catch(() => {
        $('#modal-change-pass-ko').modal();
        $('button').show();
      }).finally(() => {
        $('#modal-change-pass').modal('hide');
      });
    },

    goToLogin() {
      this.replaceRoute('login');
    }
  }
});
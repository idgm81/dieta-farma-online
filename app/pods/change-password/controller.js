import Ember from 'ember';

const { Controller, inject: { service }, $} = Ember;

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

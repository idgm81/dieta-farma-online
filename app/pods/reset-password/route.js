import Ember from 'ember';
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';

const { Route, inject: { service }, $} = Ember;

export default Route.extend(UnauthenticatedRouteMixin, {

  api: service(),

  actions: {
    check(email) {
      $('button').hide();
      $('#modal-check-email').modal();

      this.get('api').checkEmail(email).then(() => {
        $('#modal-check-email-ok').modal();
      }).catch(() => {
        $('#modal-check-email-ko').modal();
        $('button').show();
      }).finally(() => {
        $('#modal-check-email').modal('hide');
      });
    },

    goToLogin() {
      this.replaceWith('login');
    }
  }
});

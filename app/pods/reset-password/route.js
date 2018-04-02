import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import $ from 'jquery';
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';

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
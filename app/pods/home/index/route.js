import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { isPresent } from '@ember/utils';
import { get } from '@ember/object';
import RSVP from 'rsvp';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import moment from 'moment';

export default Route.extend(AuthenticatedRouteMixin, {

  api: service(),

  session: service(),

  model(params, transition) {
    const userId = transition.queryParams.userId || this.get('session.data.authenticated.id');

    return RSVP.hash({
      diets: this.get('api').getDiets(userId),
      appointments: this.get('api').getAppointments(userId)
    });
  },

  setupController(controller, model) {
    this._super(...arguments);

    controller.set('isNutritionist', this.get('session.data.authenticated.role') === 'N');
    controller.set('hasAppointments', isPresent(get(model, 'appointments.items').filter((item) => (0 <= moment(item.date).diff(moment(), 'days') <= 7))));
  },

  actions: {
    refreshHome() {
      this.refresh();
    },
    open(url) {
      window.open(url);
    },
    delete(id) {
      $('#modal-wait-delete-appointment').modal();

      return this.get('api').deleteAppointment(id)
        .then(() => $('#modal-delete-appointment-ok').modal())
        .catch(() => $('#modal-delete-appointment-error').modal())
        .finally(() => {
          $('#modal-wait-delete-appointment').modal('hide');
        })
    }
  }
});
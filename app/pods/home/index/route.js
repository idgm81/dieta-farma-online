import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const { Route, inject: { service }, RSVP } = Ember;

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
  },

  actions: {
    delete(id) {
      $('#modal-wait-appointment').modal();

      return this.get('api').deleteAppointment(id)
        .then(() => $('#modal-delete-appointment-ok').modal())
        .catch(() => $('#modal-delete-appointment-error').modal())
        .finally(() => {
          $('#modal-wait-message').modal('hide');
        })
    }
  }
});

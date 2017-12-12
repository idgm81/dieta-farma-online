import Ember from 'ember';
import moment from 'moment';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const { Route, RSVP, inject: { service }, get } = Ember;

export default Route.extend(AuthenticatedRouteMixin, {

  api: service(),

  session: service(),

  model(params) {
    return this.get('api').getAppointments(params.id);
  },

  setupController(controller, model) {
    const appointments = get(model, 'appointments');
    let meetDays = [];

    appointments.forEach((a) => meetDays.push(a.date));
    controller.set('appointments', appointments);
    controller.set('meetDays', meetDays);
    controller.set('now', moment().format('YYYY-MM-DD'));
  },

  actions: {}
});

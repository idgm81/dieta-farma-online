import Ember from 'ember';
import moment from 'moment';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const { Route, inject: { service }, get } = Ember;

export default Route.extend(AuthenticatedRouteMixin, {

  api: service(),

  session: service(),

  moment: service(),

  beforeModel() {
    this.get('moment').setLocale('es');
  },

  model() {
    const userId = get(this, 'session.data.authenticated.id');

    return this.get('api').getAppointments(userId);
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

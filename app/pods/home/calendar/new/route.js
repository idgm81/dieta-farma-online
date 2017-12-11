import Ember from 'ember';
import moment from 'moment';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const { Route, RSVP, inject: { service }, get } = Ember;

export default Route.extend(AuthenticatedRouteMixin, {

  api: service(),

  model() {
    return this.get('api').getAppointments();
  },

  setupController(controller, model) {
    const appointments = get(model, 'appointments');
    let meetDays = [];

    appointments.forEach((a) => meetDays.push(a.date));
    controller.set('appointments', appointments);
    controller.set('meetDays', meetDays);
    controller.set('now', moment().format('YYYY-MM-DD'));
    controller.set('selectedDate', moment().add(1, 'days').format('YYYY-MM-DD'));
  },

  actions: {
    cancel() {
      this.replaceWith('home')
    },
    save(data) {
      this.get('api').createAppointment(data).then((response) => {

      });
    }
  }
});

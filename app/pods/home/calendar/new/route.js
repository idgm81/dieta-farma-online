import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const { Route, inject: { service }, get } = Ember;

export default Route.extend(AuthenticatedRouteMixin, {

  api: service(),

  session: service(),

  model() {
    return this.get('api').getAvailableDates(get(this, 'session.data.authenticated.id'));
  },

  setupController(controller, model) {
    const appointments = get(model, 'appointments');
    const dayOptions = appointments.map((appointments) => appointments.day);
    controller.set('typeOptions', ['Presencial', 'Skype']);
    controller.set('bookType', 'Presencial');
    controller.set('dayOptions', dayOptions);
    controller.set('bookDay', dayOptions[0]);
    controller.set('hourOptions', appointments[0].hours);
    controller.set('bookHour', appointments[0].hours[0]);
  }
});

import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { get } from '@ember/object';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Route.extend(AuthenticatedRouteMixin, {

  api: service(),

  session: service(),

  model() {
    return this.get('api').getAvailableDates(get(this, 'session.data.authenticated.id'));
  },

  setupController(controller, model) {
    const appointments = get(model, 'items');
    const dayOptions = appointments.map((appointments) => appointments.day);
    controller.set('typeOptions', ['Presencial', 'Skype']);
    controller.set('bookType', 'Presencial');
    controller.set('dayOptions', dayOptions);
    controller.set('bookDay', dayOptions[0]);
    controller.set('hourOptions', appointments[0].hours);
    controller.set('bookHour', appointments[0].hours[0]);
    controller.set('calendar', appointments);
  }
});
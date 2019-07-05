import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { get } from '@ember/object';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Route.extend(AuthenticatedRouteMixin, {

  api: service(),

  session: service(),

  i18n: service(),

  model() {
    return this.get('api').getAvailableDates(get(this, 'session.data.authenticated.id'));
  },

  setupController(controller, model) {
    this._super(...arguments);

    const i18n = this.get('i18n');
    const calendar = get(model, 'calendar');
    const dayOptions = calendar.map((appointments) => appointments.day);
    const typeOptions = [i18n.t('label.meet.face.paid'), i18n.t('label.meet.video')];

    controller.setProperties({
      typeOptions,
      bookType: typeOptions[0],
      dayOptions,
      bookDay: dayOptions[0],
      hourOptions: calendar[0].hours,
      bookHour: calendar[0].hours[0],
      calendar
    });
  }
});
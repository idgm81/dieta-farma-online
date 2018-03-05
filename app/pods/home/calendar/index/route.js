import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const { Route, inject: { service }, get } = Ember;

export default Route.extend(AuthenticatedRouteMixin, {

  api: service(),

  session: service(),

  model() {
    const userId = get(this, 'session.data.authenticated.id');

    return this.get('api').getAppointments(userId);
  },

  setupController(controller, model) {
    const appointments = get(model, 'items');
    controller.set('appointments', appointments);
  }
});

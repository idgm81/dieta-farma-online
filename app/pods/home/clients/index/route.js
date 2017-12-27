import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import { USER_ROLES } from '../../constants';

const { Route, inject: { service }, get } = Ember;

export default Route.extend(AuthenticatedRouteMixin, {

  api: service(),

  model() {
    return this.get('api').getUsers(USER_ROLES.CLIENT)
  },

  setupController(controller, model) {
    const usersArray = get(model, 'users');
    const clientsGroup = usersArray.map((e,i) => (i % 4 === 0) && usersArray.slice(i, i + 4)).filter((e) => e)

    controller.set('clients', clientsGroup);
  },

  actions: {
    showUser(id) {
      this.transitionTo('home.clients.client', id)
    },

    showMessages() {
      this.transitionTo('home.messages')
    }
  }
});
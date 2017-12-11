import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import { USER_ROLES } from '../../constants';

const { Route, inject: { service }, get, isEmpty } = Ember;

export default Route.extend(AuthenticatedRouteMixin, {

  api: service(),

  session: service(),

  model(params) {
    const parentController = this.modelFor('home.diets.index');

    if (isEmpty(parentController)) {
      return this.get('api').getDiets().then(({ diets }) => diets.findBy('_id', params.id));
    }

    return get(parentController, 'diets').findBy('_id', params.id);
  },

  setupController(controller, model) {
    this._super(...arguments);

    controller.set('isNutritionist', this.get('session.data.authenticated.role') === USER_ROLES.NUTRITIONIST);
  },

  actions: {
    delete(id) {
      this.get('api').deleteDiet(id).then(() => this.replaceWith('home.clients.index'));
    },
    edit(id) {
      this.transitionTo('home.diets.edit', id);
    }
  }
});

import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const { Route, inject: { service }, get } = Ember;

export default Route.extend(AuthenticatedRouteMixin, {

  api: service(),

  model(params) {
    const parentController = this.modelFor('home.diets.index');

    return get(parentController, 'diets').findBy('id', params.id);
  },

  actions: {
    delete(id) {
      this.get('api').deleteDiet(id);
    },
    edit(id) {
      this.transitionTo('home.diets.edit', id);
    }
  }
});

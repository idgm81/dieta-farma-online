import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const { Route, inject: { service }, get } = Ember;

export default Route.extend(AuthenticatedRouteMixin, {

  api: service(),

  model(params) {
    return this.get('api').getUser(params.id);
  },

  actions: {
    showDiets(userId) {
      const queryParams = { userId };

      this.transitionTo('home.diets.index', { queryParams });
    },

    addDiet(userId) {
      const queryParams = { userId };

      this.transitionTo('home.diets.new', { queryParams });
    }
  }
});

import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const { Route, RSVP, inject: { service }, get } = Ember;

export default Route.extend(AuthenticatedRouteMixin, {

  api: service(),

  session: service(),

  model(params, transition) {
    const queryParams = transition.queryParams;

    return this.get('api').getDiets(queryParams.userId);
  },

  actions: {
    show(id) {
      this.transitionTo('home.diets.diet', id);
    }
  }
});

import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const { Route, RSVP, inject: { service }, get } = Ember;

export default Route.extend(AuthenticatedRouteMixin, {

  api: service(),

  session: service(),

  model() {
    return this.get('api').getDiets();
  },

  actions: {
    viewDetails(id) {
      this.transitionTo('home.diets.diet', id);
    }
  }
});

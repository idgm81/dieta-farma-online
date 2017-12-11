import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const { Route, inject: { service } } = Ember;
export default Route.extend(AuthenticatedRouteMixin, {

  api: service(),

  model(params) {
    return this.get('api').getUser(params.id);
  },

  actions: {
    showDiets() {
      this.transitionTo('home.diets');
    },
    edit(id) {
      this.transitionTo('home.profile.edit', id);
    }
  }
});

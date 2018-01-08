import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const { Route, inject: { service } } = Ember;
export default Route.extend(AuthenticatedRouteMixin, {

  session: service(),

  api: service(),

  model(params) {
    return this.get('api').getUser(params.id);
  },

  actions: {
    delete(id) {
      this.get('api').deleteUser(id).then(() => this.get('session').invalidate())
    },
    edit(id) {
      this.transitionTo('home.profile.edit', id);
    },
    showDiets() {
      this.transitionTo('home.diets');
    },
  }
});

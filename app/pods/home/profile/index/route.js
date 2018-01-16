import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const { Route, inject: { service } } = Ember;
export default Route.extend(AuthenticatedRouteMixin, {

  session: service(),

  api: service(),

  model() {
    return this.get('api').getUser(this.get('session.data.authenticated.id'));
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

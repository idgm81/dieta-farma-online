import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {

  model() {
    const id = this.get('session.data.authenticated.id');

    return this.store.findRecord('user', id);
  },

  actions: {}
});

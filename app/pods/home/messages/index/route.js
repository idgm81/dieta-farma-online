import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const { Route, inject: { service } } = Ember;

export default Route.extend(AuthenticatedRouteMixin, {

  api: service(),

  session: service(),

  model(params, transition) {
    const userId = this.get('session.data.authenticated.id');

    return this.get('api').getMessages(userId);
  },

  actions: {
    new() {
      const queryParams = { from: this.get('session.data.authenticated.id') }
      this.transitionTo('home.messages.new', { queryParams });
    }
  }
});

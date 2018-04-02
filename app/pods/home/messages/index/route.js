import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

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
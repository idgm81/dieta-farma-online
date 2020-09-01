import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Route.extend(AuthenticatedRouteMixin, {

  api: service(),

  session: service(),

  queryParams: {
    userId: {
      refreshModel: true
    },
    name: {
      refreshModel: true
    }
  },

  model(_, transition) {
    const userId = transition.to.queryParams.userId || this.get('session.data.authenticated.id');

    return this.get('api').getDiets(userId);
  }
});
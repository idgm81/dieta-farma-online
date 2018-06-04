import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import { inject as service } from '@ember/service';

export default Route.extend(AuthenticatedRouteMixin, {

  api: service(),

  queryParams: {
    userId: {
      refreshModel: true
    }
  },

  model(params, transition) {
    return this.get('api').editUser(params.userId, { isPremium: true })
      .catch(() => this.transitionTo('premium.error'));
  }
});
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Route.extend(AuthenticatedRouteMixin, {
  stripe: service('stripev3'),

  queryParams: {
    type: {
      refreshModel: true
    }
  },

  beforeModel(transition) {
    this._super(...arguments);

    this.get('stripe').load();

    return transition;
  }
});

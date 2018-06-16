import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import { inject as service } from '@ember/service';
import moment from 'moment';
import { DIET_PRICES } from '../constants';

export default Route.extend(AuthenticatedRouteMixin, {

  api: service(),

  queryParams: {
    userId: {
      refreshModel: true
    },
    type: {
      refreshModel: true
    }
  },

  model(params, transition) {
    const data = {
      customer: params.userId,
      date: moment().format(),
      type: params.type,
      price: DIET_PRICES[params.type],
    }
    return this.get('api').createPurchase(data)
      .catch(() => this.transitionTo('premium.error'));
  }
});
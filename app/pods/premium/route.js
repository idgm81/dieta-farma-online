import Route from '@ember/routing/route';
import { reads }  from '@ember/object/computed';
import { inject as service } from '@ember/service';

export default Route.extend({

  session: service(),

  userId: reads('session.data.authenticated.id'),

  actions: {
    buy(price) {
      this.transitionTo('payment', { queryParams: { price } });
    }
  }
});

import Controller from '@ember/controller';
import { computed }  from '@ember/object';
import { get } from '@ember/object';
import { DIET_PRICES } from '../constants';

export default Controller.extend({

  DIET_PRICES,

  price: computed('type', function() {
    return DIET_PRICES[get(this, 'type')]*100;
  }),

  actions: {
    next(type) {
      const queryParams = {
        type
      };

      return this.transitionToRoute(`home.premium-services.${type === 'O' ? 'questions' : 'schedule'}`, { queryParams });
    }
  }
});

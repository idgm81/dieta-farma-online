import Controller from '@ember/controller';
import { computed }  from '@ember/object';
import { get } from '@ember/object';
import { DIET_PRICES } from '../constants';

export default Controller.extend({

  DIET_PRICES,

  price: computed('type', function() {
    return DIET_PRICES[get(this, 'type')]*100;
  }),

  data: {
    type: '',
    email: '',
    profile: {
      level: 0,
      credits: 0
    }
  },

  setup(model) {
    this.set('data.type', 'O');
    this.set('data.email', get(model, 'user.email'));
    this.set('data.profile.level', get(model, 'user.profile.level'));
    this.set('data.profile.credits', get(model, 'user.profile.credits'));
  },

  actions: {
    next(type) {
      this.set('data.type', type);

      return this.transitionToRoute(`home.premium-services.${type === 'O' ? 'questions' : 'schedule'}`);
    }
  }
});

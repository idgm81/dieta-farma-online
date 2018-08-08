
import Controller from '@ember/controller';
import { computed }  from '@ember/object';
import { get }  from '@ember/object';
import { inject as service } from '@ember/service';
import { DIET_PRICES } from '../constants';

export default Controller.extend({

  session: service(),

  stripev3: service(),

  api: service(),

  queryParams: ['type'],

  userId: computed.reads('session.data.authenticated.id'),

  email: computed.reads('model.user.email'),

  credits: computed.alias('model.user.profile.credits'),

  isCompleted: false,

  hasCredits: false,

  isError: false,

  isLoading: false,

  amount: computed('type', 'credits', function () {
    const credits = get(this, 'credits');

    return (DIET_PRICES[get(this, 'type')] - credits * 15)
  }),

  stripeOptions: {
    hidePostalCode: true,
    style: {
      base: {
        color: 'grey',
        fontWeight: 500,
        fontSize: '14px',
        fontSmoothing: 'antialiased',
        '::placeholder': {
          color: 'grey',
        },
        ':-webkit-autofill': {
          color: 'grey',
        },
      },

      invalid: {
        color: '#E25950',
        '::placeholder': {
          color: 'blue',
        },
      }
    }
  },

  setup() {
    let credits = get(this, 'credits');
    const type = get(this, 'type');
    const userId = get(this, 'userId');    

    if (type === 'O') {
      if (credits >= 1) {
        this.set('isCompleted', true);
        this.set('hasCredits', true);
        credits = this.decrementProperty('credits', 1);

        return this.get('api').editUser(userId, { profile: { credits } });
      }

    }

    if (type === 'V') {
      if (credits >= 2) {
        this.set('isCompleted', true);
        this.set('hasCredits', true);
        credits = this.decrementProperty('credits', 2);

        return this.get('api').editUser(userId, { profile: { credits } });
      }
    }

    if (type === 'P') {
      if (credits >= 3) {
        this.set('isCompleted', true);
        this.set('hasCredits', true);

        credits = this.decrementProperty('credits', 3);

        return this.get('api').editUser(userId, { profile: { credits } });
      }
    }
  },

  actions: {
    cancel() {
      this.replaceRoute('home');
    },

    /**
     * Receives a Stripe token after checkout succeeds
     * The token looks like this https://stripe.com/docs/api#tokens
     */
    pay(stripeElement) {
      let stripe = get(this, 'stripev3');
      stripe.createToken(stripeElement).then(({token}) => {
        const purchase = {
          customer: this.get('userId'),
          email: this.get('email'),
          amount: this.get('amount'),
          token
        };

        this.set('loading', true);

        this.get('api').createPurchase(purchase)
          .then(() => {
            this.set('isLoading', false);
            this.set('isCompleted', true);
          })
          .catch(() =>  {
            this.set('isLoading', false);
            this.set('isCompleted', true)
            this.set('isError', true);
          });
      });
    }
  }
});
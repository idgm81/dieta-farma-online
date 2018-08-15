
import Controller from '@ember/controller';
import { computed }  from '@ember/object';
import { get }  from '@ember/object';
import { inject as service } from '@ember/service';
import { inject as controller } from '@ember/controller';
import { DIET_PRICES } from '../constants';

const CREDITS_TYPES = {
  ['P']: 3,
  ['V']: 2,
  ['O']: 1
};

export default Controller.extend({

  session: service(),

  stripev3: service(),

  api: service(),

  premiumController: controller('home.premium-services.index'),

  userId: computed.reads('session.data.authenticated.id'),

  email: computed.reads('premiumController.data.email'),

  type: computed.reads('premiumController.data.type'),

  date: computed.reads('premiumController.data.date'),

  credits: computed.alias('premiumController.data.profile.credits'),

  isCompleted: false,

  hasCredits: false,

  isError: false,

  isLoading: false,

  amount: computed('type', 'credits', function () {
    return (DIET_PRICES[get(this, 'type')] - get(this, 'credits') * 15)
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

    if (type === 'O') {
      if (credits >= 1) {
        this.set('hasCredits', true);
      }
    }

    if (type === 'V') {
      if (credits >= 2) {
        this.set('hasCredits', true);
      }
    }

    if (type === 'P') {
      if (credits >= 3) {
        this.set('hasCredits', true);
      }
    }
  },

  actions: {
    cancel() {
      this.replaceRoute('home');
    },

    confirm() {
      this.set('isLoading', true);

      const type = get(this, 'type');
      const customer = get(this, 'userId');
      const appointment = {
        customer,
        type,
        date: get(this, 'date')
      };

      return this.get('api').createAppointment(appointment).then(() => {
        const credits = this.decrementProperty('credits', CREDITS_TYPES[type]);

        return this.get('api').editUser(customer, { 'profile.credits': credits }).then(() => {
          this.set('isLoading', false);
          this.set('isCompleted', true);
          this.set('isError', false);
        });
      }).catch(() =>  {
        this.set('isLoading', false);
        this.set('isCompleted', true);
        this.set('isError', true);
      });
    },

    pay(stripeElement, stripeError) {
      if (!stripeError) {
        this.set('isLoading', true);

        const type = get(this, 'type');
        const customer = get(this, 'userId');
        const stripe = get(this, 'stripev3');
        const appointment = {
          customer,
          type,
          date: get(this, 'date')
        };

        return this.get('api').createAppointment(appointment)
        .then(() => {
          const credits = this.decrementProperty('credits', CREDITS_TYPES[type]);

          return this.get('api').editUser(customer, { 'profile.credits': credits }).then(() => {
              return stripe.createToken(stripeElement).then(({token}) => {
              const purchase = {
                customer: get(this, 'userId'),
                email: get(this, 'email'),
                amount: get(this, 'amount'),
                token
              };

              return this.get('api').createPurchase(purchase).then(() => {
                this.set('isLoading', false);
                this.set('isCompleted', true);
                this.set('isError', false);
              }).catch(() =>  {
                this.set('isLoading', false);
                this.set('isCompleted', true);
                this.set('isError', true);
              });
            }).catch(() =>  {
              this.set('isLoading', false);
              this.set('isCompleted', true);
              this.set('isError', true);
            });
          }).catch(() =>  {
            this.set('isLoading', false);
            this.set('isCompleted', true);
            this.set('isError', true);
          });
        }).catch((error) =>  {
          this.set('isLoading', false);
          this.set('isCompleted', true);
          this.set('isError', true);
        });
      }
    }
  }
});
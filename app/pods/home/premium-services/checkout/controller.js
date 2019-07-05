
import Controller from '@ember/controller';
import { computed }  from '@ember/object';
import { get }  from '@ember/object';
import { inject as service } from '@ember/service';
import { inject as controller } from '@ember/controller';
import { all } from 'rsvp';
import { DIET_PRICES } from '../constants';

const CREDITS_TYPES = {
  ['P']: 3,
  ['V']: 2,
  ['O']: 1
};

export default Controller.extend({

  session: service(),

  stripev3: service(),

  i18n: service(),

  api: service(),

  premiumController: controller('home.premium-services.index'),

  userId: computed.reads('session.data.authenticated.id'),

  email: computed.reads('premiumController.data.email'),

  type: computed.reads('premiumController.data.type'),

  date: computed.reads('premiumController.data.date'),

  credits: computed.reads('premiumController.data.profile.credits'),

  isCompleted: false,

  hasCredits: false,

  payLater: false,

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

      complete: {
        color: '#25a29f'
      },

      empty: {
        color: '#E25950',
        'border-color': '#E25950'
      },

      invalid: {
        color: '#E25950',
        'border-color': '#E25950'
      }
    }
  },

  setup() {
    const credits = get(this, 'credits');
    const type = get(this, 'type');

    this.setProperties({
      isCompleted: false,
      hasCredits: false,
      payLater: false,
      isError: false,
      isLoading: false
    });

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

  _makePurchase(token) {
    const purchase = {
      customer: get(this, 'userId'),
      email: get(this, 'email'),
      amount: get(this, 'amount') * 100,
      description: this.get('i18n').t(`text.payment.description.${get(this, 'type')}`).toString(),
      token: token.id
    };

    return this.get('api').createPurchase(purchase);
  },

  _makeFreePurchase() {
    return this.get('api').createFreePurchase({
      customer: get(this, 'userId'),
      email: get(this, 'email'),
      description: this.get('i18n').t(`text.payment.description.${get(this, 'type')}`).toString()
    });
  },

  _makePurchasePayLater() {
    return this.get('api').createFreePurchase({
      customer: get(this, 'userId'),
      email: get(this, 'email'),
      description: this.get('i18n').t('text.payment.description.L').toString()
    });
  },

  actions: {
    cancel() {
      this.replaceRoute('home');
    },

    confirm() {
      const customer = get(this, 'userId');
      const type = get(this, 'type');
      let credits = this.decrementProperty('credits', CREDITS_TYPES[type]);

      this.set('isLoading', true);

      if (type === 'O') {
        return all([
            this.get('api').editUser(customer, 'profile.credits', credits),
            this.get('api').editUser(customer, 'profile.pendingDiet', true)])
        .then(() => this._makeFreePurchase())
        .then(() => {
          this.set('isLoading', false);
          this.set('isCompleted', true);
        })
        .catch(() =>  {
          this.set('isLoading', false);
          this.set('isCompleted', true);
          this.set('isError', true);
        });
      }

      const appointment = {
        customer,
        type,
        date: get(this, 'date')
      };

      return this.get('api').createAppointment(appointment)
        .then(() => this.get('api').editUser(customer, 'profile.credits', credits))
        .then(() => this._makeFreePurchase())
        .then(() => {
          this.set('isLoading', false);
          this.set('isCompleted', true);
        })
        .catch(() =>  {
          this.set('isLoading', false);
          this.set('isCompleted', true);
          this.set('isError', true);
        });
    },

    payLater() {
        this.set('isLoading', true);

        const appointment = {
          customer: get(this, 'userId'),
          type: 'L',
          date: get(this, 'date')
        };
  
        return this.get('api').createAppointment(appointment)
          .then(() => this._makePurchasePayLater())
          .then(() => {
            this.set('isLoading', false);
            this.set('isCompleted', true);
          })
          .catch(() =>  {
            this.set('isLoading', false);
            this.set('isCompleted', true);
            this.set('isError', true);
          });
    },

    pay(stripeElement) {
      const customer = get(this, 'userId');
      const type = get(this, 'type');
      const stripe = get(this, 'stripev3');

      return stripe.createToken(stripeElement).then(({token, error}) => {
        if (error) {
          return;
        }

        this.set('isLoading', true);

        if (type === 'O') {
          return this.get('api').editUser(customer, 'profile.pendingDiet', true)
            .then(() => this._makePurchase(token))
            .then(() => {
              this.set('isLoading', false);
              this.set('isCompleted', true);
            }).catch(() =>  {
              this.set('isLoading', false);
              this.set('isCompleted', true);
              this.set('isError', true);
            });
        }

        return this.get('api').createAppointment({
          customer,
          type,
          date: get(this, 'date')
        }).then(({appointment}) => {
          return this._makePurchase(token).then(() => {
            this.set('isLoading', false);
            this.set('isCompleted', true);
          }).catch(() =>  {
            this.set('isLoading', false);
            this.set('isCompleted', true);
            this.set('isError', true);

            return this.get('api').deleteAppointment(appointment._id, false)
          });
        }).catch(() =>  {
          this.set('isLoading', false);
          this.set('isCompleted', true);
          this.set('isError', true);
        });
      });
    },

    close() {
      this.replaceRoute('home');
    }
  }
});
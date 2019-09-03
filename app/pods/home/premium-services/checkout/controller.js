
import Controller from '@ember/controller';
import { computed }  from '@ember/object';
import { inject as service } from '@ember/service';
import { inject as controller } from '@ember/controller';
import { all, resolve, reject } from 'rsvp';
import { DIET_PRICES } from '../constants';

const CREDITS_TYPES = {
  ['P']: 3,
  ['V']: 2,
  ['O']: 1
};

export default Controller.extend({

  session: service(),

  stripe: service('stripev3'),

  i18n: service(),

  api: service(),

  premiumController: controller('home.premium-services.index'),

  userId: computed.reads('session.data.authenticated.id'),

  email: computed.reads('premiumController.data.email'),

  type: computed.reads('premiumController.data.type'),

  date: computed.reads('premiumController.data.date'),

  credits: computed.reads('premiumController.data.profile.credits'),

  dateLabel: computed('i18n.locale', 'type', function() {
    const i18n = this.get('i18n');
    const type = this.get('type');

    if (type === 'V') {
      return i18n.t('label.meet.video');
    }

    if (type === 'P') {
      return i18n.t('label.meet.face.paid');
    }

    return '';
  }),

  isCompleted: false,

  payLater: false,

  isError: false,

  isLoading: false,

  amount: computed('type', 'credits', function () {
    return (DIET_PRICES[this.get('type')] - this.get('credits') * 15)
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
    const credits = this.get('credits');
    const type = this.get('type');

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

  _makePurchase(paymentMethod) {
    const purchase = {
      customer: this.get('userId'),
      email: this.get('email'),
      amount: this.get('amount') * 100,
      description: this.get('i18n').t(`text.payment.description.${this.get('type')}`).toString(),
      payment_method_id: paymentMethod.id
    };

    return this.get('api').createPurchase(purchase);
  },

  _confirmPurchase(paymentIntent) {
    return this.get('api').createPurchase({ payment_intent_id: paymentIntent.id });
  },

  _makeFreePurchase() {
    return this.get('api').createFreePurchase({
      customer: this.get('userId'),
      email: this.get('email'),
      description: this.get('i18n').t(`text.payment.description.${this.get('type')}`).toString()
    });
  },

  _makePurchasePayLater() {
    return this.get('api').createFreePurchase({
      customer: this.get('userId'),
      email: this.get('email'),
      description: this.get('i18n').t('text.payment.description.L').toString()
    });
  },

  _handlePurchaseResponse(response) {
    if (response.error) {
      // Show error from server on payment form
      this.setProperties({ isLoading: false, isCompleted: true, isError: true });

      return reject();
    } else if (response.requires_action) {
      // Use Stripe.js to handle the required card action
     
        return this.get('stripe').handleCardAction(response.payment_intent_client_secret)
          .then(({ error: errorAction, paymentIntent }) => {
            if (errorAction) {
              // Show error from Stripe.js in payment form
              this.setProperties({ isLoading: false, isCompleted: true, isError: true });
      
              return reject();
            } else {
              // The card action has been handled
              // The PaymentIntent can be confirmed again on the server
      
              return this._confirmPurchase(paymentIntent).then(this._handlePurchaseResponse.bind(this));
            }
          });
    } else {
      // Show success message
      this.setProperties({ isLoading: false, isCompleted: true, isError: false });

      return resolve();
    }
  },

  actions: {
    cancel() {
      this.replaceRoute('home');
    },

    payWithCredits() {
      const customer = this.get('userId');
      const type = this.get('type');
      let credits = this.decrementProperty('credits', CREDITS_TYPES[type]);

      this.set('isLoading', true);

      if (type === 'O') {
        return all([
            this.get('api').editUser(customer, 'profile.credits', credits),
            this.get('api').editUser(customer, 'profile.pendingDiet', true)])
        .then(() => this._makeFreePurchase())
        .then(() => this.setProperties({ isLoading: false, isCompleted: true, isError: false }))
        .catch(() => this.setProperties({ isLoading: false, isCompleted: true, isError: true }));
      }

      const appointment = {
        customer,
        type,
        date: this.get('date')
      };

      return this.get('api').createAppointment(appointment)
        .then(() => this.get('api').editUser(customer, 'profile.credits', credits))
        .then(() => this._makeFreePurchase())
        .then(() => this.setProperties({ isLoading: false, isCompleted: true, isError: false }))
        .catch(() => this.setProperties({ isLoading: false, isCompleted: true, isError: true }));
    },

    payLater() {
        this.set('isLoading', true);

        const appointment = {
          customer: this.get('userId'),
          type: 'L',
          date: this.get('date')
        };
  
        return this.get('api').createAppointment(appointment)
          .then(() => this._makePurchasePayLater())
          .then(() => this.setProperties({ isLoading: false, isCompleted: true, isError: false }))
          .catch(() => this.setProperties({ isLoading: false, isCompleted: true, isError: true }));
    },

    pay(stripeElement) {
      const customer = this.get('userId');
      const type = this.get('type');
      const stripe = this.get('stripe');

      return stripe.createPaymentMethod('card', stripeElement).then(({paymentMethod, error}) => {
        if (error) {
          return;
        }

        this.set('isLoading', true);

        if (type === 'O') {
          return this.get('api').editUser(customer, 'profile.pendingDiet', true)
            .then(() => this._makePurchase(paymentMethod))
            .then(this._handlePurchaseResponse.bind(this))
        }

        return this.get('api').createAppointment({
          customer,
          type,
          date: this.get('date')
        }).then(({appointment}) => {
          return this._makePurchase(paymentMethod)
            .then(this._handlePurchaseResponse.bind(this))
            .catch(() => this.get('api').deleteAppointment(appointment._id, false))
        }).catch(() => this.setProperties({ isLoading: false, isCompleted: true, isError: true }))
      });
    },

    close() {
      this.replaceRoute('home');
    }
  }
});
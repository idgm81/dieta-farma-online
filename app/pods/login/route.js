import Ember from 'ember';
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';

export default Ember.Route.extend(UnauthenticatedRouteMixin, {

  session: Ember.inject.service('session'),

  model() {
    return {
      email: '',
      password: ''
    }
  },

  // clear a potentially stale error message from previous login attempts
  setupController(controller, model) {
      this._super(...arguments);

      controller.set('error', false);
  },

  _checkCredentials(credentials) {
    const whiteList = [
      {
        email: 'jorgebaztan@dietafarma.es',
        password: 'jorge1234'
      }, {
        email: 'joseotamendi@gmail.com',
        password: 'otam1234'
      }
    ];

    return whiteList.findBy('email', credentials.email) && whiteList.findBy('password', credentials.password);
  },

  actions: {
    authenticate(credentials) {
      //const credentials = this.getProperties('email', 'password');
      Ember.$('button').hide();
      Ember.$('div.loader').show();

      const isOk = this._checkCredentials(credentials);
      setTimeout(() => {
        Ember.$('div.loader').hide();
        Ember.$('button').show();
        if (isOk) {
          this.set('controller.error', false);
          this.transitionTo('admin');
        } else {
          this.set('controller.error', true);
        }
      }, 500);
      //const authenticator = 'authenticator:jwt';
      //this.get('session').authenticate(authenticator, credentials);
    }
  }
});

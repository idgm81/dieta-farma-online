import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import ENV from '../../config/environment';
import { USER_ROLES } from './constants';

const { inject: { service } , computed, get, run, RSVP} = Ember;

export default Ember.Route.extend(AuthenticatedRouteMixin, {

  session: service(),

  api: service(),

  sideMenu: service(),

  userId: computed.reads('session.data.authenticated.id'),

  model() {
    const id = get(this, 'userId');

    return RSVP.hash({
      userData: this.get('api').getUser(id),
      messagesData: this.get('api').getMessages(id)
    });
  },

  redirect(model) {
    this._super(...arguments);

    run.later(() => this.get('session').invalidate(), 15 * 60 * 1000); //close session after 15 minutes

    const nextRoute = get(model, 'userData.user.role') === USER_ROLES.NUTRITIONIST
      ? 'home.clients.index'
      : 'home.index';

    this.transitionTo(nextRoute);
  },

  setupController: function(controller, model) {
    controller.set('isClient', get(model, 'userData.user.role') === USER_ROLES.CLIENT);
    controller.set('isFeatureActive', this.get('userId') === '5a74230545283400044aec6b');
    controller.set('headerTitle', `Hola ${get(model, 'userData.user.profile.name')}`);
    controller.set('fullName', `${get(model, 'userData.user.profile.name')} ${get(model, 'userData.user.profile.surname')}`);
    controller.set('appVersion', `${ENV.APP.version}.${ENV.APP.buildDate}`);
    controller.set('inboxMessages', get(model, 'messagesData.messages').length);
  },

  close() {
    this.get('sideMenu').close();
  },

  actions: {
    showMyProfile() {
      this.close();
      this.transitionTo('home.profile.index', get(this, 'userId'));
    },

    askForAppointment() {
      this.close();
      this.transitionTo('home.calendar.new');
    },

    showDiets() {
      this.close();
      this.transitionTo('home.diets.index');
    },

    showMyCalendar() {
      this.close();
      this.transitionTo('home.calendar.index');
    },

    showMessages() {
      this.close();
      this.transitionTo('home.messages.index');
    },

    showMyClients() {
      this.close();
      this.transitionTo('home.clients');
    },

    logout() {
      this.get('session').invalidate();
    }
  }
});

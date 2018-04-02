import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

import ENV from '../../config/environment';
import { USER_ROLES } from './constants';
import { getWithDefault } from '@ember/object';
import { imagePath } from 'dieta-farma-online/helpers/image-path';

const { inject: { service } , computed, get, run, RSVP} = Ember;

export default Ember.Route.extend(ApplicationRouteMixin, {

  session: service(),

  api: service(),

  sideMenu: service(),

  userId: computed.reads('session.data.authenticated.id'),

  model() {
    const id = get(this, 'userId');

    return RSVP.hash({
      userData: this.get('api').getUser(id),
      messagesData: this.get('api').getMessages(id)
    }).catch(() => this.transitionTo('index'));
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
    controller.set('avatar', getWithDefault(model, 'userData.user.profile.avatar', imagePath('default-avatar.png')));
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
      try {
        return this.get('session').invalidate();
      } catch (e) {
        return this.transitionTo('login');
      }
    }
  }
});

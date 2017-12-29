import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import { USER_ROLES } from './constants';

const { inject: { service } , computed, get, run} = Ember;

export default Ember.Route.extend(AuthenticatedRouteMixin, {

  session: service(),

  api: service(),

  sideMenu: service(),

  userId: computed.reads('session.data.authenticated.id'),

  model() {
    const userId = this.get('session.data.authenticated.id');

    return this.get('api').getUser(userId);
  },

  redirect(model) {
    this._super(...arguments);

    run.later(() => this.get('session').invalidate(), 180000);

    const nextRoute = get(model, 'user.role') === USER_ROLES.NUTRITIONIST
      ? 'home.clients.index'
      : 'home.diets';

    this.transitionTo(nextRoute);
  },

  setupController: function(controller, model) {
    controller.set('isClient', get(model, 'user.role') === USER_ROLES.CLIENT);
    controller.set('headerTitle', `Hola ${get(model, 'user.profile.name')}`);
    controller.set('fullName', `${get(model, 'user.profile.name')} ${get(model, 'user.profile.surname')}`);
    //controller.set('unreadMessages', model.messages.getEach('_id').length);
  },

  close() {
    this.get('sideMenu').close();
  },

  actions: {
    showMyProfile() {
      this.close();
      this.transitionTo('home.profile', this.get('userId'));
    },

    askForAppointment() {
      this.close();
      this.transitionTo('home.calendar.new');
    },

    showDiets() {
      this.close();
      this.transitionTo('home.diets.index');
    },

    showMyAppointments() {
      this.close();
      this.transitionTo('home.calendar.index');
    },

    showMessages() {
      this.close();
      this.transitionTo('home.messages');
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

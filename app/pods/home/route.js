import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {

  session: Ember.inject.service(),

  sideMenu: Ember.inject.service(),

  model() {
    const role = this.get('session.data.authenticated.role');
    const id = this.get('session.data.authenticated.id');

    return this.store.findRecord('user', id);
  },

  close() {
    this.get('sideMenu').close();
  },

  actions: {
    showProfile() {
      this.close();
      this.transitionTo('home.profile');
    },

    showDiets() {
      this.close();
      this.transitionTo('home.diets');
    },

    showAppointments() {
      this.close();
      this.transitionTo('home.appointments');
    },

    showMessages() {
      this.close();
      this.transitionTo('home.messages');
    },

    showClients() {
      this.close();
      this.transitionTo('home.clients');
    },

    logout() {
      this.get('session').invalidate();
    }
  }
});

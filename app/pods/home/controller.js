import Controller from '@ember/controller';
import ENV from '../../config/environment';
import { inject as service } from '@ember/service';
import { reads, alias } from '@ember/object/computed';
import { getWithDefault, get, set, setProperties } from '@ember/object';
import { imagePath } from 'dieta-farma-online/helpers/image-path';
import { capitalize }  from '@ember/string';
import { USER_ROLES } from './constants';

export default Controller.extend({

  session: service(),

  sideMenu: service(),

  userId: reads('session.data.authenticated.id'),

  avatar: alias('session.data.avatar'),

  setup: function(model) {
    const inboxThreadsUnread = getWithDefault(model, 'inboxThreads.threads', [])
      .map((thread) => thread.unread ? 1 : 0)
      .reduce((acc, cur) => {
        return acc + cur;
      }, 0);

    const avatar = getWithDefault(model, 'userData.user.profile.avatar', imagePath('default-avatar.png'));

    setProperties(this, {
      isClient: get(model, 'userData.user.role') === USER_ROLES.CLIENT,
      isFeatureActive: get(this, 'userId') === '5a74230545283400044aec6b',
      headerTitle: `Hola ${capitalize(get(model, 'userData.user.profile.name'))}`,
      fullName: `${get(model, 'userData.user.profile.name')} ${get(model, 'userData.user.profile.surname')}`,
      appVersion: `v${ENV.APP.version}`,
      inboxThreadsUnread
    });
    set(this, 'avatar', avatar);
  },

  close() {
    this.get('sideMenu').close();
  },

  actions: {
    showMyProfile() {
      this.close();
      this.transitionToRoute('home.profile.index', get(this, 'userId'));
    },

    askForAppointment() {
      this.close();
      this.transitionToRoute('home.calendar.new');
    },

    showDiets() {
      this.close();
      this.transitionToRoute('home.diets.index');
    },

    showMyCalendar() {
      this.close();
      this.transitionToRoute('home.calendar.index');
    },

    showThreads() {
      this.close();
      this.transitionToRoute('home.threads.index');
    },

    showMyClients() {
      this.close();
      this.transitionToRoute('home.clients');
    },

    logout() {
      try {
        return this.get('session').invalidate();
      } catch (e) {
        return this.transitionToRoute('login');
      }
    }
  }

});
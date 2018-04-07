import Controller from '@ember/controller';
import ENV from '../../config/environment';
import { inject as service } from '@ember/service';
import { reads, alias } from '@ember/object/computed';
import { getWithDefault, get, setProperties } from '@ember/object';
import { imagePath } from 'dieta-farma-online/helpers/image-path';
import { capitalize }  from '@ember/string';
import { USER_ROLES } from './constants';

const WHITE_LIST_USERS = [
  '5a74230545283400044aec6b',
  '5a43df203a0c23a52728cb16'
] 

export default Controller.extend({

  session: service(),

  sideMenu: service(),

  userId: reads('session.data.authenticated.id'),

  avatar: alias('session.data.authenticated.avatar'),

  setup: function(model) {
    const inboxThreadsUnread = getWithDefault(model, 'inboxThreads.threads', [])
      .map((thread) => thread.unread ? 1 : 0)
      .reduce((acc, cur) => acc + cur, 0);

    const avatar = getWithDefault(model, 'userData.user.profile.avatar', imagePath('default-avatar.png'));

    setProperties(this, {
      isClient: get(model, 'userData.user.role') === USER_ROLES.CLIENT,
      isFeatureActive: WHITE_LIST_USERS.includes(get(this, 'userId')),
      headerTitle: `Hola ${capitalize(get(model, 'userData.user.profile.name'))}`,
      avatar,
      fullName: `${get(model, 'userData.user.profile.name')} ${get(model, 'userData.user.profile.surname')}`,
      appVersion: `v${ENV.APP.version}`,
      inboxThreadsUnread
    });
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
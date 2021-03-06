import Controller from '@ember/controller';
import ENV from '../../config/environment';
import { inject as service } from '@ember/service';
import { reads } from '@ember/object/computed';
import { getWithDefault, get, setProperties } from '@ember/object';
import { imagePath } from 'dieta-farma-online/helpers/image-path';
import { capitalize }  from '@ember/string';
import { USER_ROLES } from './constants';
import moment from 'moment';

const WHITE_LIST_USERS = [
  '5a74230545283400044aec6b',
  '5a43df203a0c23a52728cb16'
] 

export default Controller.extend({

  session: service(),

  sideMenu: service(),

  userId: reads('session.data.authenticated.id'),

  avatar: reads('session.data.avatar'),

  setup: function(model) {
    const inboxThreadsUnread = getWithDefault(model, 'inboxThreads.threads', [])
      .map((thread) => thread.unread ? 1 : 0)
      .reduce((acc, cur) => acc + cur, 0);

    const avatar = getWithDefault(model, 'userData.user.profile.avatar', imagePath('default-avatar.png'));
    const isFeatureActive = WHITE_LIST_USERS.includes(get(model, 'userData.user._id'));
    const expiredFree = (moment().subtract(1, 'months')).isAfter(moment(get(model, 'userData.user.createdAt')));

    setProperties(this, {
      isClient: get(model, 'userData.user.role') === USER_ROLES.CLIENT,
      isPremium: !isFeatureActive || !expiredFree,
      headerTitle: `Hola ${capitalize(get(model, 'userData.user.profile.name'))}`,
      fullName: `${get(model, 'userData.user.profile.name')} ${get(model, 'userData.user.profile.surname')}`,
      appVersion: `v${ENV.APP.version}`,
      inboxThreadsUnread
    });

    this.get('session').set('data.avatar', avatar);
    this.close();
  },

  close() {
    this.get('sideMenu').close();
  },

  actions: {
    goHome() {
      this.close();
      this.transitionToRoute('home.index');
    },

    showMyProfile() {
      this.close();
      this.transitionToRoute('home.profile', get(this, 'userId'));
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

    makePremium() {
      this.close();
      this.transitionToRoute('premium');
    },

    logout() {
      this.get('session').invalidate();
      this.transitionToRoute('login');
    }
  }

});
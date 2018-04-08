import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { set } from '@ember/object';
import { reads } from '@ember/object/computed';
import moment from 'moment';

export default Controller.extend({

  api: service(),

  session: service(),

  userId: reads('session.data.authenticated.id'),

  actions: {
    delete() {
      return this.get('api').deleteUser(this.get('userId'))
        .then(() => this.get('session').invalidate())
        .catch(() => '');
    },
    editAvatar() {
      $('#modal-edit-avatar').modal();
    },
    saveAvatar(avatar) {
      const data = this.get('model.user');

      set(data, 'profile.avatar', avatar);

      return this.get('api').editUser(this.get('userId'), data)
        .then(() => this.get('session').set('authenticated.avatar', avatar))
        .catch(() => $('#modal-edit-profile-error').modal());
    },
    editProfile(field, value) {
      this.set('field', field);

      if (field === 'birthday') {
        this.set('value', moment.parseZone(value).format('DD/MM/YYYY'));
      } else {
        this.set('value', value)
      }

      $('#modal-edit-profile').modal();
    },
    saveProfile(field, value) {
      const data = this.get('model.user');
  
      set(data, `${field === 'email' ? '' : 'profile.'}${field}`, value);

      return this.get('api').editUser(this.get('userId'), data)
        .catch(() => $('#modal-edit-profile-error').modal());
    },
    showDiets() {
      this.transitionToRoute('home.diets');
    },
  }
});
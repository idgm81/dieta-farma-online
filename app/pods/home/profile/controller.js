import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { get, set } from '@ember/object';
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
        .catch(() => $('#modal-edit-profile-error').modal());
    },
    editAvatar() {
      $('#modal-edit-avatar').modal();
    },
    saveAvatar(avatar) {
      const user = this.get('model.user');

      return this.get('api').editUser(user._id, 'profile.avatar', avatar)
        .then((data) =>  this.get('session').set('data.avatar', get(data, 'user.profile.avatar')))
        .catch(() => $('#modal-edit-profile-error').modal());
    },
    editProfile(field) {
      let value = null;

      if (field === 'email') {
        value = get(this, 'model.user.email');
      } else {
        value = get(this, `model.user.profile.${field}`);
      }
      
      if (field === 'birthday') {
        this.set('value', moment.parseZone(value).format('DD/MM/YYYY'));
      } else {
        this.set('value', value)
      }

      this.set('field', field);
      $('#modal-edit-profile').modal();
    },
    saveProfile(field, value) {
      const user = this.get('model.user');
      const key = field === 'email' ? field : `profile.${field}`;
  
      return this.get('api').editUser(user._id, key, value)
        .then((response) => set(user, key, get(response, `user.${key}`)))
        .catch(() => $('#modal-edit-profile-error').modal());
    },
    showDiets() {
      this.transitionToRoute('home.diets');
    },
  }
});
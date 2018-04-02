import Ember from 'ember';
import { reads } from '@ember/object/computed';

const { Controller, inject: { service }, set } = Ember;

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
    save(avatar) {
      const data = this.get('model.user');

      set(data, 'profile.avatar', avatar);

      return this.get('api').editUser(this.get('userId'), data);
    },
    edit(id) {
      this.transitionToRoute('home.profile.edit', id);
    },
    showDiets() {
      this.transitionToRoute('home.diets');
    },
  }
});

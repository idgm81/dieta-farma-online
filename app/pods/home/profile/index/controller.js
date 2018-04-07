import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { set } from '@ember/object';
import { reads } from '@ember/object/computed';

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

      return this.get('api').editUser(this.get('userId'), data).then(() => {
        this.get('session').set('avatar', avatar);
      });
    },
    edit(id) {
      this.transitionToRoute('home.profile.edit', id);
    },
    showDiets() {
      this.transitionToRoute('home.diets');
    },
  }
});
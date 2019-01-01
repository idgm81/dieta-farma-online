import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { get, set } from '@ember/object';

export default Controller.extend({

  api: service(),

  actions: {
    delete(id) {
      return this.get('api').deleteUser(id)
        .then(() => this.transitionToRoute('home.clients'));
    },
    editProfile(field) {
      const value = get(this, `model.user.profile.${field}`);

      this.set('value', value)
      this.set('field', field);
      $('#modal-edit-profile').modal();
    },
    saveProfile(field, value) {
      const user = this.get('model.user');
      const key = `profile.${field}`;
  
      return this.get('api').editUser(user._id, key, value)
        .then((response) => set(user, key, get(response, `user.${key}`)))
        .catch(() => $('#modal-edit-profile-error').modal());
    },
    showDiets() {
      const queryParams = { userId: get(this, 'model.user._id'), name: get(this, 'model.user.profile.name') };

      this.transitionToRoute('home.diets.index', { queryParams });
    }
  }
});

import { equal } from '@ember/object/computed';
import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { USER_ROLES } from '../../constants';

export default Controller.extend({

  session: service(),

  api: service(),

  isNutritionist: equal('session.data.authenticated.role', USER_ROLES.NUTRITIONIST),

  queryParams: ['userId'],

  actions: {
    open(url) {
      window.open(url);
    },

    new() {
      const queryParams = { userId: this.get('userId') };

      this.transitionToRoute('home.diets.new', { queryParams });
    },

    delete(id, userId) {
      $('#modal-wait-delete-diet').modal();
      return this.get('api').deleteDiet(id, userId)
        .then(() => {
          this.replaceWith('home.clients.index');
        })
        .catch(() => {
          $('#modal-delete-diet-error').modal();
        })
        .finally(() => {
          $('#modal-wait-delete-diet').modal('hide');
        })
    }
  }
});
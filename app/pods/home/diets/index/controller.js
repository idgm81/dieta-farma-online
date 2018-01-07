import Ember from 'ember';
import { USER_ROLES } from '../../constants';

const { inject: { service }, computed } = Ember;

export default Ember.Controller.extend({

  session: service(),

  api: service(),

  isNutriotionist: computed.equal('session.data.authenticated.role', USER_ROLES.NUTRITIONIST),

  actions: {
    open(url) {
      window.open(url);
    },

    delete(id) {
      $('#modal-wait-delete-diet').modal();
      return this.get('api').deleteDiet(id)
        .then(() => {
          this.replaceRoute('home.diets.index');
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

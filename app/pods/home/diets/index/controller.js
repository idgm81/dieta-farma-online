import Ember from 'ember';
import { USER_ROLES } from '../../constants';

const { inject: { service }, computed } = Ember;

export default Ember.Controller.extend({

  session: service(),

  api: service(),

  flashMessages: service(),

  isNutriotionist: computed.equal('session.data.authenticated.role', USER_ROLES.NUTRITIONIST),

  actions: {
    open(url) {
      window.open(url);
    },

    delete(id) {
      return this.get('api').deleteDiet(id)
        .then(() => {
          this.get('flashMessages').success('Dieta eliminada!');
          this.replaceRoute('home.diets.index');
        })
        .catch(() => {
          this.get('flashMessages').error('Error al eliminar la dieta!');
        });
    }
  }
});

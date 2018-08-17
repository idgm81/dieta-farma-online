import { equal } from '@ember/object/computed';
import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { get, computed } from '@ember/object';
import { USER_ROLES } from '../../constants';

export default Controller.extend({

  session: service(),

  api: service(),

  queryParams: ['userId', 'name'],

  isNutritionist: equal('session.data.authenticated.role', USER_ROLES.NUTRITIONIST),

  clientLinkLabel: computed('name', function() {
    return `Perfil de ${get(this, 'name')}`
  }),

  actions: {
    open(url) {
      window.open(url);
    },

    new() {
      const queryParams = { userId: this.get('userId'), name: this.get('name') };

      this.transitionToRoute('home.diets.new', { queryParams });
    },

    request() {
      this.transitionToRoute('home.premium-services.index');
    },

    delete(id, userId) {
      $('#modal-wait-delete-diet').modal();
      return this.get('api').deleteDiet(id, userId).then(() =>
        this.replaceRoute('home.clients.index')
      ).catch(() =>
        $('#modal-delete-diet-error').modal()
      ).finally(() =>
        $('#modal-wait-delete-diet').modal('hide')
      )
    }
  }
});
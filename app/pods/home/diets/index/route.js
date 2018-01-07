import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const { Route, inject: { service } } = Ember;

export default Route.extend(AuthenticatedRouteMixin, {

  api: service(),

  session: service(),

  model(params, transition) {
    const userId = transition.queryParams.userId || this.get('session.data.authenticated.id');

    return this.get('api').getDiets(userId);
  },

  actions: {
    open(url) {
      window.open(url);
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

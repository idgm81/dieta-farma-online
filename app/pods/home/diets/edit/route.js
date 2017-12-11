import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const { Route, RSVP, inject: { service }, get } = Ember;

export default Route.extend(AuthenticatedRouteMixin, {

  api: service(),

  model(params) {
    const parentController = this.modelFor('home.diets.index');

    return get(parentController, 'diets').findBy('_id', params.id);
  },

  actions: {
    save() {
    },
    cancel() {
      this.replaceWith('home.diets.index');
    }
  }
});
